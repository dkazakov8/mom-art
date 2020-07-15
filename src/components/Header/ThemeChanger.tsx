import cn from 'classnames';
import React from 'react';

import { ConnectedComponent } from 'components/ConnectedComponent';

import { Icon } from '../Icon';

import styles from './Header.scss';

@ConnectedComponent.observer
export class ThemeChanger extends ConnectedComponent {
  declare context: typeof ConnectedComponent['context'];

  render() {
    const {
      store,
      store: {
        ui: { currentTheme, themesList },
      },
    } = this.context;

    return (
      <>
        <div
          className={cn(styles.themeSwither, currentTheme === 'dark' && styles.active)}
          onClick={() =>
            store.actions.common.setTheme({
              theme: themesList.filter(theme => theme !== currentTheme)[0],
            })
          }
        />
        <Icon
          glyph={currentTheme === 'dark' ? Icon.glyphs.themeLight : Icon.glyphs.themeDark}
          className={styles.themeIcon}
        />
      </>
    );
  }
}
