import { Box, Button, Grid, Link, TextField, Typography } from '@mui/material'
import NextLink from 'next/link'
import { AuthLayout } from '../../components/layout'

const register = () => {
    return (
        <AuthLayout title="Login">
            <Box sx={{ width: 350, padding: "10px 20px" }} >
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant='h1' component={"h1"}>Register</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField label="Name" type="text" fullWidth />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField label="Last Name" type="text" fullWidth />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField label="E-Mail" type="email" fullWidth />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField label="Password" type="password" fullWidth />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField label="Verify your Password" type="password" fullWidth />
                    </Grid>
                    <Grid item xs={12}>
                        <Button className="circular-btn" color="secondary" size='large' fullWidth>Register</Button>
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
        </AuthLayout>
    )
}

export default register
