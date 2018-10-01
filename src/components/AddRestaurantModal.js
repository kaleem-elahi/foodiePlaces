import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import Autocomplete from 'react-google-autocomplete';
import {
  Col,
  FormGroup,
  Label,
  // Input,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from 'reactstrap';
import { reduxForm, Form, Field } from 'redux-form';
import Rating from 'react-rating';
import yellowStar from '../assets/img/star-yellow.png';
// import RedStar from '../assets/img/star-red.png';
import greyStar from '../assets/img/star-grey.png';
import RenderInput from './InputField';

const required = value => (value || typeof value === 'number' ? undefined : 'Required');

const RatingCompo = ({
  input, label, type,
  meta: { touched, error, warning },
}) => (
  <div>
    {console.log(input)}
    <div>
      <Rating
        value={input.value}
        name={input.name}
        // name={input.name}
        onClick={input.onClick}
        // {...input}
        className="rating"
        emptySymbol={<img alt="emptyIcon" src={greyStar} className="icon" />}
        // placeholderSymbol={<img alt="RedStarIcon" src={RedStar} className="icon" />}
        fullSymbol={<img alt="YellowStarIcon" src={yellowStar} className="icon" />}
      />
      {touched && ((error && <span className="error">{error}</span>) || (warning && <span>{warning}</span>))}
    </div>
  </div>
);

const autocompleteField = ({
  input, label, type, meta: { touched, error, warning },
}) => (
  <Fragment>
    <Autocomplete
      id="location"
      style={{ width: '100%' }}
      onPlaceSelected={(place) => {
        console.log(place);
      }}
      {...input}
      placeholder={label}
      onKeyPress={(e) => {
        if (e.key === 'Enter') e.preventDefault();
      }}
      type={type}
      types={[
        'address',
      ]}
    />
    {touched && ((error && <span className="error">{error}</span>) || (warning && <span>{warning}</span>))}
  </Fragment>
);

class AddRestaurantModal extends Component {//eslint-disable-line

  render() {
    const { className } = this.props;
    return (
      <Fragment>
        <Button color="danger" onClick={this.props.toggle}>
          Add a new Foodie Place
        </Button>
        <Modal isOpen={this.props.modal} toggle={this.props.toggle} className={className}>
          <ModalHeader toggle={this.props.toggle}>Add Restaurant</ModalHeader>
          <ModalBody>
            <Form
              id="addRestaurantForm"
              onSubmit={this.props.handleSubmit(this.props.submitAddRestaurantForm)}
            >
              <FormGroup row>
                <Col sm={8}>
                  <Label htmlFor="restaurantName" sm={7}>
                    Restaurant Name
                  </Label>
                  <Field id="restaurantName" type="text" name="restaurantName" component={RenderInput} validate={[required]} />
                  {' '}
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col sm={8}>
                  <Label htmlFor="location" sm={7}>
                  Location
                  </Label>
                  <Field
                    name="location"
                    type="text"
                    component={autocompleteField}
                    label="start typing.."
                    validate={[required]}
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col sm={10}>
                  <Label htmlFor="rating" sm={7}>
                  Rate it:
                  </Label>
                  <Field
                    name="rating"
                    type="text"
                    component={RatingCompo}
                  />
                </Col>
              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button form="addRestaurantForm" type="submit" color="primary">
              Submit
            </Button>
            {' '}
            <Button color="secondary" onClick={this.props.toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </Fragment>
    );
  }
}

AddRestaurantModal.propTypes = {
  // boolean to control the state of the popover
  className: PropTypes.string,
  handleSubmit: PropTypes.func,
  modal: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
  submitAddRestaurantForm: PropTypes.func,
};
AddRestaurantModal.defaultProps = {
  className: '',
  submitAddRestaurantForm: () => ({}),
  handleSubmit: () => ({}),
};

const validate = (values) => {
  const errors = {};
  console.log(values);
  return errors;
};

export default reduxForm({ form: 'addRestaurantForm', validate })(AddRestaurantModal);
