import { CartState } from "./CartProvider";
import { ICartProduct } from "../../interfaces/cart";

// Always define what actions will be used by my reducer

type CartActionType =
	| {
			type: "[Cart] - Load Cart from cockies | storage";
			payload: ICartProduct[];
	  }
	| { type: "[Cart] - Add Product"; payload: ICartProduct };

export const cartReducer = (
	state: CartState,
	action: CartActionType
): CartState => {
	switch (action.type) {
		case "[Cart] - Load Cart from cockies | storage":
			return {
				...state,
			};

		default:
			return state;
	}
};
