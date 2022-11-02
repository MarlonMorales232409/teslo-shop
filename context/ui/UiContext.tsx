import { createContext } from 'react'


interface ContextProps {
    isMenuOpen: boolean,
    toggleMenu: () => void
}


export const UiContext = createContext({} as ContextProps)