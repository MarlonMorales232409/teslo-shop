import { Box, Divider, Drawer, IconButton, Input, InputAdornment, List, ListItem, ListItemButton, ListItemIcon, ListItemText, ListSubheader } from "@mui/material"
import { AccountCircleOutlined, AdminPanelSettings, CategoryOutlined, ConfirmationNumberOutlined, EscalatorWarningOutlined, FemaleOutlined, LoginOutlined, MaleOutlined, SearchOutlined, VpnKeyOutlined } from "@mui/icons-material"
import { useRouter } from "next/router"
import { useContext, useState } from "react"
import { UiContext } from "../../context"
import { AuthContext } from "../../context/auth"


export const SideMenu = () => {

    const { isUserLogged, user, logoutUser } = useContext(AuthContext)

    const router = useRouter()
    const { isMenuOpen, toggleMenu } = useContext(UiContext)
    const [searchTerm, setSearchTerm] = useState("")

    const navigateTo = (url: string = "/") => {
        toggleMenu()
        router.push(url)
    }

    const onSearchTerm = () => {
        if (searchTerm.trim().length === 0) return
        navigateTo(`/search/${searchTerm}`)
    }


    return (
        <Drawer
            open={isMenuOpen}
            anchor='right'
            sx={{ backdropFilter: 'blur(4px)', transition: 'all 0.5s ease-out' }}
            onClose={toggleMenu}
        >
            <Box sx={{ width: 250, paddingTop: 5 }}>
                <List>

                    <ListItem>
                        <Input
                            autoFocus
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" ? onSearchTerm() : null}
                            type='text'
                            placeholder="Buscar..."
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={onSearchTerm}
                                    >
                                        <SearchOutlined />
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </ListItem>

                  
                    {
                        isUserLogged && (
                        <>
                            <ListItemButton >
                                <ListItemIcon>
                                    <AccountCircleOutlined />
                                </ListItemIcon>
                                <ListItemText primary={'Perfil'} />
                            </ListItemButton>

                            <ListItemButton >
                                <ListItemIcon>
                                    <ConfirmationNumberOutlined />
                                </ListItemIcon>
                                <ListItemText primary={'Mis Ordenes'} />
                            </ListItemButton>
                        </>
                        )
                    }


                    <ListItemButton sx={{ display: { xs: '', sm: 'none' } }} onClick={() => navigateTo("/category/man")}>
                        <ListItemIcon>
                            <MaleOutlined />
                        </ListItemIcon>
                        <ListItemText primary={'Hombres'} />
                    </ListItemButton>

                    <ListItemButton sx={{ display: { xs: '', sm: 'none' } }} onClick={() => navigateTo("/category/woman")}>
                        <ListItemIcon>
                            <FemaleOutlined />
                        </ListItemIcon>
                        <ListItemText primary={'Mujeres'} />
                    </ListItemButton>

                    <ListItemButton sx={{ display: { xs: '', sm: 'none' } }} onClick={() => navigateTo("/category/kid")}>
                        <ListItemIcon>
                            <EscalatorWarningOutlined />
                        </ListItemIcon>
                        <ListItemText primary={'Niños'} />
                    </ListItemButton>

                    {
                        !isUserLogged ? (
                            <>
                                <ListItemButton onClick={()=> navigateTo(`/auth/login?p=${router.asPath}`)}>
                                    <ListItemIcon>
                                        <VpnKeyOutlined />
                                    </ListItemIcon>
                                    <ListItemText primary={'Ingresar'} />
                                </ListItemButton>
                            </>
                        ) : (
                            <>
                            <ListItemButton onClick={logoutUser}>
                                <ListItemIcon>
                                    <LoginOutlined />
                                </ListItemIcon>
                                <ListItemText primary={'Salir'} />
                            </ListItemButton>
                            </>
                        )
                    }
                    



                    {/* Admin */}
                    {
                        user?.role === 'admin' && (
                            <>
                            <Divider />
                            <ListSubheader>Admin Panel</ListSubheader>
        
                            <ListItemButton>
                                <ListItemIcon>
                                    <CategoryOutlined />
                                </ListItemIcon>
                                <ListItemText primary={'Productos'} />
                            </ListItemButton>
                            <ListItemButton>
                                <ListItemIcon>
                                    <ConfirmationNumberOutlined />
                                </ListItemIcon>
                                <ListItemText primary={'Ordenes'} />
                            </ListItemButton>
        
                            <ListItemButton>
                                <ListItemIcon>
                                    <AdminPanelSettings />
                                </ListItemIcon>
                                <ListItemText primary={'Usuarios'} />
                            </ListItemButton>
                            </>
                        ) 
                    }
                   
                </List>
            </Box>
        </Drawer>
    )
}
