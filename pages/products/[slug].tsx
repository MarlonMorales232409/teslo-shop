import { Box, Button, Chip, Grid, Typography } from '@mui/material';
import { GetServerSideProps, GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { ShopLayout } from '../../components/layout/ShopLayout';
import { SizeSelector } from '../../components/products';
import { ItemCounter, SlideShow } from '../../components/ui';
import { dbProduct } from '../../database';
import { useProduct } from '../../hooks';
import { IProduct } from '../../interfaces';
import { getProductBySlug, getAllSlugs } from '../../database/dbProducts';



interface Props {
    product: IProduct
}


const ProductPage: NextPage<Props> = ({ product }) => {


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
                            <ItemCounter />
                            <SizeSelector sizes={product.sizes} selectedSize={product.sizes[0]} />
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



// export const getServerSideProps: GetServerSideProps = async ({ params }) => {

//     const { slug = "" } = params as { slug: string }

//     const product = await dbProduct.getProductBySlug(slug);

//     if (!product) {
//         return {
//             redirect: {
//                 destination: "/",
//                 permanent: false
//             }
//         }
//     }



//     return {
//         props: {
//             product
//         },
//     }
// }


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