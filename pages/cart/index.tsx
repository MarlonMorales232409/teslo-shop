import { Box, Button, Card, CardContent, Divider, Grid, Typography } from '@mui/material';
import { CardList, OrderSumary } from '../../components/cart';
import { ShopLayout } from '../../components/layout/ShopLayout';


const CartPage = () => {
    return (
        <ShopLayout title='Cart - 3' pageDescription='Cart page with 3 items'>
            <Grid container>

                <Grid item xs={12} sm={7}>
                    <CardList editable />
                </Grid>

                <Grid item xs={12} sm={5}>
                    <Card className="summary-card">
                        <CardContent>
                            <Typography variant="h2">Order</Typography>
                            <Divider sx={{ my: 1 }} />

                            <OrderSumary />

                            <Box sx={{ mt: 3 }}>
                                <Button color={"secondary"} className="circular-btn" fullWidth>Checkout</Button>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>

            </Grid>
        </ShopLayout>
    )
}

export default CartPage