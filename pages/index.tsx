import type { NextPage } from 'next'
import { ShopLayout } from '../components/layout'
import { ProductList } from '../components/products';
import { initialData } from '../database/products';
import { Typography } from '@mui/material'



const HomePage: NextPage = () => {
  return (
    <ShopLayout title='Teslo Shop - Home' pageDescription={'Find the best products in teslo shop here'}>
      <Typography variant='h1' component={'h1'}>Shop</Typography>
      <Typography variant='h2' sx={{ mb: 1 }}>All products here</Typography>

      <ProductList products={initialData.products as any} />
    </ShopLayout>
  )
}

export default HomePage
