import { FC, useMemo, useState } from 'react'
import NextLink from "next/link"
import { Grid, Card, CardActionArea, CardMedia, Typography, Box, Link } from '@mui/material'
import { IProduct } from '../../interfaces/products';

interface Props {
    product: IProduct
}

export const ProductCard: FC<Props> = ({ product }) => {

    const [isHovered, setIsHovered] = useState(false)
    const [isLoaded, setIsLoaded] = useState(false)

    const productImage = useMemo(() => {

        return isHovered
            ? (`/products/${product.images[1]}`)
            : (`/products/${product.images[0]}`)

    }, [isHovered, product.images])

    return (
        <Grid
            item
            xs={6}
            sm={4}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <NextLink href={`/products/${product.slug}`} passHref prefetch={false}>
                <Link>
                    <Card>
                        <CardActionArea>
                            <CardMedia
                                component={"img"}
                                image={productImage}
                                alt="product.title"
                                className="fadeIn"
                                onLoad={() => setIsLoaded(true)}
                            />
                        </CardActionArea>
                    </Card>
                </Link>
            </NextLink>
            <Box sx={{ mt: 1, display: isLoaded ? "block" : "none" }} className="fadeIn">
                <Typography fontWeight={700} >{product.title}</Typography>
                <Typography fontWeight={500} >{`$${product.price}`}</Typography>
            </Box>
        </Grid>
    )
}
