import type { NextPage } from 'next'
import { ShopLayout } from '../../components/layout'
import { useProduct } from '../../hooks'
import { ProductList } from '../../components/products'
import { Typography } from '@mui/material'
import { LoaderScreen } from '../../components/ui'


const WomanPage: NextPage = () => {

    const { products, isLoading } = useProduct('/products?gender=women')


    return (
        <ShopLayout title='Teslo Shop - Women Section' pageDescription={'Find your new style with our beautiful designs for women'}>
            <Typography variant='h1' component={'h1'}>Women - Section</Typography>
            <Typography variant='h2' sx={{ mb: 1 }}>Get a new style beautiful and futuristic</Typography>
            {
                isLoading
                    ? <LoaderScreen />
                    : <ProductList products={products} />
            }
        </ShopLayout>
    )
}

export default WomanPage
