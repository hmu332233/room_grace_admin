import React from 'react';
import PropTypes from 'prop-types';
import styles from './Main.scss';

import BasicLayout from 'components/BasicLayout';

import RunningSwitch from 'containers/RunningSwitch';
import TimeSelector from 'containers/TimeSelector';
import TimeList from 'containers/TimeList';

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <BasicLayout>
        <RunningSwitch />
        <TimeSelector className={styles.Main__timeSelector}/>
        <TimeList className={styles.Main__list}/>
      </BasicLayout>
    );
  }
}

Main.propTypes = {};
Main.defaultProps = {};

export default Main;
