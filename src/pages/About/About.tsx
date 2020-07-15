import React from 'react';
import ReactMarkdown from 'react-markdown';
import Scrollbar from 'react-scrollbars-custom';

import { Icon } from 'components/Icon';
import { Header } from 'components/Header';
import { Footer } from 'components/Footer';
import { ConnectedComponent } from 'components/ConnectedComponent';
import { images } from 'assets/images';

import styles from './About.scss';
import { messages } from './messages';

@ConnectedComponent.observer
export class About extends ConnectedComponent {
  declare context: typeof ConnectedComponent['context'];

  UNSAFE_componentWillMount() {
    const { store } = this.context;

    store.router.metaData = {
      title: store.getLn(messages.metaTitle),
      description: store.getLn(messages.metaDescription),
    };
  }

  render() {
    const { store } = this.context;

    return (
      <div className={styles.pageAbout}>
        <Header />
        <img className={styles.leftImage} src={images.pageAboutBg} />
        <div className={styles.wrapper}>
          <div className={styles.title}>{store.getLn(messages.title)}</div>
          <Scrollbar
            style={{ width: 800, height: 250 }}
            minimalThumbSize={14}
            maximalThumbSize={14}
          >
            <ReactMarkdown className={styles.text} source={store.getLn(messages.about)} />
          </Scrollbar>
          <div className={styles.signLine}>
            <Icon className={styles.sign} glyph={Icon.glyphs.sign} />
          </div>
          <div className={styles.socialLine}>
            <a target="_blank" href={store.getLn(messages.instagram)} className={styles.socialLink}>
              <Icon glyph={Icon.glyphs.instagram} />
            </a>
            <a href={store.getLn(messages.email)} className={styles.socialLink}>
              <Icon glyph={Icon.glyphs.email} />
            </a>
          </div>
          <Footer />
        </div>
      </div>
    );
  }
}
