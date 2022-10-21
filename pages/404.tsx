import { Box, Typography } from "@mui/material"
import { ShopLayout } from "../components/layout"

const Custom404Page = () => {
    return (
        <ShopLayout title={"Page 404"} pageDescription={"there is nothing here"}>
            <Box
                display={'flex'}
                alignItems="center"
                justifyContent={"center"}
                height={"calc(100vh - 200px)"}
                sx={{ flexDirection: { xs: "column", sm: "row" } }}
            >
                <Typography variant="h1" component={"h1"} fontSize={80} fontWeight={200}>404 | </Typography>
                <Typography fontSize={22} ml={2}>There is anything here</Typography>
            </Box>
        </ShopLayout>
    )
}

export default Custom404Page