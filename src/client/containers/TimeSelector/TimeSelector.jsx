import React from 'react';
import styles from './TimeSelector.scss';
import 'rc-time-picker/assets/index.css';

import { connect } from 'react-redux';
import { addTime, toggleRunning } from 'store/modules/timePicker';

import { TimePicker, Switch , Button } from 'antd';

class TimeSelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      time: null
    };
  }

  handleTimeChange = (value) => {
    this.setState({ time: value });
  }

  handleButtonClick = e => {
    this.state.time && this.props.addTime(this.state.time);
  }

  handleSwitchChange = () => {
    this.props.toggleRunning();
  }

  render() {
    return (
      <div className={styles.TimeSelector}>
        <Switch checked={this.props.isRunning} onChange={this.handleSwitchChange} />
        <TimePicker
          format={'HH:mm'}
          onChange={this.handleTimeChange}
        />
        <Button type="primary" onClick={this.handleButtonClick}>추가</Button>
      </div>
    );
  }
}

const mapStateToProps = ({ timePicker }) => ({
  isRunning: timePicker.isRunning,
});

const mapDispatchToProps = dispatch => ({
  addTime: time => dispatch(addTime(time)),
  toggleRunning: () => dispatch(toggleRunning())
});

export default connect(mapStateToProps, mapDispatchToProps)(TimeSelector);