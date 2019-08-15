import React from 'react';
import PropTypes from 'prop-types';
import styles from './ClosableCard.scss';

import classnames from 'classnames';

import { Card, Icon } from 'antd';

function ClosableCard(props) {
  return (
    <Card
      className={classnames(styles.ClosableCard, props.className)}
      size="small"
    >
      {props.children}
      <Icon
        className={styles.ClosableCard__icon}
        type="close"
        onClick={props.onClick}
      />
    </Card>
  );
}

ClosableCard.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func
};
ClosableCard.defaultProps = {
  className: '',
  onClick: v => v
};

export default ClosableCard;
