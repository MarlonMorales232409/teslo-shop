import { FC, useReducer } from 'react'
import { UiContext } from './'
import { uiReducer } from './uiReducer';


export interface UiState {
    isMenuOpen: boolean,
}

const UI_INITIAL_STATE: UiState = {
    isMenuOpen: false,
}

interface Props {
    children: React.ReactNode,
}
export const UiProvider: FC<Props> = ({ children }) => {

    const [state, dispatch] = useReducer(uiReducer, UI_INITIAL_STATE)

    const toggleMenu = () => {
        dispatch({
            type: '[UI] - ToggleSideMenu'
        })
    }

    return (
        <UiContext.Provider value={{
            ...state,
            toggleMenu
        }}>
            {children}
        </UiContext.Provider>
    )
}