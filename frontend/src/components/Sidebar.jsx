import React from 'react';
import { Divider, Drawer, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { Dashboard, Task } from '@mui/icons-material';

const Sidebar = ({ width, mobileOpen, onClose}) => {
    return (
        <Drawer
            variant='temporay'
            open={mobileOpen}
            onClose={onClose}
            ModalProps={{keepMounted: true}}
            sx={{
                witdh: width, '& .MuiDrawer-paper': {width: width}
            }}
        >
            <List>
                <ListItem button>
                    <ListItemIcon>
                        <Dashboard />   
                    </ListItemIcon>
                    <ListItemText primary="Dashboard"/>
                </ListItem>

                <Divider/>

                <ListItem button>
                    <ListItemIcon>
                        <Task />
                    </ListItemIcon>
                    <ListItemText primary="Minhas Tarefas"/>
                </ListItem>
            </List>
        </Drawer>
    )
}

export default Sidebar;