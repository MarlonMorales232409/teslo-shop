import { Box, Button, FormControl, Grid, Input, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material"
import { GetServerSideProps } from "next"
import { ShopLayout } from "../../components/layout"
import { jwt } from "../../utils"

const AddressPage = () => {
    return (
        <ShopLayout title="checkout page" pageDescription="checkaut page, we will send your order in one day">
            <Typography variant="h1" component="h1">Address</Typography>
            <Grid container spacing={2} sx={{ mt: 2 }}>

                <Grid item xs={12} sm={6}>
                    <TextField label="Name" variant="filled" fullWidth />
                </Grid>

                <Grid item xs={12} sm={6} >
                    <TextField label="Last Name" variant="filled" fullWidth />
                </Grid>

                <Grid item xs={12} sm={6} >
                    <TextField label="Address" variant="filled" fullWidth />
                </Grid>

                <Grid item xs={12} sm={6} >
                    <TextField label="Address 2 (optional)" variant="filled" fullWidth />
                </Grid>

                <Grid item xs={12} sm={6} >
                    <TextField label="Zip Code" variant="filled" fullWidth />
                </Grid>

                <Grid item xs={12} sm={6} >
                    <TextField label="City" variant="filled" fullWidth />
                </Grid>

                <Grid item xs={12} sm={6} >
                    <TextField label="Phone Number" variant="filled" fullWidth />
                </Grid>

                <Grid item xs={12} sm={6} >
                    <FormControl fullWidth>
                        <InputLabel>Country</InputLabel>
                        <Select variant="filled" label="country" value={""} fullWidth>
                            <MenuItem value={1}>United State</MenuItem>
                            <MenuItem value={2}>Spain</MenuItem>
                            <MenuItem value={3}>England</MenuItem>
                            <MenuItem value={4}>Japan</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
            <Box display="flex" justifyContent="center" sx={{ mt: 5 }}>
                <Button size="large" color="secondary" variant="contained" className="circular-btn">Check Order</Button>
            </Box>

        </ShopLayout>
    )
}

// export const getServerSideProps: GetServerSideProps = async ({ req })=> {

//     const { token = '' } = req.cookies;
//     let isValidToken = false;

//     try {

//         await jwt.isValidToken(token);
//         isValidToken = true

//     } catch (error) {
//         return {
//             redirect : {
//                 destination: '/auth/login?p=/checkout/address',
//                 permanent: false
//             }
//         }
//     }


//     return {
//         props : {

//         }
//     }
// }

export default AddressPage