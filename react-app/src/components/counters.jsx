import React, { Component } from 'react';
import Counter from './counter';

class Counters extends Component {
  /* state = {
    counters: [
      { id: 1, value: 1 },
      { id: 2, value: 2 },
      { id: 3, value: 0 },
      { id: 4, value: 0 },
    ],
  };
  handleDelete = (counterId) => {
    console.log('Event Handler Called' + counterId);
    let counters = this.state.counters.filter(
      (counter) => counter.id !== counterId
    );
    this.setState({ counters: counters });
  };
  handleIncreament = (counter) => {
    console.log('handleIncrement' + counter);
    const counters = [...this.state.counters];
    const index = counters.indexOf(counter);
    counters[index] = { ...counter };
    counters[index].value++;
    //counters.map((counter) => {
    // if (counter.id === counterId) counter.value++;
    //return counter;
    //});
    this.setState({ counters });
  };
  handleReset = () => {
    const counters = this.state.counters.map((counter) => {
      counter.value = 0;
      return counter;
    });
    this.setState({ counters });
  };*/
  render() {
    console.log('Counters-rendered');
    const {
      onReset,
      counters,
      onDelete,
      onIncrement,
      onDecrement,
    } = this.props;
    return (
      <div className="container">
        <button className="btn btn-primary btn-sm m-2" onClick={onReset}>
          Reset
        </button>
        {counters.map((counter) => (
          <Counter
            key={counter.id}
            counter={counter}
            onDelete={onDelete}
            onIncrement={onIncrement}
            onDecrement={onDecrement}
          >
            <h4> Counter # {counter.id}</h4>
          </Counter>
        ))}
      </div>
    );
  }
}
export default Counters;
