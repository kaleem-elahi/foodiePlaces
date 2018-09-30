import React, { Component } from 'react';
// import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
import AddRestaurantModal from './components/AddRestaurantModal';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {
  // constructor(props) {
  //   super(props);
  // }

  submitAddRestaurantForm(values) {
    console.log(values, this);
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          <AddRestaurantModal submitAddRestaurantForm={this.submitAddRestaurantForm} />
          <Button color="danger">Danger!</Button>
          To get started, edit
          {' '}
          <code>src/App.js</code>
          {' '}
and save to reload.
        </p>
      </div>
    );
  }
}

App.propTypes = {
  // boolean to control the state of the popover
  // handleSubmit: PropTypes.func.isRequired,
};
App.defaultProps = {
  // className: '',
};

// function mapStateToProps() {}
// function mapDispatchToProps() {}

export default (App);
