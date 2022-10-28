import { Box, Button, Grid, Link, TextField, Typography } from '@mui/material'
import NextLink from 'next/link'
import { AuthLayout } from '../../components/layout'

const login = () => {
    return (
        <AuthLayout title="Login">
            <Box sx={{ width: 350, padding: "10px 20px" }} >
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant='h1' component={"h1"}>Login</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField label="E-mail" type="email" fullWidth />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField label="Password" type="password" fullWidth />
                    </Grid>
                    <Grid item xs={12}>
                        <Button className="circular-btn" color="secondary" size='large' fullWidth>Get Into</Button>
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
        </AuthLayout>
    )
}

export default login