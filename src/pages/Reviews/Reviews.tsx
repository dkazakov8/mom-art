import React from 'react';
import { observable, autorun, IReactionDisposer } from 'mobx';
import ReactMarkdown from 'react-markdown';
import Scrollbar from 'react-scrollbars-custom';

import { Header } from 'components/Header';
import { ConnectedComponent } from 'components/ConnectedComponent';
import { images } from 'assets/images';
import { Footer } from 'components/Footer';
import { getElementChildren, getElementVerticalPaddings, sumElementsHeights } from 'utils';

import styles from './Reviews.scss';
import { messages } from './messages';

const minScrollAreaHeight = 100;

@ConnectedComponent.observer
export class Reviews extends ConnectedComponent {
  declare context: typeof ConnectedComponent['context'];

  state = observable({
    // Server does not have screen size, have to use a constant for correct hydration
    scrollAreaHeight: minScrollAreaHeight,
  });
  wrapperElement: HTMLElement;
  heightChangeDisposer: IReactionDisposer;

  UNSAFE_componentWillMount() {
    const { store } = this.context;

    store.router.metaData = {
      title: store.getLn(messages.metaTitle),
      description: store.getLn(messages.metaDescription),
    };
  }

  componentDidMount() {
    this.heightChangeDisposer = autorun(() => {
      this.state.scrollAreaHeight = this.scrollAreaHeight;
    });
  }

  componentWillUnmount() {
    this.heightChangeDisposer();
  }

  get scrollAreaHeight() {
    /**
     * Scroll area must use all available height
     *
     */

    const { store } = this.context;

    const wrapperVerticalPaddings = getElementVerticalPaddings({ element: this.wrapperElement });
    const childrenExceptScrollArea = getElementChildren({
      element: this.wrapperElement,
      exclude: el => !el.className.includes('ScrollbarsCustom'),
    });
    const usedVerticalSpace =
      sumElementsHeights({ elements: childrenExceptScrollArea }) +
      wrapperVerticalPaddings +
      store.ui.heights.header;
    const scrollAreaHeight = store.ui.screen.height - usedVerticalSpace;

    return Math.max(scrollAreaHeight, minScrollAreaHeight);
  }

  render() {
    const { store } = this.context;

    return (
      <>
        <Header />
        <img className={styles.leftImage} src={images.pageReviewsBg} />
        <div className={styles.wrapper} ref={node => (this.wrapperElement = node)}>
          <div className={styles.title}>{store.getLn(messages.title)}</div>
          <Scrollbar
            style={{ height: this.state.scrollAreaHeight }}
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
