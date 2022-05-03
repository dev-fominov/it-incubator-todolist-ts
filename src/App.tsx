import React, { useState } from 'react';
import { v1 } from 'uuid';
import './App.css';
import FullInput from './FullInput';
import { TodoList } from './TodoList';

export type FilterValuesType = "all" | "completed" | "active";
export type TodolistsType = {
    id: string
    title: string
    filter: FilterValuesType
}

function App() {

    let todolistID1 = v1();
    let todolistID2 = v1();

    let [todolists, setTodolists] = useState<Array<TodolistsType>>([
        { id: todolistID1, title: 'What to learn', filter: 'all' },
        { id: todolistID2, title: 'What to buy', filter: 'all' },
    ])

    let [tasks, setTasks] = useState({
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
        setTasks({ ...tasks, [todolistID]: tasks[todolistID].filter(t => t.id !== taskId) })
    }
    const removeTodolistHandler = (todolistID: string) => {
        setTodolists(todolists.filter(t => t.id !== todolistID))
    }

    function addTask(todolistID: string, title: string) {
        let newTask = { id: v1(), title: title, isDone: false };
        setTasks({ ...tasks, [todolistID]: [newTask, ...tasks[todolistID]] })
    }

    function changeStatus(todolistID: string, taskId: string, isDone: boolean) {
        setTasks({ ...tasks, [todolistID]: tasks[todolistID].map(el => el.id === taskId ? { ...el, isDone } : el) })
    }

    function changeFilter(todolistID: string, value: FilterValuesType) {
        setTodolists(todolists.map(el => el.id === todolistID ? { ...el, filter: value } : el))
    }

    const addTodoList = (newTitle: string) => {
        let newID = v1()
        let newTodolist: TodolistsType = { id: newID, title: newTitle, filter: 'all' }
        setTodolists([...todolists, newTodolist])
        setTasks({ ...tasks, [newID]: [] })
    }

    return (
        <div className="App">
            <FullInput callBack={addTodoList} />
            {
                todolists.map((t: TodolistsType) => {
                    let tasksForTodoList = tasks[t.id];
                    if (t.filter === 'completed') {
                        tasksForTodoList = tasks[t.id].filter(t => t.isDone === true);
                    }

                    if (t.filter === 'active') {
                        tasksForTodoList = tasks[t.id].filter(t => t.isDone === false);
                    }

                    return (
                        <TodoList
                            key={t.id}
                            todolistID={t.id}
                            title={t.title}
                            tasks={tasksForTodoList}
                            removeTask={removeTask}
                            changeFilter={changeFilter}
                            addTask={addTask}
                            changeStatus={changeStatus}
                            filter={t.filter}
                            removeTodolistHandler={removeTodolistHandler}
                        />
                    )
                })
            }
        </div>
    );
}

export default App;