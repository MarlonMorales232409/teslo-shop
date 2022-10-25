import NextLink from "next/link"
import { Box, Button, CardActionArea, CardMedia, Grid, Link, Typography } from "@mui/material"
import { initialData } from "../../database/products"
import { ItemCounter } from '../ui/ItemCounter';
import { FC } from "react";


const productsInCart = [
    initialData.products[0],
    initialData.products[1],
    initialData.products[2],
]

interface Props {
    editable?: boolean
}

export const CardList: FC<Props> = ({ editable = false }) => {
    return (
        <>
            {
                productsInCart.map(product => (
                    <Grid key={product.slug} container spacing={2} >

                        <Grid item xs={3} mb={1} >
                            <NextLink href="product/slug" passHref>
                                <Link>
                                    <CardActionArea>
                                        <CardMedia
                                            component={"img"}
                                            src={`/products/${product.images[0]}`}
                                            sx={{ borderRadius: 5 }}
                                        />
                                    </CardActionArea>
                                </Link>
                            </NextLink>
                        </Grid>

                        <Grid item xs={7}>
                            <Box display="flex" flexDirection="column">
                                <Typography variant="body1">{product.title}</Typography>
                                <Typography variant="body1">Size: <strong>{product.sizes[0]}</strong> </Typography>
                                {/* Conditional */}
                                {
                                    editable
                                        ? (<ItemCounter />)
                                        : (<Typography variant="h5">3 Items</Typography>)
                                }
                            </Box>
                        </Grid>
                        <Grid item xs={2} display="flex" flexDirection="column" alignItems="center" >
                            <Typography variant="subtitle1" >{`$${product.price}`}</Typography>
                            {
                                editable && (<Button variant="text" color="secondary">Remove</Button>)
                            }

                        </Grid>
                    </Grid>
                ))
            }
        </>
    )
}
