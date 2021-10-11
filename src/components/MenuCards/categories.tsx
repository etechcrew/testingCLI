import { IonSlide, IonSlides } from '@ionic/react';
import React from "react";

const slideOpts = {
    slidesPerView: 'auto',
    pagination: '',
    speed: 400,
    zoom: false
};

const Restaurants: React.FC = () => {

    return (

        <IonSlides pager={false} options={slideOpts}>
            <IonSlide className="d-block mr-3" style={{ width: '6rem' }}>
                <img src={require('../../assets/img/home/categories/1.jpg')} alt='burger' />
                <h6 className="my-0">Pizza </h6>
            </IonSlide>
            <IonSlide className="d-block mr-3" style={{ width: '6rem' }}>
                <img src={require('../../assets/img/home/categories/2.jpg')} alt='burger' />
                <h6 className="my-0">Burger </h6>
            </IonSlide>
            <IonSlide className="d-block mr-3" style={{ width: '6rem' }}>
                <img src={require('../../assets/img/home/categories/3.jpg')} alt='burger' />
                <h6 className="my-0">Barbeque </h6>
            </IonSlide>
            <IonSlide className="d-block mr-3" style={{ width: '6rem' }}>
                <img src={require('../../assets/img/home/categories/4.jpg')} alt='burger' />
                <h6 className="my-0">Hot Dog </h6>
            </IonSlide>
            <IonSlide className="d-block mr-3" style={{ width: '6rem' }}>
                <img src={require('../../assets/img/home/categories/1.jpg')} alt='burger' />
                <h6 className="my-0">Pizza </h6>
            </IonSlide>
        </IonSlides>
    )
};

export default Restaurants;