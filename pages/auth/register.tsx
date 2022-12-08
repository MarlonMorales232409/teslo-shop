import { ErrorOutline } from '@mui/icons-material';
import { Box, Button, Chip, Grid, Link, TextField, Typography } from '@mui/material'
import NextLink from 'next/link'
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { tesloApi } from '../../api';
import { AuthLayout } from '../../components/layout'
import { validation } from '../../utils';

type FormData = {
    name: string,
    email: string,
    password: string,
  };

const register = () => {

    const [showError, setShowError] = useState(false)

    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

    const onRegisterForm = async (data: FormData) => {
        try {        

            const { name, email, password } = data

            const user = await tesloApi.post('/user/register', { name, email, password })

            console.log(user)

        } catch (error) {
            setShowError(true)
            console.log('Something went wrong')
            setTimeout(() => setShowError(false), 3000);

        }
    }


    return (
        <AuthLayout title="Login">
            <form onSubmit={ handleSubmit(onRegisterForm) }>

            
            <Box sx={{ width: 350, padding: "10px 20px" }} >
                <Grid container spacing={2}>
                    
                    <Grid item xs={12}>
                        <Typography variant='h1' component={"h1"}>Register</Typography>
                        <Chip 
                            label="Something went wrong"
                            color="error"
                            icon={ <ErrorOutline /> }
                            className="fadeIn"
                            sx={{ m: "8px 0", display: showError ? "flex" : "none" }}    
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField 
                            label="Name" 
                            type="text" 
                            fullWidth
                            {...register('name',{
                                required: 'This field is required',
                                minLength: {value: 2, message: 'Must to have a least 2 characters'}
                            })}
                            error={ !!errors.name }
                            helperText={ errors.name?.message } 
                        
                        />
                    </Grid>
                    
                    <Grid item xs={12}>
                        <TextField 
                            label="E-Mail" 
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
                        <Button type="submit" className="circular-btn" color="secondary" size='large' fullWidth>Register</Button>
                    </Grid>
                    
                    <Grid item xs={12}>
                        <NextLink href={"/auth/login"} passHref>
                            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                                <span>{"Already have an account?"}</span>
                                <Link underline='always' color="secondary" sx={{ cursor: "pointer" }}>
                                    <Typography >
                                        <span>Login</span>
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

export default register
