import type { NextPage } from 'next'
import { ShopLayout } from '../../components/layout'
import { useProduct } from '../../hooks'
import { ProductList } from '../../components/products'
import { Typography } from '@mui/material'
import { LoaderScreen } from '../../components/ui'


const KidPage: NextPage = () => {

    const { products, isLoading } = useProduct('/products?gender=kid')


    return (
        <ShopLayout title='Teslo Shop - Kids Section' pageDescription={'Give it your son the unique Teslo Style'}>
            <Typography variant='h1' component={'h1'}>Kids - Section</Typography>
            <Typography variant='h2' sx={{ mb: 1 }}>Check our designs for kids, They are amazing!!!</Typography>
            {
                isLoading
                    ? <LoaderScreen />
                    : <ProductList products={products} />
            }
        </ShopLayout>
    )
}

export default KidPage
