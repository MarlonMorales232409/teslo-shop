import { Grid, Typography } from "@mui/material"


export const OrderSumary = () => {
    return (
        <Grid container spacing={2}>

            <Grid item xs={6}>
                <Typography>Product No.</Typography>
            </Grid>
            <Grid item xs={6} display="flex" justifyContent="end">
                <Typography>3</Typography>
            </Grid>

            <Grid item xs={6}>
                <Typography>Subtotal.</Typography>
            </Grid>
            <Grid item xs={6} display="flex" justifyContent="end">
                <Typography>{`$${154.85}`}</Typography>
            </Grid>

            <Grid item xs={6}>
                <Typography>Tax</Typography>
            </Grid>
            <Grid item xs={6} display="flex" justifyContent="end">
                <Typography>15%</Typography>
            </Grid>
            <Grid item xs={6} sx={{ mt: 2 }}>
                <Typography variant="subtitle1">Total:</Typography>
            </Grid>
            <Grid item xs={6} display="flex" justifyContent="end" sx={{ mt: 2 }}>
                <Typography variant="subtitle1">{`$${186.33}`}</Typography>
            </Grid>


        </Grid>
    )
}
