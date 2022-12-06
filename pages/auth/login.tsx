import { Box, Button, Grid, Link, TextField, Typography } from '@mui/material'
import NextLink from 'next/link'
import { useForm } from 'react-hook-form';
import { AuthLayout } from '../../components/layout'
import { validation } from '../../utils';

type FormData = {
    email: string,
    password: string,
  };

const login = () => {

    
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

    const onLoginUser = (data: FormData)=> {
        console.log({data})
    }

    return (
        <AuthLayout title="Login">
            <form onSubmit={ handleSubmit(onLoginUser) } noValidate>
            <Box sx={{ width: 350, padding: "10px 20px" }} >
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant='h1' component={"h1"}>Login</Typography>
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