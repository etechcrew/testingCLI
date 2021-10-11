import { IonContent, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar, IonModal } from '@ionic/react';
import { arrowBackOutline, cart, locationOutline, star } from 'ionicons/icons';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Badge, Col, Container, Row } from 'reactstrap';
import FeaturedMenu from '../../components/MenuCards/featured';
import MenuList from '../../components/MenuCards/general';
import Addons from '../../components/MenuCards/addons';
import axios from '../../helpers/axiosInterceptor';
import FeaturedSkeletonText from '../../components/skeleton_text/featured_restaurant';
import GeneralSkeletonText from '../../components/skeleton_text/general_restaurant';
import { useSelector, RootStateOrAny } from 'react-redux';

const Home: React.FC = (props: any) => {
    const [hide, setHide] = React.useState(false);

    const [details, setDetails] = useState({} as any);
    const [address, setAddress] = useState("");
    const [dishesList, setDishesList] = useState([]);
    const [featuredDishes, setFeaturedDishes] = useState([]);
    const [load, setLoad] = useState(false);

    //Selectors
    const getDishState = store => store.cart.dishes

    // Get index
    const getAllDishes = (store) => {
        const dishes = getDishState(store) ?? []
        let total = 0, addons_cost = 0
        dishes.map((dish) => {
            dish.addons_dish.map((d) => {
                d.addons.map((a) => addons_cost += parseInt(a.price))
            })
            return total += (dish.count * dish.price) + addons_cost
        })
        return { count: dishes.length, total }
    }

    //Redux Hooks
    const basket_restaurant_id = useSelector((state: RootStateOrAny) => state.cart.restaurant_id);
    const basket = useSelector((state: RootStateOrAny) => getAllDishes(state));
    const currency_symbol = useSelector((state: RootStateOrAny) => state.auth.currency_symbol);

    const hideBar = (e: any) => {
        console.log(e.scrollTop)
    }

    useEffect(() => {
        window.addEventListener('ion-content', hideBar);
        axios.get(`/restaurant/${props.match.params.id}`)
            .then(res => {
                const data = res.data
                setDetails(data);
                setDishesList(data.dishes);
                let FeaturedDishes = data.dishes.filter(function (e) {
                    return e.featured === 1;
                });
                setFeaturedDishes(FeaturedDishes);
                setLoad(true);

                const address = data.addresses[0]
                const add = address.street + ', ' + address.city + ', ' + address.postal_code
                setAddress(add)
            })
            .catch(err => {
                console.log(err)
                setLoad(true)
            })
    }, [props.match.params.id]);

    return (
        <IonPage>
            {(hide || (load && dishesList.length <= 2)) && (
                <IonHeader className="bg-white ion-no-border border-bottom">
                    <IonToolbar color="white">
                        <IonTitle className="font-weight-bold">
                            <IonIcon icon={arrowBackOutline} className="mr-2 align-text-top text-default"
                                onClick={() => props.history.goBack()}
                            />
                            {details.name}
                        </IonTitle>
                    </IonToolbar>
                </IonHeader>
            )}
            <IonContent fullscreen
                scrollEvents={true} onIonScrollStart={(e) => { setHide(true) }} >

                {load && (
                    <div id="shop-header" className="shop-header" style={{ background: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.85)),url(${details.image})` }}>
                        <Row className="shop-content mx-0">
                            <Row className="mx-0 p-3 w-100">
                                {(details.featured === 1) && (<Badge color="danger" pill className="mx-1">Featured</Badge>)}
                                {(details.is_veg === 1) && (<Badge color="success" pill>Pure Veg</Badge>)}
                                <h3 className="my-0 font-weight-light text-white text-left w-100">{details.name}</h3>
                                <h6 className="m-0 shop-name">
                                    <IonIcon icon={locationOutline} className="text-white align-middle" />
                                    <small className="mx-1 text-white">{address}</small>
                                </h6>
                            </Row>
                            <Row className="mx-0 pt-3 w-100 border-top">
                                <Col className="border-right px-0">
                                    <h6 className="d-block w-100 m-0">
                                        <IonIcon icon={star} className="text-white" />
                                        <span className="mx-1 text-white">{details.rating}</span>
                                    </h6>
                                    <p className="d-block w-100 m-0">
                                        <small className="text-light">User Ratings</small>
                                    </p>
                                </Col>
                                <Col className="border-right px-0">
                                    <h6 className="d-block w-100 m-0">
                                        {/* <IonIcon icon={cash} className="text-white" /> */}
                                        <span className="mx-1 text-white">{details.for_two}</span>
                                    </h6>
                                    <p className="d-block w-100 m-0">
                                        <small className="text-light">For Two People</small>
                                    </p>
                                </Col>
                                <Col className="px-0">
                                    <h6 className="d-block w-100 m-0">
                                        {/* <IonIcon icon={time} className="text-white" /> */}
                                        <span className="mx-1 text-white">{details.delivery_time} Mins</span>
                                    </h6>
                                    <p className="d-block w-100 m-0">
                                        <small className="text-light">On-time Delivery</small>
                                    </p>
                                </Col>
                            </Row>
                        </Row>
                    </div>
                )}
                <Container fluid={true} className="my-3 p-0">
                    <h5 className="font-weight-bold px-3">Featured Dishes</h5>
                    <Row className="my-2">
                        <Col lg="5">
                            {load ? (
                                (featuredDishes.length > 0) ? <FeaturedMenu menuList={featuredDishes} restaurant_id={details.id} />
                                    : (
                                        <div className="bg-white shadow-sm py-4 m-3 text-center">
                                            No featured dishes available
                                        </div>
                                    )
                            ) : <FeaturedSkeletonText />}
                        </Col>
                    </Row>
                </Container>

                <Container fluid={true} className="mt-3 pb-5">
                    <h5 className="font-weight-bold">Recommended for you</h5>
                    <Row>
                        <Col lg="5">
                            {load ? (
                                (dishesList.length > 0) ? <MenuList menuList={dishesList} restaurant_id={details.id} />
                                    : (
                                        <div className="bg-white shadow-sm py-4 my-2 w-100 text-center">
                                            No Dishes available
                                        </div>
                                    )
                            ) : [...Array(4)].map((e, i) => (<GeneralSkeletonText key={i} />))}
                        </Col>
                    </Row>
                </Container>

                {
                    (load && details.id === basket_restaurant_id && basket.count > 0) && (
                        <Link className="row fixed-bottom w-100 bg-primary p-3 m-0 text-white" to="/cart">
                            <Col xs="8" className="p-0">
                                {basket.count} Item |  {currency_symbol + basket.total}
                            </Col>
                            <Col className="text-right p-0">
                                Checkout
                                <IonIcon icon={cart} className="ml-2 align-text-top text-white" />
                            </Col>
                        </Link>
                    )
                }

                <Addons />

            </IonContent>


        </IonPage >
    );
};

export default Home;
