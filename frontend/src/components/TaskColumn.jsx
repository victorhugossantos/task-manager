import React, { useState } from "react";
import AddIcon from '@mui/icons-material/Add'
import { Button, Card, CardContent, Stack, TextField, Typography } from "@mui/material";

const TaskColumn = ({title, task, onAddTask, onTaskClick}) => {

    const [newTask, setNewTask] = useState();

    return (
        <Card sx={{ height: '100%' }}>
            <CardContent>
                <Typography variant="h6" gutterBottom>
                    {title}
                </Typography>
            

                {/* Lista de tarefas */}
                <Stack spacing={2} sx={{ mb: 2 }}>
                    <Card
                        key={task.id}
                        variant="outlined"
                        onClick={() => onTaskClick(task)}
                        sx={{ cursor: 'pointer'}}
                    >
                        <CardContent>
                            <Typography>
                                {task.title}
                            </Typography>
                        </CardContent>
                    </Card>
                </Stack>


                {/* Formulario para criação de nova tarefa */}
                <Stack direction="row" spacing={1}> 
                    <TextField 
                        fullWidth
                        size="small"
                        placeholder="Nova tarefa..."
                        value={newTask}
                        onChange={(e) => setNewTask(e.target.value)}
                    />
                    <Button 
                        variant="contained"
                        onClick={() => {
                            if(newTask.trim()) {
                                onAddTask(title, newTask);
                                setNewTask('');
                            }
                        }}
                    >
                        <AddIcon />
                    </Button>
                </Stack>
            </CardContent>
        </Card>
    )
}

export default TaskColumn;