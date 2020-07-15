import _ from 'lodash';
import React from 'react';

import { FieldValidatorType } from 'common';
import { ConnectedComponent } from 'components/ConnectedComponent';

import styles from '../Form.scss';

interface ErrorsProps {
  errors: FieldValidatorType[];
}

@ConnectedComponent.observer
export class Errors extends ConnectedComponent<ErrorsProps> {
  declare context: typeof ConnectedComponent['context'];

  render() {
    const { store } = this.context;
    const { errors } = this.props;

    if (errors.length === 0) return null;

    return (
      <div className={styles.errors}>
        {errors.map(({ message }) => (
          <div className={styles.errorItem} key={message.name}>
            {_.isPlainObject(message) ? store.getLn(message) : message}
          </div>
        ))}
      </div>
    );
  }
}
