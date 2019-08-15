import React from 'react';
import PropTypes from 'prop-types';
import styles from './TimeList.scss';

import classnames from 'classnames';

import ClosableCard from 'components/ClosableCard';

function TimeList(props) {
  const handleItemClose = value => () => props.itemCloseClickHandler(value);
  return (
    <div className={classnames(styles.TimeList, props.className)}>
      {props.times.map((time, index) => (
        <ClosableCard
          className={styles.TimeList__item}
          key={time}
          onClick={handleItemClose(time)}
        >
          {time}
        </ClosableCard>
      ))}
    </div>
  );
}

TimeList.propTypes = {
  className: PropTypes.string,
  times: PropTypes.array,
  itemCloseClickHandler: PropTypes.func,
};
TimeList.defaultProps = {
  className: '',
  items: [],
  itemCloseClickHandler: v => v,
};

export default TimeList;
