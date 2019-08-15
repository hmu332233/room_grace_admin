import React from 'react';
import styles from './TimeSelector.scss';
import 'rc-time-picker/assets/index.css';

import { connect } from 'react-redux';
import { addTime, toggleRunning } from 'store/modules/timePicker';

import moment from 'moment';

import { TimePicker, Switch , Button } from 'antd';

const DEFAULT_TIME = moment('00:00', 'HH:mm');

class TimeSelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      time: '00:00',
    };
  }

  handleTimeChange = value => {
    this.setState({ time: value.format('HH:mm') });
  }

  handleButtonClick = () => {
    this.setState({ time: '00:00' });
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
          defaultOpenValue={DEFAULT_TIME}
          value={moment(this.state.time, 'HH:mm')}
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