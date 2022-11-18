import { FC, useEffect, useReducer } from 'react'
import { CartContext } from './'
import { cartReducer } from './cartReducer';
import { ICartProduct } from '../../interfaces';
import Cookie from 'js-cookie'

export interface CartState {
    cart: ICartProduct[],
}

const CART_INITIAL_STATE: CartState = {
    cart: [],
}

interface Props {
    children: React.ReactNode,
}
export const CartProvider: FC<Props> = ({ children }) => {

    const [state, dispatch] = useReducer(cartReducer, CART_INITIAL_STATE)

    useEffect(() => {
        try {
            console.info(state.cart)
            const productInCookie = Cookie.get('cart') ? JSON.parse( Cookie.get('cart')! ) : []
            dispatch({ type: '[Cart] - Load Cart from cockies | storage', payload: productInCookie })
            console.info(state.cart)
        } catch (error) {
            dispatch({ type: '[Cart] - Load Cart from cockies | storage', payload: [] })
        }
    }, [])

    useEffect(() => {
        Cookie.set('cart', JSON.stringify(state.cart), {sameSite: 'None', secure: true})
    }, [state.cart])

    const addProductToCart = (product: ICartProduct) => {


        const productInCart = state.cart.some(p => p._id === product._id)
        if (!productInCart) return dispatch({ type: '[Cart] - Update Product in Cart', payload: [...state.cart, product] })

        const productInCartButWithDiferentSize = state.cart.some(p => p._id === product._id && p.size === product.size)
        if (!productInCartButWithDiferentSize) return dispatch({ type: '[Cart] - Update Product in Cart', payload: [...state.cart, product] })


        const updatedProduct = state.cart.map(p => {
            if (p._id !== product._id) return p
            if (p.size !== product.size) return p

            p.quantity += product.quantity

            return p
        })

        dispatch({ type: '[Cart] - Update Product in Cart', payload: updatedProduct })

    }

    return (
        <CartContext.Provider value={{
            ...state,
            addProductToCart,
        }}>
            {children}
        </CartContext.Provider>
    )
}