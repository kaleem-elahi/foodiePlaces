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
import RedStar from '../assets/img/star-red.png';
import greyStar from '../assets/img/star-grey.png';
import RenderInput from './InputField';

const required = value => (value || typeof value === 'number' ? undefined : 'Required');

// const renderField = ({
//   input, label, type, meta: { touched, error, warning },
// }) => (
//   <div>
//     <div>
//       <input {...input} placeholder={label} type={type} />
//       {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
//     </div>
//   </div>
// );

const autocompleteField = ({
  input, label, type, meta: { touched, error, warning },
}) => (
  <Fragment>
    <Autocomplete
      id="location"
      style={{ width: '40%' }}
      onPlaceSelected={(place) => {
        console.log(place);
      }}
      {...input}
      placeholder={label}
      type={type}
      types={[
      // "(regions)"
        'address',
      // "(cities)",
      //   "geocode"
      ]}
    />
    {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
  </Fragment>
);

class AddRestaurantModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal,
    });
  }

  propssubmitAddRestaurantForm(a, b, c) {
    //eslint-disable-line
    console.log(a, b, c, this);
  }

  render() {
    const { className } = this.props;
    return (
      <Fragment>
        <Button color="danger" onClick={this.toggle}>
          Add a new Foodie Place
        </Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={className}>
          <ModalHeader toggle={this.toggle}>Add Restaurant</ModalHeader>
          <ModalBody>
            <Form
              id="addRestaurantForm"
              onSubmit={this.props.handleSubmit(this.props.submitAddRestaurantForm)}
            >
              <FormGroup row>
                <Col sm={10}>
                  <Label for="restaurantName" sm={7}>
                    Restaurant Name
                  </Label>
                  <Field name="restaurantName" component={RenderInput} validate={[required]} />
                  {' '}
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="location" sm={2}>
                  Location
                </Label>
                <Col sm={10}>
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
                <Label for="location" sm={2}>
                  Rate it:
                </Label>
                <Col sm={10}>
                  <Rating
                    placeholderRating={3.5}
                    emptySymbol={<img alt="emptyIcon" src={greyStar} className="icon" />}
                    placeholderSymbol={<img alt="RedStarIcon" src={RedStar} className="icon" />}
                    fullSymbol={<img alt="YellowStarIcon" src={yellowStar} className="icon" />}
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
            <Button color="secondary" onClick={this.toggle}>
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
