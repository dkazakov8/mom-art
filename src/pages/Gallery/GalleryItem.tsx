import React from 'react';

import { TypeGalleryItem } from 'models';
import { ConnectedComponent } from 'components/ConnectedComponent';

import styles from './Gallery.scss';

interface GalleryItemProps {
  style: Record<string, any>;
  onClick: (event?: React.MouseEvent) => void;
  imgData: TypeGalleryItem;
}

@ConnectedComponent.observer
export class GalleryItem extends ConnectedComponent<GalleryItemProps> {
  declare context: typeof ConnectedComponent['context'];

  render() {
    const {
      store: {
        ui: { currentLanguage },
      },
    } = this.context;
    const { imgData, style, onClick } = this.props;
    const title = imgData.title[currentLanguage];

    return (
      <a
        className={styles.item}
        href={imgData.sources.big.src}
        style={style}
        title={title}
        onClick={onClick}
      >
        <img src={imgData.sources.small.src} alt={title} title={title} />
      </a>
    );
  }
}
