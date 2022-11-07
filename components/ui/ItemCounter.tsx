import { FC } from 'react'
import { Box, IconButton, Typography } from '@mui/material'
import { AddCircleOutline, RemoveCircleOutline } from '@mui/icons-material'

interface Props {
    currentValue: number,
    updatedQuantity: (quantity: number) => void,
    maxValue: number
}



export const ItemCounter: FC<Props> = ({ currentValue, updatedQuantity, maxValue }) => {
    const onAddItem = () => {
        if (currentValue >= maxValue) {
            return
        }

        currentValue++
        updatedQuantity(currentValue)
    }

    const onRemoveItem = () => {
        if (currentValue <= 0) {
            return
        }

        currentValue--
        updatedQuantity(currentValue)
    }

    return (
        <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton disabled={currentValue === 0} onClick={onRemoveItem}>
                <RemoveCircleOutline />
            </IconButton>
            <Typography sx={{ width: "40", textAlign: "center" }} > {currentValue} </Typography>
            <IconButton disabled={currentValue === maxValue} onClick={onAddItem} >
                <AddCircleOutline />
            </IconButton>
        </Box>
    )
}
