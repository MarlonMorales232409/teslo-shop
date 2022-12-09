import { FC, useEffect, useReducer } from 'react'
import { AuthContext } from '.'
import { authReducer } from './authReducer';
import Cookie from 'js-cookie'
import { tesloApi } from '../../api';
import { IUser } from '../../interfaces';
import axios from 'axios';


export interface AuthState {
    isUserLogged: boolean,
    user?: IUser
}

const AUTH_INITIAL_STATE: AuthState = {
   isUserLogged: false,
   user: undefined
}



interface Props {
    children: React.ReactNode,
}

export const AuthProvider: FC<Props> = ({ children }) => {

    const [ state, dispatch ] = useReducer( authReducer, AUTH_INITIAL_STATE )

    // ? Use Effect to persist the user section

    useEffect(()=> {
        checkToken()
    }, [])

    // Methods

    const checkToken = async () => {

        try {
            
            const { data } = await tesloApi.get('/user/validate-token')

            const { token, user} = data

            Cookie.set('token', token)

            dispatch({ type: '[Auth] - login user', payload: user })


        } catch (error) {

            Cookie.remove('token')
        }

    }

    const loginUser = async (email: string, password: string): Promise<boolean> => {

        try {

            const { data } = await tesloApi.post('/user/login', { email, password })

            const { token, user } = data

            Cookie.set('token', token)
            
            dispatch({ type: '[Auth] - login user', payload: user })

            return true

        } catch (error) {

            return false

        }
    }

  

    const registerUser = async (name: string, email: string, password: string): Promise<{hasError: boolean, message?: string}> => {

        try {

            const { data } = await tesloApi.post('/user/register', { name, email, password })

            const { token, user } = data

            Cookie.set('token', token)
            
            dispatch({ type: '[Auth] - login user', payload: user })

            Cookie.set('token', token)

            return {
                hasError: false
            }
            
        } catch (error) {
            if(axios.isAxiosError(error)){
                return {
                    hasError: true,
                    message: error.response?.data.message
                }
            }

            return {
                hasError: true,
                message: "Could not create the user. Try it again"
            }
        }
    }


    return (
        <AuthContext.Provider value={{
            ...state,
            // methods
            loginUser,
            registerUser,
        }}>
            {children}
        </AuthContext.Provider>
    )
}