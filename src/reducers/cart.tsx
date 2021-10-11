import { cartConstants } from '../helpers/constants';

const INITIAL_STATE = { restaurant_id: '', dishes: [], coupon: {} };

export default function cart(state = INITIAL_STATE, action) {
    switch (action.type) {

        case cartConstants.ITEM_INCREMENT: {
            let dishes: any = state.dishes ?? [];
            const index = dishes.findIndex((dish: any) => dish.id === action.payload.dish_id);

            if (state.restaurant_id !== action.payload.restaurant_id)
                dishes = []

            if (index === -1 || (action.payload.addons && action.payload.addons.length > 0)) {
                dishes.push({
                    count: 1,
                    addons_dish: action.payload.addons ?? [],
                    price: action.payload.amount,
                    is_veg: action.payload.is_veg,
                    name: action.payload.name,
                    id: action.payload.dish_id
                });
            } else
                dishes[index].count++;

            return {
                ...state,
                restaurant_id: action.payload.restaurant_id,
                dishes
            };
        }

        case cartConstants.ITEM_DECREMENT: {
            let dishes: any = state.dishes;
            const index = dishes.findIndex((dish: any) => dish.id === action.payload.dish_id);

            if (index !== -1) {
                if (dishes[index].count === 1)
                    dishes.splice(index, 1);
                else
                    dishes[index].count--;
            }
            return {
                ...state,
                restaurant_id: action.payload.restaurant_id,
                dishes
            };
        }

        case cartConstants.ADDONS_SHOW: {
            return {
                ...state,
                addons: action.payload
            };
        }

        case cartConstants.ADDONS_HIDE: {
            return {
                ...state,
                addons: []
            };
        }

        case cartConstants.COUPON_ADD: {
            return {
                ...state,
                coupon: action.payload
            };
        }

        case cartConstants.COUPON_REMOVE: {
            return {
                ...state,
                coupon: {}
            };
        }

        case cartConstants.GRAND_TOTAL: {
            return {
                ...state,
                total: action.payload
            };
        }

        case cartConstants.ORDER_SUCCESS: {
            return { restaurant_id: '', dishes: [], coupon: {} };
        }
        default:
            return state
    }
}
