import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { Box, CssBaseline, Grid, Toolbar, useMediaQuery, useTheme } from "@mui/material";
import api from "../api/api";
import Sidebar from "../components/Sidebar";
import TaskColumn from "../components/TaskColumn";

const Dashboard = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const [mobileOpen, setMobileOpen] = useState(false);
    const [tasks, setTasks] = useState({
        'To Do': [],
        'In Progress': [],
        'Done': []
    });

    // buscar tarefas no backend
    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await api.get('/tasks');
                const organizedTasks = organizedTasksByStatus(response.data) // chama a função para organizar as tarefas por status
                setTasks(organizedTasks)
            } catch (error) {
                console.error('Erro ao buscar tarefas: ', error)
            }
        };
        fetchTasks();
    }, [])

     // função para organizar as tarefas por status*
    const organizedTasksByStatus = (tasks) => {
        return tasks.reduce((acc, task) => {
            acc[task.status].push(task);
            return acc;
        }, { 'To Do': [], 'In Progress': [], 'Done': []})
    }

    // Adiciona tarefa no banco de dados via api
    const handleAddTask = async (status, title) => {
        try {
            const newTask = {title, status};
            const response = await api.post('/tasks', newTask);
            setTasks(prev => ({
                ...prev,
                [status]: [...prev[status], response.data]
            }));

        } catch (error){
            console.error('Erro ao criar a tarefa: ', error)
        }
    };

    return (
        <Box sx={{display: 'flex'}}>
            <CssBaseline />

            <Navbar onMenuClick={() => setMobileOpen(!mobileOpen)}/>

            <Sidebar width={240} mobileOpen={mobileOpen} onClose={() => setMobileOpen(false)}/>

            <Box>
                <Toolbar />
                
                <Grid container spacing={3}>
                    {Object.entries(tasks).map(([status, tasks]) => {
                        <Grid item xs={12} md={4} key={status}>
                            <TaskColumn 
                                title={status}
                                tasks={tasks}
                                onAddTask={handleAddTask}
                                onTaskClick={(task) => console.log('Tarefa clicada: ', task)}
                            />
                        </Grid>
                    })}
                </Grid>
            </Box>
        </Box>
    )
}

export default Dashboard;