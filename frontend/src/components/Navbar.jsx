import React from "react";
import { AppBar, Toolbar, Typography, IconButton, useMediaQuery, useTheme} from '@mui/material'
import { Menu as MenuIcon, Logout as LogoutIcon }  from '@mui/icons-material'
import { useAuth } from "../context/AuthContext";

const Navbar = ( {onMenuClick}) => {
    const { user, logout } = useAuth();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <AppBar position="fixed" sx={{zIndex: (theme) => theme.zIndex.drawer + 1}}>
            <Toolbar>
                {/* Botao do menu {mobile}*/}
                {isMobile && (
                    <IconButton 
                        color="inherit"
                        edge="start"
                        onClick={onMenuClick}
                        sx={{ mr: 2}}
                    >
                        <MenuIcon />
                    </IconButton>
                )}

                {/* Logo/Nome App */}
                <Typography variant="h6" component='div' sx={{ flexGrow: 1}}>
                    Task Manager
                    {user?.name && (
                        <Typography variant="subtitle1" component="span" sx={{ml: 2}}>
                            Olá, {user.name}
                        </Typography>
                    )}
                </Typography>

                {/* Botão de logout */}
                <IconButton color="inherit" onClick={logout}>
                    <LogoutIcon />
                </IconButton>
            </Toolbar>
        </AppBar>
    )

}

export default Navbar
