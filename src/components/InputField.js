import React, { PureComponent } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { Input, FormGroup, FormFeedback } from 'reactstrap';

class RenderInput extends PureComponent {
  render() {
    const {
      input,
      placeholder,
      type,
      id,
      meta: { touched, error },
    } = this.props;

    const classes = classNames({
      success: touched && !error,
      danger: touched && error,
    });
    console.log(this.props);
    return (
      <FormGroup color={classes}>
        <Input {...input} id={id} type={type} placeholder={placeholder} />
        {touched && error && <FormFeedback>{error}</FormFeedback>}
      </FormGroup>
    );
  }
}

RenderInput.propTypes = {
  input: PropTypes.object, // eslint-disable-line
  placeholder: PropTypes.string,
  type: PropTypes.string.isRequired,
  meta: PropTypes.shape({
    // eslint-disable-line
    touched: PropTypes.bool,
    error: PropTypes.any,
  }),
};

RenderInput.defaultProps = {
  input: {},
  placeholder: '',
  //   meta: {
  //     touched: false,
  //     error: '',
  //   },
};

export default RenderInput;
