import React, { Component } from 'react';
/*
class Counter extends Component {
  state = {
    value: this.props.counter.value,
    tags: ['tag1', 'tag2', 'tag3'],
  };
  styles = {
    fontSize: 20,
    fontWeight: 'bold',
  };

  //constructor() {
  //  super();
  //  this.handleIncreament = this.handleIncreament.bind(this);
  //}
  render() {
    return (
      <React.Fragment>
        {this.props.children}
        <span style={this.styles} className={this.getBadgeClasses()}>
          {this.formatCount()}
        </span>
        <button
          onClick={() => this.handleIncreament({ id: 1 })}
          className="btn btn-secondary btn-sm"
        >
          Increment
        </button>
        <button
          className="btn btn-danger ml-2 btn-sm"
          onClick={() => this.props.onDelete(this.props.counter.id)}
        >
          Delete
        </button>
        {this.renderTags()}
        {this.state.tags.length === 0 && 'No tags are there'}
      </React.Fragment>
    );
  }

  //handleIncreament() {
  //  console.log('Increment clicked', this);
  //}
  handleIncreament = (product) => {
    //console.log('Increment clicked', this);
    console.log(product);
    this.setState({ value: this.state.value + 1 });
  };
  renderTags() {
    if (this.state.tags.length === 0) return <p> No tags avilable</p>;
    return (
      <ul>
        {this.state.tags.map((tag) => (
          <li key={tag}>{tag}</li>
        ))}
      </ul>
    );
  }
  getBadgeClasses() {
    let classes = 'badge m-2 badge-';
    classes += this.state.value === 0 ? 'warning' : 'primary';
    return classes;
  }
  formatCount() {
    const { value: count } = this.state;
    return count === 0 ? 'Zero' : count;
  }
} 

*/
class Counter extends Component {
  componentDidUpdate(prevProps, prevState) {
    console.log('Prev Props', prevProps);
    console.log('prev State', prevState);
    if (prevProps.counter.value !== this.props.counter.value) {
      //do Ajax call and get the new data from server
    }
  }
  componentWillUnmount() {
    console.log('Counter- UnMount');
  }
  render() {
    const {
      counter,
      onIncrement,
      onDecrement,
      onDelete,
      children,
    } = this.props;
    console.log('Counter-rendered');
    return (
      <React.Fragment>
        {children}
        <span style={this.styles} className={this.getBadgeClasses()}>
          {this.formatCount()}
        </span>
        <button
          onClick={() => onIncrement(counter)}
          className="btn btn-secondary btn-sm"
        >
          +
        </button>
        <button
          className="btn btn-secondary btn-sm m-2"
          onClick={() => onDecrement(counter)}
          disabled={counter.value === 0}
        >
          {' '}
          -{' '}
        </button>
        <button
          className="btn btn-danger ml-2 btn-sm"
          onClick={() => onDelete(counter.id)}
        >
          x
        </button>
      </React.Fragment>
    );
  }
  getBadgeClasses() {
    let classes = 'badge m-2 badge-';
    classes += this.props.counter.value === 0 ? 'warning' : 'primary';
    return classes;
  }
  formatCount() {
    const { value: count } = this.props.counter;
    return count === 0 ? 'Zero' : count;
  }
}
export default Counter;
