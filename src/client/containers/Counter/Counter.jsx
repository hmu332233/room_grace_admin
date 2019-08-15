import React from 'react';
import styles from './Counter.scss';

import { increment, decrement } from 'store/modules/counter';

import { connect } from 'react-redux';

class Counter extends React.Component {
  constructor(props) {
    super(props);
  }

  handleIncrement = () => {
    this.props.increment();
  };
  handleDecrement = () => {
    this.props.decrement();
  };

  render() {
    return (
      <div className={styles.Counter}>
        <button onClick={this.handleIncrement}>올라감</button>
        <span>{this.props.number}</span>
        <button onClick={this.handleDecrement}>내려감</button>
      </div>
    );
  }
}

const mapStateToProps = ({ counter }) => ({
  number: counter.number,
});

const mapDispatchToProps = dispatch => ({
  increment: () => dispatch(increment()),
  decrement: () => dispatch(decrement()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Counter);