import React, { Component } from 'react';
import PropType from 'prop-types';
import { Button } from 'reactstrap';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { loginThunk } from '../redux/actions/index';

class Login extends Component {
  loginWithGoogle() {
    this.props.loginThunk(() => {
      this.props.history.push('/home');
    });
  }

  render() {
    return (
      <center>
        <h4 style={{
          padding: '21px 65px',
          height: 'unset',
          color: '#ffffff',
          background: '#dc3545',
        }}
        >
Foodie you ?

        </h4>
        <br />
        <Button color="primary" onClick={() => this.loginWithGoogle()}>
          Login With Google
        </Button>
      </center>
    );
  }
}

Login.propTypes = {
  history: PropType.objectOf(PropType.any).isRequired,
  loginThunk: PropType.func.isRequired,
};

export default connect(
  null,
  { loginThunk },
)(withRouter(Login));
