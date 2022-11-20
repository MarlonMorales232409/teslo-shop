import NextLink from "next/link";
import { AppBar, Badge, Box, Button, IconButton, Input, InputAdornment, Link, Toolbar, Typography } from '@mui/material'
import { ClearOutlined, SearchOutlined, ShoppingCartOutlined } from "@mui/icons-material";
import MenuIcon from '@mui/icons-material/Menu';
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { CartContext, UiContext } from "../../context";

export const Navbar = () => {

    const { asPath, push } = useRouter()

    const { toggleMenu } = useContext(UiContext)
    const { numberOfItem } = useContext(CartContext)


    const [searchTerm, setSearchTerm] = useState("")
    const [isSearchActive, setIsSearchActive] = useState(false)


    const onSearchTerm = () => {
        if (searchTerm.trim().length === 0) return
        push(`/search/${searchTerm}`)
    }


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

                <Box
                    className="fadeIn"
                    sx={{ display: isSearchActive ? "none" : { xs: "none", sm: "flex" } }}
                >
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
                {/* Large Screen */}
                <Input
                    className="fadeIn"
                    sx={{ display: isSearchActive ? { xs: "none", sm: "flex" } : "none" }}
                    autoFocus
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" ? onSearchTerm() : null}
                    type='text'
                    placeholder="Buscar..."
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                onClick={() => setIsSearchActive(false)}
                            >
                                <ClearOutlined />
                            </IconButton>
                        </InputAdornment>
                    }
                />

                <IconButton
                    sx={{ display: isSearchActive ? "none" : { xs: "none", sm: "flex" } }}
                    onClick={() => setIsSearchActive(true)}
                    className="fadeIn"
                >
                    <SearchOutlined />
                </IconButton>


                {/* mobile screen */}
                <IconButton sx={{ display: { xs: "flex", sm: "none" } }} onClick={toggleMenu}>
                    <SearchOutlined />
                </IconButton>

                <NextLink href={'/cart'} passHref>
                    <Link>
                        <IconButton>
                            <Badge badgeContent={numberOfItem > 9 ? "+9" : numberOfItem} color="secondary" >
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
