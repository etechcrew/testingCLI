import { IonIcon, IonSlide, IonSlides } from '@ionic/react';
import { star, timeOutline } from 'ionicons/icons';
import React from "react";
// reactstrap components
import { Card, CardBody, CardImg } from "reactstrap";
import Ripples from 'react-ripples';

const slideOpts = {
  slidesPerView: 'auto',
  speed: 400,
  zoom: false
};

type ListProps = {
  history: any,
  restaurants: any
}

const FeaturedRestaurant: React.FC<ListProps> = ({ history, restaurants }) => {

  const FeaturedElements = restaurants.map((restaurant: any) => {
    const { name, image, rating, delivery_time, id } = restaurant;

    return (
      <IonSlide className="ml-3" style={{ width: '12rem' }} key={id}>
        <Ripples className="d-block" onClick={() => {
          setTimeout(function () {
            history.push(`/shop/${id}`);
          }, 275)
        }}>
          <Card className="shadow-sm p-0 m-0">

            <span className="featured-badge"></span>
            <CardImg className="rounded-lg" src={image} alt="" />
            <CardBody className="p-2 h-restaurant text-left">

              <h6 className="my-0 font-weight-bold shop-name">{name}</h6>

              <div className="mt-1 d-flex align-items-center text-muted">
                <small><IonIcon icon={star} className="text-yellow" />
                  <b className="mx-1">{rating}</b>
                </small>
                <small className="ml-2"><IonIcon icon={timeOutline} className="align-middle" /> {delivery_time} mins</small>
              </div>

            </CardBody>

          </Card>
          </Ripples>
      </IonSlide>
    );
  });

  return (
    <IonSlides pager={false} options={slideOpts}>
      {FeaturedElements}
    </IonSlides>
  )
}

export default FeaturedRestaurant;