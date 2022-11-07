import { Box, Button } from "@mui/material";
import { FC } from "react"
import { IValidSize } from '../../interfaces';

interface Props {
    selectedSize?: IValidSize
    sizes: IValidSize[]
    onSelectedSize: (size: IValidSize) => void
}

export const SizeSelector: FC<Props> = ({ sizes, selectedSize, onSelectedSize }) => {
    return (
        <Box>
            {
                sizes.map(size => (

                    <Button
                        key={size}
                        size="small"
                        color={selectedSize === size ? "primary" : "info"}
                        onClick={() => onSelectedSize(size)}
                    >
                        {size}
                    </Button>

                ))
            }
        </Box>
    )
}
