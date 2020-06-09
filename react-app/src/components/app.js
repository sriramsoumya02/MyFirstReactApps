import React, { Component } from 'react';
import Navbar from './navbar';
import Counters from './counters';
class App extends Component {
  state = {
    counters: [
      { id: 1, value: 1 },
      { id: 2, value: 2 },
      { id: 3, value: 0 },
      { id: 4, value: 0 },
    ],
  };
  constructor(props) {
    super(props);
    console.log('App - constructor', this.props);
    //this.state=this.props.something;
  }
  componentDidMount() {
    //AjaxCalls
    //this.setState({movies});
    console.log('App-Mounted');
  }
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
    this.setState({ counters });
  };
  handleDecrement = (counter) => {
    console.log('handleDecrement' + counter);
    const counters = [...this.state.counters];
    const index = counters.indexOf(counter);
    counters[index] = { ...counter };
    counters[index].value--;
    this.setState({ counters });
  };
  handleReset = () => {
    const counters = this.state.counters.map((counter) => {
      counter.value = 0;
      return counter;
    });
    this.setState({ counters });
  };
  render() {
    console.log('App-rendered');
    return (
      <React.Fragment>
        <Navbar totalCounter={this.state.counters.length} />
        <Counters
          counters={this.state.counters}
          onReset={this.handleReset}
          onDelete={this.handleDelete}
          onIncrement={this.handleIncreament}
          onDecrement={this.handleDecrement}
        />
      </React.Fragment>
    );
  }
}

export default App;
