import React from 'react';
import styles from './TimeSelector.scss';
import 'rc-time-picker/assets/index.css';

import { connect } from 'react-redux';
import { addTime, toggleRunning } from 'store/modules/timePicker';

import moment from 'moment';
import classnames from 'classnames';

import { TimePicker, Button } from 'antd';

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

  render() {
    return (
      <div className={classnames(styles.TimeSelector, this.props.className)}>
        <TimePicker
          className={styles.TimeSelector__picker}
          format={'HH:mm'}
          defaultOpenValue={DEFAULT_TIME}
          value={moment(this.state.time, 'HH:mm')}
          onChange={this.handleTimeChange}
        />
        <Button className={styles.TimeSelector__button} type="primary" onClick={this.handleButtonClick}>추가</Button>
      </div>
    );
  }
}

const mapStateToProps = ({ timePicker }) => ({
});

const mapDispatchToProps = dispatch => ({
  addTime: time => dispatch(addTime(time)),
  toggleRunning: () => dispatch(toggleRunning())
});

export default connect(mapStateToProps, mapDispatchToProps)(TimeSelector);