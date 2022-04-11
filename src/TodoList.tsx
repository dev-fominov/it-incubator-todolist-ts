import React, { ChangeEvent, KeyboardEvent, useState } from "react";
import { FilterValuesType } from "./App";

type TodoListPropsType = {
	title: string
	tasks: TaskType[]
	removeTask: (id: string) => void
	changeFilter: (value: FilterValuesType) => void
	addTask: (title: string) => void
}

export type TaskType = {
	id: string
	title: string
	isDone: boolean
}

export const TodoList = (props: TodoListPropsType) => {
	const [newTaskTitle, setNewTaskTitle] = useState("");

	const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
		setNewTaskTitle(e.currentTarget.value)
	}

	const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
		if(e.charCode === 13) {
			props.addTask(newTaskTitle);
			setNewTaskTitle("");
		}
	}

	const addTask = () => {
		props.addTask(newTaskTitle);
		setNewTaskTitle("");
	}


	return (
		<div>
			<h3>{props.title}</h3>
			<div>
				<input 
					value={newTaskTitle} 
					onChange={onNewTitleChangeHandler} 
					onKeyPress={onKeyPressHandler} />
				<button onClick={addTask}>+</button>
			</div>
			<ul>
				{
					props.tasks.map((t) => {
						return <li key={t.id}>
							<input type="checkbox" checked={t.isDone} />
							<span>{t.title}</span>
							<button onClick={() => { props.removeTask(t.id) }}>x</button>
						</li>
					})
				}
			</ul>
			<div>
				<button onClick={() => { props.changeFilter("all") }}>All</button>
				<button onClick={() => { props.changeFilter("active") }}>Active</button>
				<button onClick={() => { props.changeFilter("completed") }}>Completed</button>
			</div>
		</div>
	)
}