import React from 'react';
import PropTypes from 'prop-types';
import styles from './TimeList.scss';

import { connect } from 'react-redux';
import { deleteTime } from 'store/modules/timePicker';

import classnames from 'classnames';

import TimeList from 'components/TimeList';

class TimeListContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  handleItemCloseClick = value => {
    this.props.deleteTime(value);
  }

  render() {
    return (
      <TimeList
        className={this.props.className}
        times={this.props.times}
        itemCloseClickHandler={this.handleItemCloseClick}
      />
    );
  }
}

const mapStateToProps = ({ timePicker }) => ({
  times: timePicker.times,
});

const mapDispatchToProps = dispatch => ({
  deleteTime: time => dispatch(deleteTime(time)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TimeListContainer);