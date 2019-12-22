import path from 'path';
import http from 'http';
import https from 'https';
import fs from 'fs';

import ws from 'ws';
import watch from 'node-watch';
import webpack from 'webpack';
import express from 'express';

import { env } from '../env';
import { configEntryServer } from '../webpack-custom/configs/configEntryServer';
import { configOptimization } from '../webpack-custom/configs/configOptimization';
import { paths } from '../webpack-custom/utils/paths';

const buildFolderPath = path.resolve(__dirname, '../build');
const reloadClientContent = `
(function refresh() {
  let socketUrl = window.location.origin;
  if (!socketUrl.match(/:[0-9]+/)) {
    socketUrl = socketUrl + ':80';
  }
  socketUrl = socketUrl.replace(/(^http(s?):\\/\\/)(.*:)(.*)/,${`'ws$2://$3${env.getParam(
    'HOT_RELOAD_PORT'
  )}`}');

  function websocketWaiter() {
    const socket = new WebSocket(socketUrl);

    socket.onmessage = function socketOnMessage(msg) {
      if (msg.data === 'reload') {
        socket.close();
        window.location.reload();
      }
    };

    socket.onclose = function socketOnClose() {
      setTimeout(function reconnectSocketDelayed() {
        websocketWaiter();
      }, 1000);
    };
  }

  window.addEventListener('load', websocketWaiter);
})();

`;

const app = express();
app.get(env.getParam('HOT_RELOAD_CLIENT_URL'), (req, res) => {
  res.type('text/javascript');
  res.send(reloadClientContent);
});

let server = null;
if (env.getParamAsBoolean('HTTPS_BY_NODE')) {
  const sslOptions = {
    key: fs.readFileSync(path.resolve(paths.rootPath, 'ssl-local/cert.key')),
    cert: fs.readFileSync(path.resolve(paths.rootPath, 'ssl-local/cert.pem')),
  };

  server = https.createServer(sslOptions, app).listen(env.getParam('HOT_RELOAD_PORT'));
} else {
  server = http.createServer(app).listen(env.getParam('HOT_RELOAD_PORT'));
}

// https://github.com/websockets/ws
const wss = new ws.Server({ server });

// https://github.com/yuanchuan/node-watch
const serverChunks = Object.keys(configEntryServer).map(filename => `${filename}.js`);
const runtimeChunk = `${
  (configOptimization.runtimeChunk as webpack.Options.RuntimeChunkOptions).name
}.js`;
const vendorChunks = Object.entries(
  (configOptimization.splitChunks as webpack.Options.SplitChunksOptions).cacheGroups
).map(([, value]) => `${value.name}.js`);

const excludedFilenames = [...serverChunks, ...vendorChunks, runtimeChunk];
let watchDebounceTimeout = null;
let changedFiles = [];

watch(
  buildFolderPath,
  {
    // watch only files in root folder
    recursive: false,
    // watch only js files not generated by webpackServer
    // also skip vendor chunks
    filter: filePath => {
      const isJS = /\.(js|css)$/.test(filePath);

      const isExcluded = excludedFilenames.some(filename => filePath.indexOf(filename) !== -1);

      return isJS && !isExcluded;
    },
  },
  function onFilesChanged(event, filename) {
    changedFiles.push(filename.replace(buildFolderPath, '').replace(/[\\/]/g, ''));

    clearTimeout(watchDebounceTimeout);

    watchDebounceTimeout = setTimeout(function sendMessage() {
      // console.log(`reload triggered by\n`, changedFiles);

      changedFiles = [];

      wss.clients.forEach(client => {
        if (client.readyState === ws.OPEN) {
          client.send('reload');
        }
      });
    }, 50);
  }
);
