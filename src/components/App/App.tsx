import React from 'react';
import cn from 'classnames';

import { TypeGalleryItem } from 'models';
import { Router } from 'components/Router';
import { Modals } from 'components/Modals';
import { Lightbox } from 'components/Lightbox';
import { Notifications } from 'components/Notifications';
import { ConnectedComponent } from 'components/ConnectedComponent';
import { system } from 'const';

import styles from './App.scss';

@ConnectedComponent.observer
export class App extends ConnectedComponent {
  declare context: typeof ConnectedComponent['context'];

  render() {
    const { store } = this.context;

    return (
      <>
        <div
          className={cn(
            styles.app,
            store.ui.modalIsOpen && !store.ui.lastModalIsLeaving && styles.blurred
          )}
          style={{
            transitionDuration: store.ui.modalIsOpen
              ? `${system.MODALS_LEAVING_TIMEOUT / 1000}s`
              : undefined,
          }}
        >
          <Router />
        </div>
        <Notifications />
        <Modals />
        <Lightbox srcGetter={(elem: TypeGalleryItem): string => elem.sources.big.src} />
      </>
    );
  }
}
