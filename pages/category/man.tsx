import type { NextPage } from 'next'
import { ShopLayout } from '../../components/layout'
import { useProduct } from '../../hooks'
import { ProductList } from '../../components/products'
import { Typography } from '@mui/material'
import { LoaderScreen } from '../../components/ui'


const ManPage: NextPage = () => {

    const { products, isLoading } = useProduct('/products?gender=men')

    return (
        <ShopLayout title='Teslo Shop - Men Section' pageDescription={'Get a new futuristic look with our great designs for men'}>
            <Typography variant='h1' component={'h1'}>Men - Section</Typography>
            <Typography variant='h2' sx={{ mb: 1 }}>Find the best look for you</Typography>
            {
                isLoading
                    ? <LoaderScreen />
                    : <ProductList products={products} />
            }
        </ShopLayout>
    )
}

export default ManPage
