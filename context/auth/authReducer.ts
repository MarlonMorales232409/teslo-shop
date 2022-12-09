
import { IUser } from "../../interfaces";
import { AuthState } from "./AuthProvider";

// Always define what actions will be used by my reducer

type AuthActionType =
	| { type: "[Auth] - login user"; payload: IUser; }
	| { type: "[Auth] - logout user"; }
	
	

export const authReducer = ( state: AuthState, action: AuthActionType ): AuthState => {

	switch (action.type) {

		case "[Auth] - login user":
			return {
				...state,
				isUserLogged: true,
				user: action.payload
			}

		case "[Auth] - logout user":
			return {
				...state,
				isUserLogged: false,
				user: undefined
			}

		default:
			return state;
	}
};
