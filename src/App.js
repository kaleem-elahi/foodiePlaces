import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './App.css';
import { getRestaurantsThunk } from './redux/actions/index';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';

class App extends PureComponent {
  // constructor(props) {
  //   super(props);
  // }
  componentDidMount() {
    this.props.getRestaurantsThunk(this.props.authUser);
  }

  render() {
    console.log(this.props.authUser);
    return (
      <div className="App">
        <Header authUser={this.props.authUser} />
        <div className="App-intro">
          {this.props.restaurants.map(d => (
            <div>{d.restaurantName}</div>
          ))}
          <code>src/App.js</code>
and save to reload.
        </div>
      </div>
    );
  }
}

App.propTypes = {
  // boolean to control the state of the popover
  authUser: PropTypes.objectOf(PropTypes.any).isRequired,
  restaurants: PropTypes.arrayOf(PropTypes.any),
  getRestaurantsThunk: PropTypes.func.isRequired,
};
App.defaultProps = {
  restaurants: [],
};

function mapStateToProps(state) {
  console.log(state);
  return ({
    restaurants: state.data.restaurants,
  });
}
const mapDispatchToProps = dispatch => ({
  getRestaurantsThunk: (user, contact) => dispatch(getRestaurantsThunk(user, contact)),
});

export default connect(mapStateToProps,
  mapDispatchToProps)(App);
