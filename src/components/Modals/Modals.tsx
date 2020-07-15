import cn from 'classnames';
import React from 'react';

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

    return (
      <div className={styles.modals}>
        {store.ui.modals.map((modal, modalIndex) => {
          const { status, data = {} } = modal;
          const { title, ContentComponent } = ModalsCollection[modal.name];

          const backdropStyle = { zIndex: 12 + modalIndex };
          const backdropClassname = cn({
            [styles.backdrop]: true,
            [styles[status]]: Boolean(styles[status]),
          });
          const removeModal = this.handleRemoveModal(modal);

          return (
            <div key={modal.id} className={backdropClassname} style={backdropStyle}>
              <div className={styles.modal}>
                <Icon glyph={Icon.glyphs.close} className={styles.close} onClick={removeModal} />
                {Boolean(title) && <div className={styles.modalTitle}>{store.getLn(title)}</div>}
                <ContentComponent data={data} removeModal={removeModal} />
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}
