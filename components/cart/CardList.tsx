import NextLink from "next/link"
import { Box, Button, CardActionArea, CardMedia, Grid, Link, Typography } from "@mui/material"
import { initialData } from "../../database/products"
import { ItemCounter } from '../ui/ItemCounter';
import { FC, useContext, useState } from "react";
import { CartContext } from "../../context";
import { ICartProduct } from "../../interfaces";


interface Props {
    editable?: boolean
}

export const CardList: FC<Props> = ({ editable = false }) => {

    const { cart: productsInCart, updateCartQuantity, removeCartProduct  } = useContext(CartContext)
    
    const updatedQuantityInCart = (product:ICartProduct, newQuantityValue: number )=> {
        product.quantity = newQuantityValue;
        if(product.quantity === 0) product.quantity = 1
        updateCartQuantity(product)
    }

    return (
        <>
            {
                productsInCart.map(product => (
                    <Grid key={product.slug + product.size} container spacing={2} >

                        <Grid item xs={3} mb={1} >
                            <NextLink href={`products/${product.slug}`} passHref>
                                <Link>
                                    <CardActionArea>
                                        <CardMedia
                                            component={"img"}
                                            src={`/products/${product.image}`}
                                            sx={{ borderRadius: 5 }}
                                        />
                                    </CardActionArea>
                                </Link>
                            </NextLink>
                        </Grid>

                        <Grid item xs={7}>
                            <Box display="flex" flexDirection="column">
                                <Typography variant="body1">{product.title}</Typography>
                                <Typography variant="body1">Size: <strong>{product.size}</strong> </Typography>
                                {/* Conditional */}
                                {
                                    editable
                                        ? (
                                        <ItemCounter 
                                            currentValue={product.quantity} 
                                            updatedQuantity={(value)=> updatedQuantityInCart(product,value)}
                                            maxValue={product.inStock} 
                                            />
                                        )
                                        : (
                                        <Typography variant="h5">
                                            {product.quantity} 
                                            {product.quantity > 1 ? "product" : "products"}
                                        </Typography>
                                        )
                                }
                            </Box>
                        </Grid>
                        <Grid item xs={2} display="flex" flexDirection="column" alignItems="center" >
                            <Typography variant="subtitle1" >{`$${product.price}`}</Typography>
                            {
                                editable && (
                                    <Button 
                                        variant="text" 
                                        color="secondary"
                                        onClick={()=> removeCartProduct(product)}
                                    >
                                        Remove
                                    </Button>)
                            }

                        </Grid>
                    </Grid>
                ))
            }
        </>
    )
}
