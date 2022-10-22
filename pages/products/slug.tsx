import { Box, Button, Chip, Grid, Typography } from '@mui/material';
import { NextPage } from 'next';
import { ShopLayout } from '../../components/layout/ShopLayout';
import { initialData } from '../../database/products';



const product = initialData.products[0]


const ProductPage: NextPage = () => {
    return (
        <ShopLayout title={'ABC'} pageDescription={'Description about the product'}>
            <Grid container spacing={3}>

                <Grid item xs={12} sm={7}>
                    {/* Slider */}
                </Grid>

                <Grid item xs={12} sm={5}>
                    <Box display={'flex'} flexDirection="column">
                        <Typography variant='h1' component="h1">{product.title}</Typography>
                        <Typography variant="subtitle1" component="h2">{`$${product.price}`}</Typography>

                        {/* Cantidad */}

                        <Box sx={{ my: 2 }}>
                            <Typography variant='subtitle2'>Amount</Typography>
                            {/* Item Counter */}
                        </Box>

                        {/* Add to the cart */}

                        <Button color="secondary" className="circular-btn">
                            Add to the cart
                        </Button>

                        {/* <Chip color="error" variant="outlined" label="Sold Out" /> */}

                        <Box sx={{ my: 3 }}>
                            <Typography variant="subtitle2">Description</Typography>
                            <Typography variant="body2">{product.description}</Typography>
                        </Box>

                    </Box>
                </Grid>



            </Grid>
        </ShopLayout >
    )
}

export default ProductPage