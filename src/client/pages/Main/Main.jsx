import React from 'react';
import PropTypes from 'prop-types';
import styles from './Main.scss';

import BasicLayout from 'components/BasicLayout';
import TimeSelector from 'containers/TimeSelector';

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <BasicLayout>
        <TimeSelector/>
      </BasicLayout>
    );
  }
}

Main.propTypes = {};
Main.defaultProps = {};

export default Main;
