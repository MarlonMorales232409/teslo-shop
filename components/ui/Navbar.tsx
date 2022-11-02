import NextLink from "next/link";
import { AppBar, Badge, Box, Button, IconButton, Link, Toolbar, Typography } from '@mui/material'
import { SearchOutlined, ShoppingCartOutlined } from "@mui/icons-material";
import MenuIcon from '@mui/icons-material/Menu';
import { useRouter } from "next/router";
import { useContext } from "react";
import { UiContext } from "../../context";

export const Navbar = () => {

    const { asPath } = useRouter()

    const { toggleMenu } = useContext(UiContext)

    return (
        <AppBar>
            <Toolbar>
                <NextLink href={'/'} passHref>
                    <Link display='flex' alignItems='center' color={"black"}>
                        <Typography variant="h6">Teslo |</Typography>
                        <Typography sx={{ ml: 0.5 }}>Shop</Typography>
                    </Link>
                </NextLink>

                <Box flex={1} />

                <Box sx={{ display: { xs: "none", sm: "block" } }}>
                    <NextLink href={'/category/man'} passHref>
                        <Link>
                            <Button color={asPath === "/category/man" ? "primary" : "info"}>Mans</Button>
                        </Link>
                    </NextLink>

                    <NextLink href={'/category/woman'} passHref>
                        <Link >
                            <Button color={asPath === "/category/woman" ? "primary" : "info"}>Womans</Button>
                        </Link>
                    </NextLink>

                    <NextLink href={'/category/kid'} passHref>
                        <Link >
                            <Button color={asPath === "/category/kid" ? "primary" : "info"}>Kids</Button>
                        </Link>
                    </NextLink>
                </Box>

                <Box flex={1} />

                <IconButton>
                    <SearchOutlined />
                </IconButton>

                <NextLink href={'/cart'} passHref>
                    <Link>
                        <IconButton>
                            <Badge badgeContent={2} color="secondary" >
                                <ShoppingCartOutlined />
                            </Badge>
                        </IconButton>

                    </Link>
                </NextLink>

                <IconButton onClick={toggleMenu}>
                    <MenuIcon />
                </IconButton>
            </Toolbar>
        </AppBar>
    )
}
