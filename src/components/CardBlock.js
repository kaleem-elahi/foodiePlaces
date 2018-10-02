import React from 'react';
import PropTypes from 'prop-types';
import Rating from 'react-rating';
import {
  Card, CardTitle, CardText, CardImgOverlay,
} from 'reactstrap';
import yellowStar from '../assets/img/star-yellow.png';
import RedStar from '../assets/img/star-red.png';
import greyStar from '../assets/img/star-grey.png';

const CardBlock = props => (
  <div>
    <Card inverse>
      <div
        className="card-dp"
        style={{
          background: `url(${props.restaurant.image || 'https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97270&w=318&h=270&bg=333333&txtclr=666666'})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
        alt="Card image cap"
      >

        {props.restaurant.isFavourite ? (
          props.fav
        ) : (
          props.unFav
        )}
      </div>
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
  fav: PropTypes.element.isRequired,
  unFav: PropTypes.element.isRequired,
};
CardBlock.defaultProps = {
  restaurant: {},
};

export default CardBlock;
