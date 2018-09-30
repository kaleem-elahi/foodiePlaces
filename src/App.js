import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Container, Row, Col } from 'reactstrap';
import { getRestaurants, toggleFavouriteThunk } from './redux/actions/index';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
import CardBlock from './components/CardBlock';
import './App.css';
import {
  // auth,
  database,
  // storage,
} from './config/Firebase-config';
import CardLoader from './components/CardLoader';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loadingRestaurants: false,
    };
  }

  componentDidMount() {
    this.getRestaurantsThunk(this.props.authUser);
  }

  getRestaurantsThunk(user) {
    this.setState({
      loadingRestaurants: true,
    });
    const restaurants = [];
    database
      .ref(`${user.uid}/restaurants`)
      .once('value', (snap) => {
        snap.forEach((data) => {
          const restaurant = data.val();
          restaurant.key = data.key;
          restaurants.push(restaurant);
        });
      })
      .then(() => {
        console.log(restaurants);
        this.setState({
          loadingRestaurants: false,
        });
        this.props.getRestaurants(restaurants);
      });
  }


  getFavourites() {
    const favouriteRestaurants = this.props.restaurants.filter(
      contact => contact.isFavourite,
    );
    return favouriteRestaurants;
  }

  toggleFavourite(contact) {
    this.props.toggleFavouriteThunk(contact, this.props.authUser);
  }

  render() {
    console.log(this.props.authUser);
    return (
      <div className="App">
        <Header authUser={this.props.authUser} />
        <div className="App-intro">
          <br />
          <Container>
            <Row>
              <Col sm="12" md={{ size: 8, offset: 2 }}>
                {this.props.restaurants.length === 0 && !this.state.loadingRestaurants
                && (
                  'Hey, Just Click on that Red button to add restaurant'
                )}
                {this.props.restaurants.length >= 0 && !this.state.loadingRestaurants
                  ? this.props.restaurants.map(restaurant => (
                    <CardBlock
                      toggleFavourite={this.toggleFavourite}
                      favRestaurants={this.getFavourites()}
                      key={restaurant.key}
                      restaurant={restaurant}
                    />
                  ))
                  : <CardLoader />}
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    );
  }
}

App.propTypes = {
  // boolean to control the state of the popover
  authUser: PropTypes.objectOf(PropTypes.any).isRequired,
  restaurants: PropTypes.arrayOf(PropTypes.any),
  getRestaurants: PropTypes.func.isRequired,
  toggleFavouriteThunk: PropTypes.func.isRequired,
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
  getRestaurants: restaurant => dispatch(getRestaurants(restaurant)),
  toggleFavouriteThunk: (contact, user) => dispatch(toggleFavouriteThunk(contact, user)),
});

export default connect(mapStateToProps,
  mapDispatchToProps)(App);
