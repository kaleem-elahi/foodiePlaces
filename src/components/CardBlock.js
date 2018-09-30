import React from 'react';
import PropTypes from 'prop-types';
import Rating from 'react-rating';
import {
  Card, CardTitle, CardText, CardImg, CardImgOverlay,
} from 'reactstrap';
import yellowStar from '../assets/img/star-yellow.png';
import RedStar from '../assets/img/star-red.png';
import greyStar from '../assets/img/star-grey.png';

const CardBlock = props => (
  <div>
    <Card inverse>
      <CardImg width="100%" src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97270&w=318&h=270&bg=333333&txtclr=666666" alt="Card image cap" />
      <CardImgOverlay>
        <CardTitle>
          {props.restaurant.restaurantName}
        </CardTitle>
        <CardText>{props.restaurant.location}</CardText>
        <Rating
          id="rating"
          readonly
          initialRating={props.restaurant.rating}
          placeholderRating={0}
          emptySymbol={<img alt="emptyIcon" src={greyStar} className="icon" />}
          placeholderSymbol={<img alt="RedStarIcon" src={RedStar} className="icon" />}
          fullSymbol={<img alt="YellowStarIcon" src={yellowStar} className="icon" />}
        />

        <CardText>
          <small className="text-muted">{props.restaurant.date}</small>
        </CardText>
      </CardImgOverlay>
    </Card>
    <br />
  </div>
);

CardBlock.propTypes = {
  // boolean to control the state of the popover
  restaurant: PropTypes.objectOf(PropTypes.any),
};
CardBlock.defaultProps = {
  restaurant: {},
};

export default CardBlock;
