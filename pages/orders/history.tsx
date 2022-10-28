import NextLink from 'next/link'
import { ShopLayout } from '../../components/layout'
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { Grid, Typography, Chip, Link } from '@mui/material';

const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "fullname", headerName: "Full Name", width: 300 },
    {
        field: "payed",
        headerName: "Payed",
        description: "Show infromation about if the order is payed or not",
        width: 200,
        renderCell: (params: any) => {
            return (
                params.row.payed
                    ? <Chip color='success' label="payed" variant='outlined' />
                    : <Chip color='error' label="pending" variant='outlined' />

            )
        }

    },
    {
        field: "orderSummary",
        headerName: "Order Summary",
        width: 300,
        sortable: false,
        renderCell: (params: any) => (
            <NextLink href={`/orders/${params.row.id}`} passHref>
                <Link underline='hover' color={params.row.payed ? "success" : "error"}>
                    {params.row.payed ? "See Summary" : "Pay Order"}
                </Link>
            </NextLink>
        )
    }
]

const rows = [
    { id: 1, payed: true, fullname: "Marlon Morales" },
    { id: 2, payed: false, fullname: "Lilianet Lopez" },
    { id: 3, payed: true, fullname: "Liliabet Lopez" },
    { id: 4, payed: false, fullname: "Samuel Garcia" },
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