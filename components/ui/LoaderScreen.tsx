import { Box, CircularProgress, Typography } from "@mui/material"



export const LoaderScreen = () => {
    return (
        <Box
            display={'flex'}
            flexDirection={"column"}
            alignItems="center"
            justifyContent={"center"}
            height={"calc(100vh - 200px)"}
            gap={2}

        >
            <CircularProgress />
            <Typography variant="h2" component={"h2"} fontSize={25} fontWeight={200}>Loading...</Typography>
        </Box>
    )
}
