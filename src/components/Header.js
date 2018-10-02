import React, { Component } from 'react';
// import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';

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
import { reset } from 'redux-form';
import { addRestaurant } from '../redux/actions/index';

import AddRestaurantModal from './AddRestaurantModal';
import logo from '../assets/img/icon.png';
import { auth, database, storage } from '../config/Firebase-config';

const processImage = (file) => {
  const promise = new Promise((resolve, reject) => {
    const reader = new FileReader();
    const fileData = file;
    fileData.end = fileData.size;
    reader.readAsArrayBuffer(fileData);
    reader.onloadend = (evt) => {
      const imageBlob = new Blob([evt.target.result], { type: 'image/jpeg' });
      resolve(imageBlob);
    };
  });
  return promise;
};
const s4 = () => Math.floor((1 + Math.random()) * 0x10000)
  .toString(16)
  .substring(1);

const guid = () => `${s4() + s4()}-${s4()}-${s4()}-${
  s4()}-${s4()}${s4()}${s4()}`;


class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      loading: false,
      isOpen: false,
    };

    this.toggle = this.toggle.bind(this);
    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.submitAddRestaurantForm = this.submitAddRestaurantForm.bind(this);
    this.addRestaurantFireFunc = this.addRestaurantFireFunc.bind(this);
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


  submitAddRestaurantForm(values, file) {
    this.setState({ loading: true });

    const currentDate = new Date(); // for now
    const data = {
      ...values,
      date: currentDate.toLocaleDateString(),
    };

    if (file) {
      processImage(file).then((image) => {
        const fileName = guid();
        storage
          .ref(`images/${fileName}`)
          .put(image)
          .then((snapshot) => {
            data.image = snapshot.downloadURL;
            this.addRestaurantFireFunc(this.props.authUser, data);
            // database.ref(`${this.props.authUser.uid}/contacts`).push(contact);
          })
          .catch((err) => {
            console.log(err, err.response);
            toast.error(err.message);
          });
      });
    } else {
      this.addRestaurantFireFunc(this.props.authUser, data);
    }
  }

  addRestaurantFireFunc(user, restaurant) {
    database
      .ref(`${user.uid}/restaurants`)
      .push(restaurant)
      .once('value')
      .then((snap) => {
        const restaurantV = snap.val();
        restaurantV.key = snap.key;
        this.props.addRestaurant(restaurantV);
        this.props.dispatch(reset('addRestaurantForm'));
        toast.success('Restaurant added successfully !');
        this.setState({ modal: false, loading: false });
      })
      .catch((err) => {
        (err, err.response);
        toast.error(err.message);
        this.setState({ loading: false });
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
              <AddRestaurantModal
                dispatch={this.props.dispatch}
                modal={this.state.modal}
                toggle={this.toggle}
                loading={this.state.loading}
                submitAddRestaurantForm={this.submitAddRestaurantForm}
              />
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
  dispatch: PropTypes.func.isRequired,
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
