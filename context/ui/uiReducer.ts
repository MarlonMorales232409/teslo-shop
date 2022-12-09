import { UiState } from "./UiProvider";

// Always define what actions will be used by my reducer
type UiActionType = { type: "[UI] - ToggleSideMenu" };

export const uiReducer = ( state: UiState, action: UiActionType ): UiState => {

	switch (action.type) {

		case "[UI] - ToggleSideMenu":
			return {
				...state,
				isMenuOpen: !state.isMenuOpen,
			};

		default:
			return state;
	}
};
