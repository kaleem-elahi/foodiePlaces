import React, { Component } from 'react';
import PropType from 'prop-types';
import { auth } from '../config/Firebase-config';
import Login from '../components/Login';

export default function authentication(WrappedComponent) {
  class authentication extends Component {
    constructor(props) {
      super(props);
      this.state = {
        authUser: null,
        isLoading: false,
      };
    }

    componentDidMount() {
      auth.onAuthStateChanged((authUser) => {
        if (!authUser) {
          this.setState(() => ({ authUser: null, isLoading: true }));
        } else {
          this.setState(() => ({ authUser, isLoading: true }));
        }
      });
    }

    render() {
      if (this.state.isLoading) {
        if (this.state.authUser) {
          if (this.props.match.path === '/') {
            this.props.history.push('/home');
            return <div />;
          }
          return <WrappedComponent authUser={this.state.authUser} />;
        }
        return <Login />;
      }
      return 'Just a min please!';
    }
  }

  authentication.propTypes = {
    match: PropType.objectOf(PropType.any).isRequired,
    history: PropType.objectOf(PropType.any).isRequired,
  };

  // authentication.defaultProps = {
  //   match: ,
  // };
  return authentication;
}
