import { Typography } from '@mui/material'
import type { NextPage } from 'next'
import { ShopLayout } from '../components/layout'

const HomePage: NextPage = () => {
  return (
    <ShopLayout title='Teslo Shop - Home' pageDescription={'Find the best products in teslo shop here'}>
      <Typography variant='h1' component={'h1'}>Shop</Typography>
      <Typography variant='h2' sx={{ mb: 1 }}>All products here</Typography>
    </ShopLayout>
  )
}

export default HomePage
