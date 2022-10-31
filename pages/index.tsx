import type { NextPage } from 'next'
import { ShopLayout } from '../components/layout'
import { ProductList } from '../components/products';
import { Typography } from '@mui/material'
import { useProduct } from '../hooks';
import { LoaderScreen } from '../components/ui';

const HomePage: NextPage = () => {

  const { products, isLoading } = useProduct('/products')


  return (
    <ShopLayout title='Teslo Shop - Home' pageDescription={'Find the best products in teslo shop here'}>
      <Typography variant='h1' component={'h1'}>Shop</Typography>
      <Typography variant='h2' sx={{ mb: 1 }}>All products here</Typography>
      {
        isLoading
          ? <LoaderScreen />
          : <ProductList products={products} />
      }
    </ShopLayout>
  )
}

export default HomePage
