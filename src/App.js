import React, { Component } from 'react';
// import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button } from 'reactstrap';
import { addRestaurantThunk } from './redux/actions/index';
import AddRestaurantModal from './components/AddRestaurantModal';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.submitAddRestaurantForm = this.submitAddRestaurantForm.bind(this);
  }

  submitAddRestaurantForm(values) {
    console.log(values, this);
    this.props.addRestaurantThunk(this.props.authUser, values);
  }

  render() {
    console.log(this.props.authUser);
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
  addRestaurantThunk: PropTypes.func.isRequired,
  authUser: PropTypes.objectOf(PropTypes.any).isRequired,
};
App.defaultProps = {
  // className: '',
};

// function mapStateToProps() {}
const mapDispatchToProps = dispatch => ({
  addRestaurantThunk: (user, contact) => dispatch(addRestaurantThunk(user, contact)),
});

export default connect(null, mapDispatchToProps)(App);
