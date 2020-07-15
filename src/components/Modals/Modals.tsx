import cn from 'classnames';
import React from 'react';

import { system } from 'const';
import { Icon } from 'components/Icon';
import { ModalsCollection } from 'components/ModalsCollection';
import { ConnectedComponent } from 'components/ConnectedComponent';

import styles from './Modals.scss';

@ConnectedComponent.observer
export class Modals extends ConnectedComponent {
  declare context: typeof ConnectedComponent['context'];

  handleRemoveModal = modal => () => {
    const { store } = this.context;

    return store.actions.common.removeModal(modal);
  };

  render() {
    const { store } = this.context;

    return !store.ui.modalIsOpen ? null : (
      <div
        className={cn(styles.backdrop, store.ui.lastModalIsLeaving && styles.isLeaving)}
        style={{
          transitionDuration: `${system.MODALS_LEAVING_TIMEOUT / 1000}s`,
          animationDuration: `${system.MODALS_LEAVING_TIMEOUT / 1000}s`,
        }}
      >
        {store.ui.modals.map((modal, modalIndex) => {
          const { id, status, data = {} } = modal;
          const { title, ContentComponent } = ModalsCollection[modal.name];

          return (
            <div
              key={id}
              className={cn(styles.modal, status === 'leaving' && styles.isLeaving)}
              style={{
                zIndex: 12 + modalIndex,
                transitionDuration: `${system.MODALS_LEAVING_TIMEOUT / 1000}s`,
              }}
            >
              <Icon
                glyph={Icon.glyphs.close}
                className={styles.close}
                onClick={this.handleRemoveModal(modal)}
              />
              {Boolean(title) && <div className={styles.title}>{store.getLn(title)}</div>}
              <ContentComponent data={data} removeModal={this.handleRemoveModal(modal)} />
            </div>
          );
        })}
      </div>
    );
  }
}
