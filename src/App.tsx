import { Menu } from '@mui/icons-material';
import { AppBar, Button, Grid, IconButton, Paper, Toolbar, Typography } from '@mui/material';
import { Container } from '@mui/system';
import React, { useCallback } from 'react';
import './App.css';
import FullInput from './FullInput';
import { addTaskAC, addTodoListTaskAC, changeStatusAC, changeTaskTitleAC, removeTaskAC } from './reducers/tasksReducer';
import { addTodoListAC, changeFilterAC, onChangeTodolistTitleAC, removeTodolistHandlerAC } from './reducers/todolistsReducer';
import { TaskType, TodoList } from './TodoList';
import { useDispatch, useSelector } from 'react-redux';
import { AppStateType } from './reducers/store';
import { v1 } from 'uuid';

export type FilterValuesType = "all" | "completed" | "active";
export type TodolistsType = {
    id: string
    title: string
    filter: FilterValuesType
}
export type ArrayTaskType = {
    tasks: TaskType[]
}

export type TasksType = {
    [userID: string]: TaskType[]
}

function App() {

    const dispath = useDispatch();
    const tasks = useSelector<AppStateType, TasksType>(state => state.tasks)
    const todolists = useSelector<AppStateType, Array<TodolistsType>>(state => state.todolists)

    const removeTask = useCallback((todolistID: string, taskId: string) => {
        dispath(removeTaskAC(todolistID, taskId))
    }, [dispath])

    const removeTodolistHandler = useCallback((todolistID: string) => {
        dispath(removeTodolistHandlerAC(todolistID))
    }, [dispath])

    const addTask = useCallback((todolistID: string, title: string) => {
        dispath(addTaskAC(todolistID, title))
    }, [dispath])

    const changeStatus = useCallback((todolistID: string, taskId: string, isDone: boolean) => {
        dispath(changeStatusAC(todolistID, taskId, isDone))
    }, [dispath])

    const changeTaskTitle = useCallback((todolistID: string, taskId: string, newValue: string) => {
        dispath(changeTaskTitleAC(todolistID, taskId, newValue))
    }, [dispath])

    const changeFilter = useCallback((todolistID: string, value: FilterValuesType) => {
        dispath(changeFilterAC(todolistID, value))
    }, [dispath])

    const onChangeTodolistTitle = useCallback((todolistID: string, newTitle: string) => {
        dispath(onChangeTodolistTitleAC(todolistID, newTitle))
    }, [dispath])

    const addTodoList = useCallback((newTitle: string) => {
        let newID: string = v1();
        dispath(addTodoListAC(newID, newTitle));
        dispath(addTodoListTaskAC(newID));
    }, [dispath]);

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton>
                        <Menu />
                    </IconButton>
                    <Typography variant='h6'>
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{ padding: '20px 0px' }}>
                    <FullInput callBack={addTodoList} />
                </Grid>
                <Grid container spacing={3}>
                    {
                        todolists.map((t: TodolistsType) => {
                            let tasksForTodoList = tasks[t.id];

                            return (
                                <Grid item>
                                    <Paper style={{ padding: '15px' }}>
                                        <TodoList
                                            key={t.id}
                                            todolistID={t.id}
                                            title={t.title}
                                            tasks={tasksForTodoList}
                                            removeTask={removeTask}
                                            changeFilter={changeFilter}
                                            addTask={addTask}
                                            changeStatus={changeStatus}
                                            changeTaskTitle={changeTaskTitle}
                                            filter={t.filter}
                                            removeTodolistHandler={removeTodolistHandler}
                                            onChangeTodolistTitle={onChangeTodolistTitle}
                                        />
                                    </Paper>
                                </Grid>
                            )
                        })
                    }
                </Grid>

            </Container>


        </div>
    );
}

export default App;