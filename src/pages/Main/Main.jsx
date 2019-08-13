import React from 'react';
import PropTypes from 'prop-types';
import styles from './Main.scss';

import { DatePicker, message } from 'antd';
import 'antd/dist/antd.css';

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: null,
    };
  }

  handleChange = date => {
    message.info(`Selected Date: ${date ? date.format('YYYY-MM-DD') : 'None'}`);
    this.setState({ date });
  }

  render() {
    return (
      <div className={styles.Main}>
        <DatePicker onChange={this.handleChange} />
      </div>
    );
  }
}

Main.propTypes = {
};
Main.defaultProps = {
};

export default Main;