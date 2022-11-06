import type { GetServerSideProps, NextPage } from 'next'
import { ShopLayout } from '../../components/layout'
import { ProductList } from '../../components/products';
import { Box, Typography } from '@mui/material'
import { useProduct } from '../../hooks';
import { LoaderScreen } from '../../components/ui';
import { dbProduct } from '../../database';
import { IProduct } from '../../interfaces/products';

interface Props {
    products: IProduct[]
    areThereProducts: boolean
    query: string
}

const HomePage: NextPage<Props> = ({ products, areThereProducts, query }) => {


    return (
        <ShopLayout title='Teslo Shop - Search Page' pageDescription={`match with product search term: ${query}}`}>
            <Typography variant='h1' component={'h1'}>Search Product</Typography>
            {
                areThereProducts
                    ? (
                        <Box display="flex">
                            <Typography variant='h2' sx={{ mb: 1 }}>Product that match with:</Typography>
                            <Typography variant='h2' color={"secondary"} sx={{ ml: 1, textTransform: "capitalize" }}>{query}</Typography>
                        </Box>
                    )
                    : (

                        <Box display="flex">
                            <Typography variant='h2' sx={{ mb: 1 }}>There is not any product that match with:</Typography>
                            <Typography variant='h2' color={"secondary"} sx={{ ml: 1, textTransform: "capitalize" }}>{query}</Typography>
                        </Box>

                    )
            }
            <ProductList products={products} />
        </ShopLayout>
    )
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {

    const { query = '' } = params as { query: string }

    if (query.length === 0) {
        return {
            redirect: {
                destination: "/",
                permanent: true
            }
        }
    }

    let products = await dbProduct.getProductsByTerm(query)

    const isProductsThere = products.length > 0

    if (!isProductsThere) {
        products = await dbProduct.getAllProducts('shirt')

    }

    return {
        props: {
            products,
            isProductsThere,
            query: query
        },
    }
}


export default HomePage
