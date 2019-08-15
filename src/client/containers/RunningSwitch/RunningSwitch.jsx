import React from 'react';
import PropTypes from 'prop-types';
import styles from './RunningSwitch.scss';

import { connect } from 'react-redux';
import { toggleRunning } from 'store/modules/timePicker';


import { Switch } from 'antd';

function RunningSwitch(props) {
  return (
    <Switch className={props.className} checked={props.isRunning} onChange={props.toggleRunning} />
  );
}

RunningSwitch.propTypes = {
  className: PropTypes.string,
};
RunningSwitch.defaultProps = {
  className: '',
};

const mapStateToProps = ({ timePicker }) => ({
  isRunning: timePicker.isRunning,
});

const mapDispatchToProps = dispatch => ({
  toggleRunning: () => dispatch(toggleRunning()),
});

export default connect(mapStateToProps, mapDispatchToProps)(RunningSwitch);