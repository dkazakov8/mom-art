import React from 'react';

import { fieldValidators } from 'utils';
import { Form } from 'components/Form';
import { Header } from 'components/Header';
import { ConnectedComponent } from 'components/ConnectedComponent';

import styles from './EditLocalization.scss';
import { messages } from './messages';

interface TranslationItemProps {
  lang: string;
  storePath: string;
  defaultValue: string;
  translationName: string;
}

@ConnectedComponent.observer
class TranslationItem extends ConnectedComponent<TranslationItemProps> {
  declare context: typeof ConnectedComponent['context'];

  render() {
    const {
      store: {
        admin: { translations },
      },
    } = this.context;
    const { lang, storePath, defaultValue, translationName } = this.props;

    const isTextarea = defaultValue.indexOf('textarea') === 0;
    const translationNameFormatted = translationName.replace('src/', '').replace('__', '.');

    return (
      <Form.Input.Text
        isTextarea={isTextarea}
        validators={[fieldValidators.emptyString]}
        storePath={`${storePath}.${translationName}-${lang}`}
        label={`${translationNameFormatted} [${defaultValue}] - ${lang}`}
        defaultValue={translations[translationName][lang]}
      />
    );
  }
}

@ConnectedComponent.observer
export class EditLocalization extends ConnectedComponent {
  declare context: typeof ConnectedComponent['context'];

  UNSAFE_componentWillMount() {
    const { store } = this.context;

    store.router.metaData = {
      title: store.getLn(messages.metaTitle),
    };
  }

  handleFormSubmit = formData => {
    const { store } = this.context;

    const storePath = `admin.form`;

    return store.actions.common.saveAllLocalization({ formData, storePath });
  };

  render() {
    const {
      store: {
        ui: { languagesList },
        admin: { translations },
      },
    } = this.context;

    const storePath = `admin.form`;

    return (
      <>
        <Header />
        <div className={styles.translations}>
          <Form storePath={storePath} onSubmit={this.handleFormSubmit}>
            {Object.entries(translations).map(([translationName, { defaultValue }]) => (
              <div key={translationName} className={styles.item}>
                {languagesList.map(lang => (
                  <TranslationItem
                    key={lang}
                    lang={lang}
                    storePath={storePath}
                    defaultValue={defaultValue}
                    translationName={translationName}
                  />
                ))}
              </div>
            ))}
            <Form.Input.Submit label={messages.saveButton} />
          </Form>
        </div>
      </>
    );
  }
}
