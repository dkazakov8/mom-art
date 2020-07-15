import React from 'react';
import cn from 'classnames';

import { ConnectedComponent } from 'components/ConnectedComponent';

import styles from './Header.scss';
import { messages } from './messages';

@ConnectedComponent.observer
export class Logo extends ConnectedComponent {
  declare context: typeof ConnectedComponent['context'];

  render() {
    const { store } = this.context;

    return (
      <div className={cn(styles.logo, store.ui.currentTheme === 'dark' && styles.linkStyle)}>
        {store.getLn(messages.artistName)}
      </div>
    );
  }
}
