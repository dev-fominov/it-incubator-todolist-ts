import { Menu } from '@mui/icons-material';
import { AppBar, Button, Grid, IconButton, Paper, Toolbar, Typography } from '@mui/material';
import { Container } from '@mui/system';
import React, { useReducer } from 'react';
import { v1 } from 'uuid';
import './App.css';
import FullInput from './FullInput';
import { addTaskAC, addTodoListTaskAC, changeStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer } from './reducers/tasksReducer';
import { addTodoListAC, changeFilterAC, onChangeTodolistTitleAC, removeTodolistHandlerAC, todolistsReducer } from './reducers/todolistsReducer';
import { TaskType, TodoList } from './TodoList';

export type FilterValuesType = "all" | "completed" | "active";
export type TodolistsType = {
    id: string
    title: string
    filter: FilterValuesType
}
export type ArrayTaskType = {
    tasks: TaskType[]
}

function App() {

    let todolistID1 = v1();
    let todolistID2 = v1();

    let [todolists, todolistsDispatch] = useReducer(todolistsReducer, [
        { id: todolistID1, title: 'What to learn', filter: 'all' },
        { id: todolistID2, title: 'What to buy', filter: 'all' },
    ])

    let [tasks, tasksDispatch] = useReducer(tasksReducer, {
        [todolistID1]: [
            { id: v1(), title: "HTML&CSS", isDone: true },
            { id: v1(), title: "JS", isDone: true },
            { id: v1(), title: "ReactJS", isDone: false },
            { id: v1(), title: "Rest API", isDone: false },
            { id: v1(), title: "GraphQL", isDone: false },
        ],
        [todolistID2]: [
            { id: v1(), title: "HTML&CSS2", isDone: true },
            { id: v1(), title: "JS2", isDone: true },
            { id: v1(), title: "ReactJS2", isDone: false },
            { id: v1(), title: "Rest API2", isDone: false },
            { id: v1(), title: "GraphQL2", isDone: false },
        ]
    });

    function removeTask(todolistID: string, taskId: string) {
        tasksDispatch(removeTaskAC(todolistID, taskId))
    }

    const removeTodolistHandler = (todolistID: string) => {
        todolistsDispatch(removeTodolistHandlerAC(todolistID))
    }

    function addTask(todolistID: string, title: string) {
        tasksDispatch(addTaskAC(todolistID, title))
    }

    function changeStatus(todolistID: string, taskId: string, isDone: boolean) {
        tasksDispatch(changeStatusAC(todolistID, taskId, isDone))
    }

    function changeTaskTitle(todolistID: string, taskId: string, newValue: string) {
        tasksDispatch(changeTaskTitleAC(todolistID, taskId, newValue))
    }

    function changeFilter(todolistID: string, value: FilterValuesType) {
        todolistsDispatch(changeFilterAC(todolistID, value))
    }

    const addTodoList = (newTitle: string) => {
        debugger
        let newID = v1();
        todolistsDispatch(addTodoListAC(newID, newTitle));
        tasksDispatch(addTodoListTaskAC(newID));
    }

    const onChangeTodolistTitle = (todolistID: string, newTitle: string) => {
        todolistsDispatch(onChangeTodolistTitleAC(todolistID, newTitle))
    }

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
                <Grid container style={{padding: '20px 0px'}}>
                    <FullInput callBack={addTodoList} />
                </Grid>
                <Grid container spacing={3}>
                    {
                        todolists.map((t: TodolistsType) => {
                            let tasksForTodoList = tasks[t.id];
                            if (t.filter === 'completed') {
                                tasksForTodoList = tasks[t.id].filter((t:any) => t.isDone === true);
                            }
                            if (t.filter === 'active') {
                                tasksForTodoList = tasks[t.id].filter((t:any) => t.isDone === false);
                            }

                            return (
                                <Grid item>
                                    <Paper style={{padding: '15px'}}>
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