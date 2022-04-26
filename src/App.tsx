import React, { useState } from 'react';
import { v1 } from 'uuid';
import './App.css';
import { TodoList, TaskType } from './TodoList';

export type FilterValuesType = "all" | "completed" | "active";
export type TodolistsType = {
    id: string
    title: string
    filter: FilterValuesType
}

function App() {

    let [todolists, setTodolists] = useState<Array<TodolistsType>>([
        { id: v1(), title: 'What to learn', filter: 'all' },
        { id: v1(), title: 'What to buy', filter: 'all' },
    ])

    // const todoListTitle: string = "What to";

    let [tasks, setTasks] = useState<Array<TaskType>>([
        { id: v1(), title: 'HTML', isDone: true },
        { id: v1(), title: 'HTML 2', isDone: false },
        { id: v1(), title: 'HTML 3', isDone: true },
        { id: v1(), title: 'HTML 4', isDone: true },
        { id: v1(), title: 'HTML 5', isDone: true },
    ]);
    // let [filter, setFilter] = useState<FilterValuesType>('all');

    function removeTask(id: string) {

        let filterTasks = tasks.filter(t => t.id !== id)
        setTasks(filterTasks)
        // debugger
    }

    function addTask(title: string) {
        let newTask = { id: v1(), title: title, isDone: false };
        let newTasks = [newTask, ...tasks];
        setTasks(newTasks);
    }

    function changeStatus(taskId: string, isDone: boolean) {
        let task = tasks.find(t => t.id === taskId)
        if (task) { task.isDone = isDone }
        let copy = [...tasks]
        setTasks(copy)
    }

    function changeFilter(todolistID:string, value: FilterValuesType) {
        setTodolists(todolists.map(el=> el.id === todolistID ? {...el, filter: value} : el ))
    }

    // let tasksForTodoList = tasks;
    // if (filter === 'completed') {
    //     tasksForTodoList = tasks.filter(t => t.isDone === true);
    // }

    // if (filter === 'active') {
    //     tasksForTodoList = tasks.filter(t => t.isDone === false);
    // }

    return (
        <div className="App">
            {
                todolists.map((t: TodolistsType) => {
                    let tasksForTodoList = tasks;
                    if (t.filter === 'completed') {
                        tasksForTodoList = tasks.filter(t => t.isDone === true);
                    }

                    if (t.filter === 'active') {
                        tasksForTodoList = tasks.filter(t => t.isDone === false);
                    }

                    return (
                        <TodoList
                            todolistID={t.id}
                            title={t.title}
                            tasks={tasksForTodoList}
                            removeTask={removeTask}
                            changeFilter={changeFilter}
                            addTask={addTask}
                            changeStatus={changeStatus}
                            filter={t.filter}
                        />
                    )
                })
            }


        </div>
    );
}

export default App;