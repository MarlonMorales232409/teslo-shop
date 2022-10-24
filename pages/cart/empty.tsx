import NextLink from "next/link"
import { Box, Link, Typography } from "@mui/material"
import { RemoveShoppingCartOutlined } from "@mui/icons-material"
import { ShopLayout } from "../../components/layout"


const EmptyCart = () => {
    return (
        <ShopLayout title={"Cart Empty"} pageDescription={"there is nothing here"}>
            <Box
                display={'flex'}
                alignItems="center"
                justifyContent={"center"}
                height={"calc(100vh - 200px)"}
                sx={{ flexDirection: { xs: "column", sm: "row" } }}
            >
                <RemoveShoppingCartOutlined sx={{ fontSize: "80px" }} />
                <Box sx={{ display: "flex", alignItems: "center", flexDirection: "column" }}>
                    <NextLink href={"/"} passHref>
                        <Link typography={"h4"} color="secondary">
                            Go Back
                        </Link>
                    </NextLink>
                </Box>
            </Box>
        </ShopLayout>
    )
}

export default EmptyCart