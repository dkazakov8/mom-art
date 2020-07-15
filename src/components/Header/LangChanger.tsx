import cn from 'classnames';
import React from 'react';

import { ConnectedComponent } from 'components/ConnectedComponent';

import styles from './Header.scss';

@ConnectedComponent.observer
export class LangChanger extends ConnectedComponent {
  declare context: typeof ConnectedComponent['context'];

  render() {
    const {
      store,
      store: {
        ui: { currentLanguage, languagesList },
      },
    } = this.context;

    return (
      <>
        {languagesList
          .filter(language => language !== currentLanguage)
          .map(language => (
            <div
              key={language}
              className={cn(styles.languageToggler, language === currentLanguage && styles.active)}
              onClick={() => store.actions.common.getLocalization({ language })}
            >
              {language}
            </div>
          ))}
      </>
    );
  }
}
