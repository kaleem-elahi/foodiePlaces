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
      <div>
        <h2>Login</h2>
        <Button color="primary" onClick={() => this.loginWithGoogle()}>
          Login With Google
        </Button>
      </div>
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
