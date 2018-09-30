import React, { Component } from 'react';
// import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';
import { withRouter } from 'react-router';
import { addRestaurant } from '../redux/actions/index';
import AddRestaurantModal from './AddRestaurantModal';
import logo from '../assets/img/icon.png';
import { auth, database } from '../config/Firebase-config';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      isOpen: false,
    };

    this.toggle = this.toggle.bind(this);
    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.submitAddRestaurantForm = this.submitAddRestaurantForm.bind(this);
    this.addRestaurantThunk = this.addRestaurantThunk.bind(this);
    this.logout = this.logout.bind(this);
  }

  logout() {
    auth.signOut();
    this.props.history.push('/');
  }

  toggleNavbar() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }


  toggle() {
    this.setState({
      modal: !this.state.modal,
    });
  }


  submitAddRestaurantForm(values) {
    const currentDate = new Date(); // for now
    console.log({
      ...values,
      currentDate,
    });
    this.addRestaurantThunk(this.props.authUser, {
      ...values,
      date: currentDate.toLocaleDateString(),
    });
  }

  addRestaurantThunk(user, restaurant) {
    database
      .ref(`${user.uid}/restaurants`)
      .push(restaurant)
      .once('value')
      .then((snap) => {
        const restaurantV = snap.val();
        restaurantV.key = snap.key;
        this.props.addRestaurant(restaurantV);
        this.setState({
          modal: false,
        });
      });
  }


  render() {
    console.log(this.props.authUser);
    return (
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/">
          {' '}
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">FoodiePlaces</h1>
        </NavbarBrand>
        <NavbarToggler onClick={this.toggleNavbar} />
        <Collapse isOpen={this.state.isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <AddRestaurantModal modal={this.state.modal} toggle={this.toggle} submitAddRestaurantForm={this.submitAddRestaurantForm} />
            </NavItem>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                <img
                  width="30px"
                  alt={this.props.authUser.displayName}
                  src={this.props.authUser.photoURL}
                  className="rounded-circle"
                />

              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem onClick={() => this.logout()}>
          Logout
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
        </Collapse>
      </Navbar>);
  }
}

Header.propTypes = {
  // boolean to control the state of the popover
  addRestaurant: PropTypes.func.isRequired,
  // dispatch: PropTypes.func.isRequired,
  authUser: PropTypes.objectOf(PropTypes.any).isRequired,
  history: PropTypes.objectOf(PropTypes.any),
};
Header.defaultProps = {
  history: {},
};

// function mapStateToProps() {}
const mapDispatchToProps = dispatch => ({
  dispatch,
  addRestaurant: (user, contact) => dispatch(addRestaurant(user, contact)),
});

export default connect(null, mapDispatchToProps)(withRouter(Header));
