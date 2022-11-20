import { FC, useEffect, useReducer } from 'react'
import { CartContext } from './'
import { cartReducer } from './cartReducer';
import { ICartProduct } from '../../interfaces';
import Cookie from 'js-cookie'

export interface CartState {
    cart: ICartProduct[],
    numberOfItem: number;
    subTotal: number;
    tax: number;
    total: number;
}

const CART_INITIAL_STATE: CartState = {
    cart: [],
    numberOfItem:0,
    subTotal:0,
    tax:0,
    total:0,
}



interface Props {
    children: React.ReactNode,
}
export const CartProvider: FC<Props> = ({ children }) => {

    const [state, dispatch] = useReducer(cartReducer, CART_INITIAL_STATE)

    useEffect(() => {
        try {
            const cookieProducts = Cookie.get('cart') ? JSON.parse( Cookie.get('cart')! ): []
            dispatch({ type: "[Cart] - Load Cart from cockies | storage", payload: cookieProducts });
        } catch (error) {
            dispatch({ type: "[Cart] - Load Cart from cockies | storage", payload: [] });
        }
    }, []);

    
    useEffect(() => {
      Cookie.set('cart', JSON.stringify( state.cart ), { sameSite: 'strict' });
    }, [state.cart]);


    useEffect(() => {
        const numberOfItem = state.cart.reduce((prev, current)=> current.quantity + prev,0)
        const subTotal = state.cart.reduce((prev, current)=> (current.price * current.quantity) + prev,0)
        const taxRate = Number(process.env.NEXT_PUBLIC_TAX_RATE)

        const orderSumary = {
            numberOfItem,
            subTotal,
            tax: subTotal * taxRate,
            total: subTotal * (taxRate + 1)
        }

        dispatch({type: "[CART] - Update Order Summary", payload: orderSumary})
    }, [state.cart])




    // Methods
    
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

    const updateCartQuantity = (product: ICartProduct)=> {
        dispatch({type:"[CART] - Change Cart Quantity", payload:product })
    }

    const removeCartProduct = (product: ICartProduct)=> {
    const productRemoved = state.cart.filter(p => !(p._id === product._id && p.size === product.size))

    console.log(productRemoved)

        dispatch({type: "[CART] - Remove Product in Cart", payload:productRemoved})
    }

    return (
        <CartContext.Provider value={{
            ...state,
            // methods
            addProductToCart,
            updateCartQuantity,
            removeCartProduct,
        }}>
            {children}
        </CartContext.Provider>
    )
}