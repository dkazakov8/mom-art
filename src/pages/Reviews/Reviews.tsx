import React from 'react';
import ReactMarkdown from 'react-markdown';
import Scrollbar from 'react-scrollbars-custom';

import { Header } from 'components/Header';
import { ConnectedComponent } from 'components/ConnectedComponent';
import { images } from 'assets/images';
import { Footer } from 'components/Footer';

import styles from './Reviews.scss';
import { messages } from './messages';

@ConnectedComponent.observer
export class Reviews extends ConnectedComponent {
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
      <>
        <Header />
        <img className={styles.leftImage} src={images.pageReviewsBg} />
        <div className={styles.wrapper}>
          <div className={styles.title}>{store.getLn(messages.title)}</div>
          <Scrollbar
            style={{ width: 800, height: 450 }}
            minimalThumbSize={14}
            maximalThumbSize={14}
          >
            <ReactMarkdown className={styles.text} source={store.getLn(messages.reviews)} />
          </Scrollbar>
        </div>
        <Footer className={styles.footer} />
      </>
    );
  }
}
