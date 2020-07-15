import React from 'react';

import { RouteType } from 'models';
import { ConnectedComponent } from 'components/ConnectedComponent';

interface LinkProps {
  route: RouteType;
  onClick?: (event?: React.MouseEvent) => void;
  className?: string;
}

@ConnectedComponent.observer
export class Link extends ConnectedComponent<LinkProps> {
  declare context: typeof ConnectedComponent['context'];

  render() {
    const { store } = this.context;
    const { route, onClick, className, children } = this.props;

    return (
      <a
        href={`/${store.ui.currentLanguage}${route.path}`}
        className={className}
        onClick={event => {
          /**
           * Replace default onClick handler if one is passed in props
           *
           */
          if (onClick) return onClick(event);

          event.preventDefault();

          store.actions.common.redirectTo({ route });
        }}
      >
        {children}
      </a>
    );
  }
}
