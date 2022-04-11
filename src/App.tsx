import React, { useState } from 'react';
import { v1 } from 'uuid';
import './App.css';
import { TodoList, TaskType } from './TodoList';

export type FilterValuesType = "all" | "completed" | "active";

function App() {
    const todoListTitle: string = "What to";

    let [tasks, setTasks] = useState<Array<TaskType>>([
        { id: v1(), title: 'HTML', isDone: true },
        { id: v1(), title: 'HTML 2', isDone: false },
        { id: v1(), title: 'HTML 3', isDone: true },
        { id: v1(), title: 'HTML 4', isDone: true },
        { id: v1(), title: 'HTML 5', isDone: true },
    ]);
    let [filter, setFilter] = useState<FilterValuesType>('all');

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

    function changeFilter(value: FilterValuesType) {
        setFilter(value);
    }

    let tasksForTodoList = tasks;

    if(filter === 'completed') {
        tasksForTodoList = tasks.filter(t => t.isDone === true);  
    }

    if(filter === 'active') {
        tasksForTodoList = tasks.filter(t => t.isDone === false);  
    }

    return (
        <div className="App">
            <TodoList
                title={todoListTitle}
                tasks={tasksForTodoList}
                removeTask={removeTask}
                changeFilter={changeFilter}
                addTask={addTask}
            />
        </div>
    );
}

export default App;