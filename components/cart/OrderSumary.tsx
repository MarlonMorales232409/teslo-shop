import { Grid, Typography } from "@mui/material"
import { useContext } from "react"
import { CartContext } from "../../context"
import { currency } from "../../utils"


export const OrderSumary = () => {


    const state = useContext(CartContext)

    


    return (
        <Grid container spacing={2}>

            <Grid item xs={6}>
                <Typography>Number of products</Typography>
            </Grid>
            <Grid item xs={6} display="flex" justifyContent="end">
                <Typography>{state.numberOfItem}</Typography>
            </Grid>

            <Grid item xs={6}>
                <Typography>Subtotal.</Typography>
            </Grid>
            <Grid item xs={6} display="flex" justifyContent="end">
                <Typography>{currency.formart(state.subTotal)}</Typography>
            </Grid>

            <Grid item xs={6}>
                <Typography>Tax</Typography>
            </Grid>
            <Grid item xs={6} display="flex" justifyContent="end">
                <Typography>{Number(process.env.NEXT_PUBLIC_TAX_RATE) * 100}%</Typography>
            </Grid>
            <Grid item xs={6} sx={{ mt: 2 }}>
                <Typography variant="subtitle1">Total:</Typography>
            </Grid>
            <Grid item xs={6} display="flex" justifyContent="end" sx={{ mt: 2 }}>
                <Typography variant="subtitle1">{currency.formart(state.total)}</Typography>
            </Grid>


        </Grid>
    )
}
