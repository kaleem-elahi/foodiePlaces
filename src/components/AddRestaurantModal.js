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
import {
  reduxForm, Form, Field, change,
} from 'redux-form';
import Rating from 'react-rating';
import Dropzone from 'react-dropzone';
import Loader from 'react-loader-spinner';
import yellowStar from '../assets/img/star-yellow.png';
// import RedStar from '../assets/img/star-red.png';
import greyStar from '../assets/img/star-grey.png';
import RenderInput from './InputField';


const required = value => (value || typeof value === 'number' ? undefined : 'Required');

const RatingCompo = (prop) => {
  const {
    input, label, type,
    meta: {
      dispatch, touched, error, warning,
    },
  } = prop;
  return (
    <div>
      {console.log(input, prop)}
      <div>
        <Rating
          {...input.value}
          {...input.name}
          {...input.onChange}
          onClick={(rate) => {
            // alert(rate);
            input.onChange(rate);
            dispatch(change('addRestaurantForm', 'rating', rate));
          }}
          className="rating"
          emptySymbol={<img alt="emptyIcon" src={greyStar} className="icon" />}
          // placeholderSymbol={<img alt="RedStarIcon" src={RedStar} className="icon" />}
          fullSymbol={<img alt="YellowStarIcon" src={yellowStar} className="icon" />}
        />
        {touched && ((error && <span className="error">{error}</span>) || (warning && <span>{warning}</span>))}
      </div>
    </div>
  );
};

const autocompleteField = ({
  input, label, type, meta: { touched, error, warning },
}) => (
  <Fragment>
    <Autocomplete
      id="location"
      style={{ width: '100%' }}
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

class AddRestaurantModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      files: [],
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.modal !== this.props.modal) {
      this.setState({
        files: [],
      });
    }
  }

  onDrop(files) {
    this.setState({
      files,
    });
  }


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
            {
              this.props.loading
                ? (
                  <center>
                    <Loader
                      type="Triangle"
                      color="#00BFFF"
                      height="100"
                      width="100"
                    />
                  </center>
                )
                : (
                  <div className="flexBox">
                    <Form
                      id="addRestaurantForm"
                      onSubmit={this.props.handleSubmit((e) => {
                        this.props.submitAddRestaurantForm(e, this.state.files);
                      })}
                      style={{
                        width: '-webkit-fill-available',
                        margin: 'auto 15px',
                        textAlign: 'left',
                      }}
                    >
                      <FormGroup row>
                        <Col sm={12}>
                          <Label htmlFor="restaurantName" sm={12}>
                    Restaurant Name
                          </Label>
                          <Field id="restaurantName" type="text" name="restaurantName" component={RenderInput} validate={[required]} />
                          {' '}
                        </Col>
                      </FormGroup>
                      <FormGroup row>
                        <Col sm={12}>
                          <Label htmlFor="location" sm={12}>
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
                        <Col sm={12}>
                          <Label htmlFor="rating" sm={12}>
                  Rate it:
                          </Label>
                          <Field
                            name="rating"
                            type="text"
                            component={RatingCompo}
                            inputProps={{
                              onChange: (e) => {
                                // alert(rate);
                                // input.onChange();
                                e.preventDefault();
                                // e.stopPropagation();
                              },
                            }}
                          />
                        </Col>
                      </FormGroup>
                      <div className="dropzone">

                        <aside>
                          {this.state.files.length > 0 ? this.state.files.map(f => (
                            <Fragment>
                              <div
                                key={f.name}
                                className="image-drop-block"
                              >
                                <img style={{ width: '100%' }} src={f.preview} />
                              </div>
                              <div className="deleteIcon">
                                <Button close onClick={() => this.setState({ files: [] })}>×</Button>
                              </div>
                            </Fragment>
                          ))
                            : (
                              <Dropzone
                                multiple
                                onDrop={this.onDrop.bind(this)}
                                accept="image/*"
                              >
                                <p>
                  Try dropping some Pictures here, or click to select Images to
                  upload.
                                </p>
                              </Dropzone>
                            )
                  }
                        </aside>
                      </div>
                    </Form>

                  </div>)
            }

          </ModalBody>
          <ModalFooter>
            {
              this.props.loading
                ? (
                  <Button color="primary">
                  Submitting
                  </Button>
                )
                : (
                  <Button form="addRestaurantForm" type="submit" color="primary">
              Submit
                  </Button>
                )
            }
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
  loading: PropTypes.bool.isRequired,
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
