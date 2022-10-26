import { ShopLayout } from '../../components/layout'
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Grid, Typography } from '@mui/material'

const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "fullname", headerName: "Full Name", width: 300 },
]

const rows = [
    { id: 1, fullname: "Marlon Morales" }
]

const HistoryPage = () => {
    return (
        <ShopLayout title='Order History' pageDescription='Order History'>
            <Typography variant="h1" component="h1">Order History</Typography>
            <Grid container>
                <Grid item xs={12} sx={{ height: 650, width: "100%" }}>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={10}
                        rowsPerPageOptions={[10]}
                    />

                </Grid>
            </Grid>
        </ShopLayout>
    )
}

export default HistoryPage