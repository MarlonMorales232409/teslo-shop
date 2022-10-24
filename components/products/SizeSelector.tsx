import { Box, Button } from "@mui/material";
import { FC } from "react"
import { IValidSize } from '../../interfaces';

interface Props {
    selectedSize?: IValidSize
    sizes: IValidSize[]
}

export const SizeSelector: FC<Props> = ({ sizes, selectedSize }) => {
    return (
        <Box>
            {
                sizes.map(size => (

                    <Button
                        key={size}
                        size="small"
                        color={selectedSize === size ? "primary" : "info"}
                    >
                        {size}
                    </Button>

                ))
            }
        </Box>
    )
}
