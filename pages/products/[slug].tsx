import { Box, Button, Chip, Grid, Typography } from '@mui/material';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { ShopLayout } from '../../components/layout/ShopLayout';
import { SizeSelector } from '../../components/products';
import { ItemCounter, SlideShow } from '../../components/ui';
import { dbProduct } from '../../database';
import { IProduct } from '../../interfaces';
import { ICartProduct } from '../../interfaces/cart';
import { useContext, useState } from 'react';
import { IValidSize } from '../../interfaces/products';
import { CartContext } from '../../context';
import { useRouter } from 'next/router';



interface Props {
    product: IProduct
}

const ProductPage: NextPage<Props> = ({ product }) => {

    const { addProductToCart } = useContext(CartContext)
    const router = useRouter()

    const [tempCartProduct, setTempCartProduct] = useState<ICartProduct>({
        _id: product._id,
        image: product.images[0],
        price: product.price,
        size: undefined,
        slug: product.slug,
        title: product.title,
        gender: product.gender,
        quantity: 1,
        inStock: product.inStock
    })

    const onSelectedSize = (size: IValidSize) => {
        setTempCartProduct((currentProduct) => (
            { ...currentProduct, size }
        ))
    }

    // const [updatedQuantity, setUpdatedQuantity] = useState(0)

    const updatedQuantity = (quantity: number) => {
        setTempCartProduct((currentProduct) => (
            { ...currentProduct, quantity }
        ))
    }

    const onAddtoCart = () => {
        if (!tempCartProduct.size) return

        addProductToCart(tempCartProduct)

        router.push('/cart')

    }

    return (
        <ShopLayout title={product.title} pageDescription={`Description about the product ${product.slug}`}>
            <Grid container spacing={3}>

                <Grid item xs={12} sm={7}>
                    <SlideShow images={product.images} />
                </Grid>

                <Grid item xs={12} sm={5}>
                    <Box display={'flex'} flexDirection="column">
                        <Typography variant='h1' component="h1">{product.title}</Typography>
                        <Typography variant="subtitle1" component="h2">{`$${product.price}`}</Typography>

                        {/* Cantidad */}

                        <Box sx={{ my: 2 }}>
                            <Typography variant='subtitle2'>Amount</Typography>
                            <ItemCounter
                                currentValue={tempCartProduct.quantity}
                                updatedQuantity={updatedQuantity}
                                maxValue={product.inStock}
                            />
                            <SizeSelector
                                sizes={product.sizes}
                                selectedSize={tempCartProduct.size}
                                onSelectedSize={(size) => onSelectedSize(size)}

                            />
                        </Box>

                        {/* Add to the cart */}
                        {
                            product.inStock === 0 ? (
                                <Chip color="error" variant="outlined" label="Sold Out" />
                            ) : (
                                <Button color="secondary" className="circular-btn" onClick={onAddtoCart}>
                                    {
                                        tempCartProduct.size ? 'Add to Cart' : 'Select a size'
                                    }
                                </Button>

                            )
                        }

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



export const getStaticPaths = async () => {

    const slugs = await dbProduct.getAllSlugs();

    return {
        paths: slugs?.map(slug => (
            { params: slug }
        )),
        fallback: "blocking",
    };
}

export const getStaticProps: GetStaticProps = async ({ params }) => {

    const { slug } = params as { slug: string }

    const product = await dbProduct.getProductBySlug(slug)

    if (!product) {
        return {
            redirect: {
                destination: "/",
                permanent: false,
            }
        }
    }

    return {
        props: {
            product
        },
    }
}




export default ProductPage