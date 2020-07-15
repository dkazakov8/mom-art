import _ from 'lodash';
import React from 'react';

import { routeComponents } from 'routeComponents';
import { ConnectedComponent } from 'components/ConnectedComponent';

@ConnectedComponent.observer
export class Router extends ConnectedComponent {
  declare context: typeof ConnectedComponent['context'];

  render() {
    const {
      store: {
        router: {
          currentRoute: { name },
        },
      },
    } = this.context;

    const Component = _.get(routeComponents, `${name}.Component`);

    if (!Component) {
      if (typeof Component === 'undefined') {
        console.error(`Router: component for ${name} is not defined in routeComponents`);
      }

      return null;
    }

    return Component;
  }
}
