import React from "react";
import Ripples from 'react-ripples';
// reactstrap components
import { Button, Row } from "reactstrap";

import actions from '../../actions/cart'
import { useDispatch, useSelector, RootStateOrAny } from "react-redux";
import { IonIcon } from "@ionic/react";
import { trash, trashBin, trashOutline, trashSharp } from "ionicons/icons";

interface PackCounterProps {
    dish: any,
    restaurant_id: number,
    hide_addon?: boolean,
}

const PackBoxCounter: React.FC<PackCounterProps> = ({ dish, restaurant_id, hide_addon = false }) => {

    const { id: dish_id, price, name, is_veg, addons_dish } = dish
    //Selectors
    const getDishState = store => store.cart.dishes ?? []

    const findDishById = (store, id) => {
        // const index = getDishState(store).findIndex((dish: any) => dish.id === id)
        // const index = getDishState(store).reduce((result, dish) => {
        //     if (dish.id == id)
        //         result.push(dish.id);
        //     return result
        // }, [])
        // let index: any = []
        // getDishState(store).map((dish: any) => {
        //     if (dish.id == id)
        //         index.push(dish.id);
        // })
        const index = getDishState(store).map((dish, index) => dish.id === id ? index : '').filter(String);
        const findIndex = getDishState(store)[index[0]]
        return  (index.length > 0 && findIndex) ? findIndex.count * index.length : 0
    }

    //Redux Hooks
    const count = useSelector((state: RootStateOrAny) => findDishById(state, dish_id));
    const dispatch = useDispatch();

    const increment = () => {
        if (hide_addon == false && addons_dish.length > 0) {
            dispatch(actions.addons_show({ dish_id, name, is_veg, price, restaurant_id, addons_dish }))
        } else {
            const amount = isNaN(price) ? parseFloat(price.substr(1)) : price
            dispatch(actions.increment({ dish_id, name, is_veg, amount, restaurant_id }))
        }
    }

    const decrement = () => {
        if (count > 0)
            dispatch(actions.decrement({ dish_id, restaurant_id }))
    }

    return (
        <>
            {/* <Row className="pack-box m-0">
                <Ripples className="col-4 p-0">
                    <Button className="pack-btn shadow-none m-0 px-0" onClick={decrement}></Button>
                </Ripples>
                <small className="pack-count col-4 p-0">{count}</small>
                {(hide_addon == false || (addons_dish && addons_dish.length < 1)) && (
                    <Ripples className="col-4 p-0">
                        <Button className="pack-btn-plus alt shadow-none m-0 px-2" onClick={increment}></Button>
                    </Ripples>
                )}
            </Row>
            {(hide_addon == false && addons_dish && addons_dish.length > 0) && (
                <Row className="m-0 mt-1">
                    <small className="w-100 p-0 text-warning text-center">Addons</small>
                </Row>
            )} */}

            {(hide_addon == false || (addons_dish && addons_dish.length < 1)) ? (
                <>
                    <Row className="pack-box m-0">
                        <Ripples className="col-4 p-0">
                            <Button className="pack-btn shadow-none m-0 px-0" onClick={decrement}></Button>
                        </Ripples>
                        <small className="pack-count col-4 p-0">{count}</small>

                        <Ripples className="col-4 p-0">
                            <Button className="pack-btn-plus alt shadow-none m-0 px-2" onClick={increment}></Button>
                        </Ripples>
                    </Row>
                    {(hide_addon == false && addons_dish && addons_dish.length > 0) && (
                        <Row className="m-0 mt-1">
                            <small className="w-100 p-0 text-warning text-center">Addons</small>
                        </Row>
                    )}
                </>
            ) : (
                    <h4 onClick={decrement}><IonIcon icon={trashOutline} className="text-muted mr-1 align-text-top" /></h4>
                )}
        </>
    )
}

export default PackBoxCounter;