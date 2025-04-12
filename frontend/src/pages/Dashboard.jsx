import React, {useEffect, useState} from "react";
import { useAuth } from "../context/AuthContext";
import { Box, ListItem, ListItemIcon, Toolbar, ListItemText, List, CssBaseline, AppBar, IconButton, Typography, DashboardIcon } from '@mui/material'
import { MenuIcon } from '@mui/icons-material'

const drawerWidth = 240;

const Dashboard = () => {
    const {user, logout} = useAuth();
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState('');
    const [mobileOpen, setMobileOpen] = useState(false);

    // Mock data
    useEffect(() => {
        const mockTask = [
            {id: 1, title: 'Projeto React', Status: 'To Do'},
            {id: 2, title: 'Configurar  API', Status: 'To Do'}
        ];

        setTasks(mockTask);
    }, []);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen)
    };

    const handleAddTask = () => {
        if(newTask.trim()) {
            setTasks([...tasks, { id: Date.now(), title: newTask, status: 'To Do'}]);
            setNewTask('');
        }
    };

    const drawer = (
        <div>
            <Toolbar />
                <List>
                    <ListItem button>
                        <ListItemIcon>
                            <DashboardIcon />
                        </ListItemIcon>
                            <ListItemText primary="Dashboard"/>
                    </ListItem>
                </List>

        </div>
    );

    return (
        <Box sx={{ display: 'flex'}}>
            <CssBaseline />

            {/*AppBar*/}

            <AppBar
                position="fixed"
                sx={{width: { sm: `calc(100% - ${drawerWidth}px)`}, ml: { sm: `${drawerWidth}px`}}}
            >

                <Toolbar>
                    <IconButton
                        color="inherit"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none'}}}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1}}>
                        Bem-vindo, { user?.name}
                    </Typography>
                </Toolbar>

            </AppBar>

        </Box>
    )

}

export default Dashboard