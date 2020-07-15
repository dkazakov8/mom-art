import React from 'react';

import { Icon } from 'components/Icon';
import { ModalsCollection } from 'components/ModalsCollection';
import { ConnectedComponent } from 'components/ConnectedComponent';

import styles from './Header.scss';

@ConnectedComponent.observer
export class Logout extends ConnectedComponent {
  declare context: typeof ConnectedComponent['context'];

  render() {
    const {
      store,
      store: {
        user: { isLoggedIn },
      },
    } = this.context;

    return (
      <Icon
        className={styles.logoutIcon}
        glyph={isLoggedIn ? Icon.glyphs.logout : Icon.glyphs.auth}
        onClick={() =>
          isLoggedIn
            ? store.actions.common.logout()
            : store.actions.common.raiseModal({ name: ModalsCollection.ModalAuth.name })
        }
      />
    );
  }
}
