import { CartState } from "./CartProvider";
import { ICartProduct } from "../../interfaces/cart";

// Always define what actions will be used by my reducer

type CartActionType =
	| {
			type: "[Cart] - Load Cart from cockies | storage";
			payload: ICartProduct[];
	  }
	| { type: "[Cart] - Update Product in Cart"; payload: ICartProduct[] }
	| { type: "[CART] - Change Cart Quantity"; payload: ICartProduct }
	| { type: "[CART] - Remove Product in Cart"; payload: ICartProduct[] }
	

export const cartReducer = (
	state: CartState,
	action: CartActionType
): CartState => {
	switch (action.type) {
		case "[Cart] - Load Cart from cockies | storage":
			console.log("payload aqui ", action.payload)
			return {
				...state,
				cart: [...action.payload],
			};

		case "[Cart] - Update Product in Cart":
			return {
				...state,
				cart: [...action.payload],
			};

		case "[CART] - Change Cart Quantity":
			return {
				...state,
				cart: state.cart.map((p)=> {
					if(p._id !== action.payload._id) return p
					if(p.size !== action.payload.size) return p
					return action.payload
				} )
			}
		case "[CART] - Remove Product in Cart":
			return {
				...state,
				cart: [...action.payload]
			}

		default:
			return state;
	}
};
