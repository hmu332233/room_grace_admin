import React from 'react';
import PropTypes from 'prop-types';
import styles from './TimeList.scss';

import { Tag } from 'antd';

function TimeList(props) {
  const handleItemClose = value => () => props.itemCloseClickHandler(value);
  return (
    <div className={styles.TimeList}>
      {props.times.map((time, index) => (
        <Tag
          key={time}
          closable
          onClose={handleItemClose(time)}
        >
          {time}
        </Tag>
      ))}
    </div>
  );
}

TimeList.propTypes = {
  times: PropTypes.array,
  itemCloseClickHandler: PropTypes.func,
};
TimeList.defaultProps = {
  items: [],
  itemCloseClickHandler: v => v,
};

export default TimeList;
