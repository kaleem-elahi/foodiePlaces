import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { ToastContainer } from 'react-toastify';
import classnames from 'classnames';
import FontAwesome from 'react-fontawesome';
import {
  Container, Row, Col,
  TabContent, TabPane, Nav, NavItem, NavLink,
} from 'reactstrap';
import { getRestaurants, toggleFavourite } from './redux/actions/index';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
import CardBlock from './components/CardBlock';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import greyStar from './assets/img/star-grey.png';

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
      activeTab: '1',
      restaurants: [],
      isSortedByRating: true,
      isSortByRestaurant: true,
    };
    this.tabToggle = this.tabToggle.bind(this);
    this.getFavourites = this.getFavourites.bind(this);
    this.sortByRating = this.sortByRating.bind(this);
    this.sortByRestaurant = this.sortByRestaurant.bind(this);
  }

  componentDidMount() {
    this.getRestaurantsFireFunc(this.props.authUser);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.restaurants.length !== nextProps.restaurants.length) {
      this.setState({
        restaurants: nextProps.restaurants.reverse(),
      });
    }
  }


  getRestaurantsFireFunc(user) {
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
    const favouriteRestaurants = this.state.restaurants.filter(
      contact => contact.isFavourite,
    );
    return favouriteRestaurants;
  }

  toggleFavouriteFireFunc(restaurant, user) {
    const restaurantV = restaurant;
    restaurantV.isFavourite = !restaurant.isFavourite;
    database
      .ref(`${user.uid}/restaurants/${restaurantV.key}`)
      .set(restaurantV)
      .then(() => {
        this.props.toggleFavourite(restaurantV);
      });
  }

  tabToggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab,
      });
    }
  }

  sortByRating(restos, bool) {
    // if (bool !== this.state.isSortedByRating) {
    const restaurants = restos.map((resto) => {
      if (!resto.rating) {
        return {
          ...resto,
          rating: 0,
        };
      }
      return resto;
    });
    this.setState({
      restaurants: bool ? restaurants.sort((a, b) => a.rating - b.rating
      || a.restaurantName.localeCompare(b.restaurantName))
        : restaurants.sort((a, b) => b.rating - a.rating
        || a.restaurantName.localeCompare(b.restaurantName)),
    }, () => {
      this.setState({
        isSortedByRating: !bool,
      });
    });
    // }
  }

  sortByRestaurant(restos, bool) {
    // if (bool !== this.state.isSortedByRating) {
    const restaurants = restos;
    this.setState({
      restaurants: bool ? restaurants.sort((a, b) => b.restaurantName - a.restaurantName || a.restaurantName.localeCompare(b.restaurantName))
        : restaurants.sort((a, b) => a.restaurantName - b.restaurantName || b.restaurantName.localeCompare(a.restaurantName)),
    }, () => {
      this.setState({
        isSortByRestaurant: !bool,
      });
    });
    // }
  }

  render() {
    console.log(this.props.restaurants, this.state.restaurants);
    return (
      <div className="App">
        <Header authUser={this.props.authUser} />
        <ToastContainer />

        <div className="App-intro">
          <br />
          <Container>
            <Row>
              <Col sm="12" md={{ size: 8, offset: 2 }}>
                {this.state.restaurants.length === 0 && !this.state.loadingRestaurants
                && (
                  'Hey, Just Click on that button to post new restaurants'
                )}
                {this.state.restaurants.length >= 0 && !this.state.loadingRestaurants
                  ? (
                    <Fragment>
                      <Nav tabs>
                        <div className="display-flex">
                          <div
                            className="rating-sort"
                            style={{
                              backgroundSize: 'cover',
                              backgroundPosition: 'center',
                            }}
                            alt="Card image cap"
                            role="presentation"
                            onKeyDown={() => {

                            }}
                            onClick={() => {
                              this.sortByRating(this.state.restaurants, this.state.isSortedByRating);
                            }}
                          >
                            {
                          this.state.isSortedByRating
                            ? <FontAwesome name="star-half-o" />
                            : <FontAwesome name="star" />

                        }
                          </div>
                          <div
                            className="rating-sort"
                            style={{
                              backgroundSize: 'cover',
                              backgroundPosition: 'center',
                            }}
                            alt="Card image cap"
                            role="presentation"
                            onKeyDown={() => {

                            }}
                            onClick={() => {
                              this.sortByRestaurant(this.state.restaurants, this.state.isSortByRestaurant);
                            }}
                          >
                            {
                          this.state.isSortByRestaurant
                            ? <FontAwesome name="sort-alpha-asc" />
                            : <FontAwesome name="sort-alpha-desc" />

                        }
                          </div>
                        </div>
                        <div className="display-flex">
                          <NavItem>
                            <NavLink
                              className={classnames({ active: this.state.activeTab === '1' })}
                              onClick={() => { this.tabToggle('1'); }}
                            >
                              <FontAwesome name="heart-o" />
                            </NavLink>
                          </NavItem>
                          <NavItem>
                            <NavLink
                              className={classnames({ active: this.state.activeTab === '2' })}
                              onClick={() => { this.tabToggle('2'); }}
                            >
                              <FontAwesome name="heart" />

                            </NavLink>
                          </NavItem>
                        </div>
                      </Nav>
                      <TabContent activeTab={this.state.activeTab}>
                        <div className="float-left-text">{this.state.activeTab === '1' ? 'All' : 'Favourites'}</div>

                        <TabPane tabId="1">
                          <Row>
                            <Col sm="12">
                              {this.state.restaurants.map(restaurant => (
                                <CardBlock
                                  fav={(
                                    <FontAwesome
                                      name="heart"
                                      onClick={
                                    () => this.toggleFavouriteFireFunc(restaurant, this.props.authUser)
                                  }
                                    />)}
                                  unFav={(
                                    <FontAwesome
                                      name="heart-o"
                                      onClick={
                                    () => this.toggleFavouriteFireFunc(restaurant, this.props.authUser)
                                  }
                                    />)}
                                  key={restaurant.key}
                                  restaurant={restaurant}
                                />
                              ))}
                            </Col>
                          </Row>
                        </TabPane>
                        <TabPane tabId="2">
                          <Row>
                            <Col sm="12">
                              {this.state.restaurants.filter(
                                restaurant => restaurant.isFavourite === true,
                              ).length > 0
                                ? (this.state.restaurants.filter(
                                  restaurant => restaurant.isFavourite === true,
                                ).map(restaurant => (
                                  <CardBlock
                                    fav={(
                                      <FontAwesome
                                        name="heart"
                                        onClick={
      () => this.toggleFavouriteFireFunc(restaurant, this.props.authUser)
    }
                                      />)}
                                    unFav={(
                                      <FontAwesome
                                        name="heart-o"
                                        onClick={
      () => this.toggleFavouriteFireFunc(restaurant, this.props.authUser)
    }
                                      />)}
                                    key={restaurant.key}
                                    restaurant={restaurant}
                                  />
                                )))
                                : <center className="goToAllLine"><small>Go to All and Favourite some restaurants</small></center>}
                            </Col>
                          </Row>
                        </TabPane>
                      </TabContent>

                    </Fragment>)
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
  toggleFavourite: PropTypes.func.isRequired,
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
  toggleFavourite: restaurant => dispatch(toggleFavourite(restaurant)),
});

export default connect(mapStateToProps,
  mapDispatchToProps)(App);
