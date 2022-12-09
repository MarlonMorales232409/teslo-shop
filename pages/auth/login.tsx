import { AuthLayout } from '../../components/layout'
import { useContext, useState } from 'react';
import NextLink from 'next/link'
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../context/auth';
import { validation } from '../../utils';

import { ErrorOutline } from '@mui/icons-material';
import { Box, Button, Chip, Grid, Link, TextField, Typography } from '@mui/material'

type FormData = {
    email: string,
    password: string,
  };

const login = () => {

    const { loginUser } = useContext(AuthContext)

    const route = useRouter()

    const [showError, setShowError] = useState(false)
    
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

    const onLoginUser = async (data: FormData)=> {

        try {

            const { email, password } = data

            const isValidUser = await loginUser(email, password)

            if( !isValidUser ) {
                setShowError(true)
                setTimeout(() => setShowError(false), 3000);
                return
            }

            return route.replace('/')

        } catch (error) {
            
            setShowError(true)
            setTimeout(() => setShowError(false), 3000);

        }
    }

    return (
        <AuthLayout title="Login">
            <form onSubmit={ handleSubmit(onLoginUser) } noValidate>
            <Box sx={{ width: 350, padding: "10px 20px" }} >
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant='h1' component={"h1"}>Login</Typography>
                        <Chip 
                            label="We don't recognize that user/password"
                            color="error"
                            icon={ <ErrorOutline /> }
                            className="fadeIn"
                            sx={{ m: "8px 0", display: showError ? "flex" : "none" }}    
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField 
                            label="E-mail" 
                            type="email" 
                            fullWidth 
                            {...register('email',{
                                required: 'This field is required',
                                validate: validation.isEmail,
                            })}
                            error={ !!errors.email }
                            helperText={ errors.email?.message }
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField 
                            label="Password" 
                            type="password" 
                            fullWidth 
                            {...register('password',{
                                required: 'This field is required',
                                minLength: {value: 6, message: 'Must to have a least 6 characters'}
                            })}
                            error={ !!errors.password }
                            helperText={ errors.password?.message }
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button type='submit' className="circular-btn" color="secondary" size='large' fullWidth>Login</Button>
                    </Grid>
                    <Grid item xs={12}>
                        <NextLink href={"/auth/register"} passHref>
                            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                                <span>{"Don't have an account?"}</span>
                                <Link underline='always' color="secondary" sx={{ cursor: "pointer" }}>
                                    <Typography >
                                        <span>Register</span>
                                    </Typography>
                                </Link>
                            </Box>
                        </NextLink>
                    </Grid>
                </Grid>
            </Box>
            </form>
        </AuthLayout>
    )
}

export default login