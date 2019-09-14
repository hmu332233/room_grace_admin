import React from 'react';
import PropTypes from 'prop-types';
import styles from './RunningSwitch.scss';

import { connect } from 'react-redux';
import { toggleRunning, setRunning } from 'store/modules/runner';

import axios from 'axios';
import { Switch } from 'antd';

class RunningSwitch extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.fetchIsRunning();
  }

  fetchIsRunning = () => {
    axios
      .get(`/api/v1/cron/status`)
      .then(res => {
        this.props.setRunning(res.data.data.isRunning);
      });
  }

  toggleRunning = () => {
    axios
      .post(`/api/v1/cron/${this.props.isRunning ? 'stop' : 'start'}`)
      .then(res => {
        this.props.toggleRunning();
      });
  }
  render() {
    return (
      <Switch
        className={this.props.className}
        checked={this.props.isRunning}
        onChange={this.toggleRunning}
      />
    );
  }
}

RunningSwitch.propTypes = {
  className: PropTypes.string,
};
RunningSwitch.defaultProps = {
  className: '',
};

const mapStateToProps = ({ runner }) => ({
  isRunning: runner.isRunning,
});

const mapDispatchToProps = dispatch => ({
  toggleRunning: () => dispatch(toggleRunning()),
  setRunning: isRunning => dispatch(setRunning(isRunning)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RunningSwitch);
