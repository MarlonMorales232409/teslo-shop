import NextLink from "next/link"
import { ShopLayout } from '../../components/layout/ShopLayout';
import { Box, Button, Card, CardContent, Divider, Grid, Link, Typography } from '@mui/material';
import { CardList, OrderSumary } from '../../components/cart';


const SumaryPage = () => {
    return (
        <ShopLayout title='Cart - 3' pageDescription='Cart page with 3 items'>
            <Grid container>

                <Grid item xs={12} sm={7}>
                    <CardList />
                </Grid>

                <Grid item xs={12} sm={5}>
                    <Card className="summary-card">
                        <CardContent>
                            <Typography variant="h2">Order</Typography>

                            <Divider sx={{ my: 1 }} />

                            <Box display="flex" justifyContent="space-between" sx={{ pb: "10px" }}>
                                <Typography variant="subtitle1">Delivery Address</Typography>
                                <NextLink href={"/checkout/address"}>
                                    <Link underline="always" color="secondary" sx={{ cursor: "pointer" }}>
                                        Edit
                                    </Link>
                                </NextLink>
                            </Box>
                            <Typography>Marlon Morales</Typography>
                            <Typography>Number 7 - WallStreet</Typography>
                            <Typography>25400</Typography>
                            <Typography>New-York</Typography>
                            <Typography>+1 (786) 386 960</Typography>

                            <Divider sx={{ my: 1 }} />


                            <Box display="flex" justifyContent="end" sx={{ pb: "10px" }}>
                                <NextLink href={"/cart"}>
                                    <Link underline="always" color="secondary" sx={{ cursor: "pointer" }}>
                                        Edit
                                    </Link>
                                </NextLink>
                            </Box>

                            <OrderSumary />

                            <Box sx={{ mt: 3 }}>
                                <Button color={"secondary"} className="circular-btn" fullWidth>Get It</Button>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>

            </Grid>
        </ShopLayout>
    )
}

export default SumaryPage