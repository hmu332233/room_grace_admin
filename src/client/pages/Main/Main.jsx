import React from 'react';
import PropTypes from 'prop-types';
import styles from './Main.scss';

import BasicLayout from 'components/BasicLayout';
import Counter from 'containers/Counter';

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <BasicLayout>
        테스트
        <Counter/>
      </BasicLayout>
    );
  }
}

Main.propTypes = {};
Main.defaultProps = {};

export default Main;
