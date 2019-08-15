import React from 'react';
import styles from './TimeSelector.scss';
import 'rc-time-picker/assets/index.css';

import { connect } from 'react-redux';
import { addTime } from 'store/modules/timePicker';

import TimePicker from 'rc-time-picker';
import { Button } from 'antd';

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

  render() {
    return (
      <div className={styles.TimeSelector}>
        <TimePicker
          showSecond={false}
          onChange={this.handleTimeChange}
        />
        <Button type="primary" onClick={this.handleButtonClick}>추가</Button>
      </div>
    );
  }
}

const mapStateToProps = ({ timePicker }) => ({
});

const mapDispatchToProps = dispatch => ({
  addTime: time => dispatch(addTime(time)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TimeSelector);