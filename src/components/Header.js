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
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';
import { addRestaurantThunk } from '../redux/actions/index';
import AddRestaurantModal from './AddRestaurantModal';
import logo from '../assets/img/icon.png';

class Header extends Component {
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
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/">
          {' '}
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">FoodiePlaces</h1>
        </NavbarBrand>
        <NavbarToggler onClick={this.toggle} />
        <Collapse isOpen navbar>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <AddRestaurantModal submitAddRestaurantForm={this.submitAddRestaurantForm} />
            </NavItem>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                {this.props.authUser.displayName}
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>
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
  addRestaurantThunk: PropTypes.func.isRequired,
  authUser: PropTypes.objectOf(PropTypes.any).isRequired,
};
Header.defaultProps = {
  // className: '',
};

// function mapStateToProps() {}
const mapDispatchToProps = dispatch => ({
  addRestaurantThunk: (user, contact) => dispatch(addRestaurantThunk(user, contact)),
});

export default connect(null, mapDispatchToProps)(Header);
