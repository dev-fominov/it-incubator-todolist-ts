import React, { ChangeEvent, KeyboardEvent, useState } from "react";
import { FilterValuesType } from "./App";

type TodoListPropsType = {
	todolistID: string
	title: string
	tasks: TaskType[]
	removeTask: (todolistID:string, taskId: string) => void
	changeFilter: (todolistID:string, value: FilterValuesType) => void
	addTask: (todolistID:string, title: string) => void
	changeStatus: (todolistID: string, taskId: string, isDone: boolean) => void
	removeTodolistHandler: (todolistID:string) => void
	filter: FilterValuesType
}

export type TaskType = {
	id: string
	title: string
	isDone: boolean
}

export const TodoList = (props: TodoListPropsType) => {
	const [newTaskTitle, setNewTaskTitle] = useState("");
	const [error, setError] = useState<string | null>(null);

	const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
		setNewTaskTitle(e.currentTarget.value)
	}

	const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
		setError(null)
		if (e.charCode === 13) {
			props.addTask(props.todolistID, newTaskTitle);
			setNewTaskTitle("");
		}
	}

	const addTask = () => {
		if (newTaskTitle.trim() === '') {
			setError("Title is required")
			return
		}
		props.addTask(props.todolistID, newTaskTitle.trim());
		setNewTaskTitle("");
	}

	

	return (
		<div>
			<h3>
				{props.title}
				<button onClick={()=>props.removeTodolistHandler(props.todolistID)}>x</button>
				</h3>
			<div>
				<input
					value={newTaskTitle}
					onChange={onNewTitleChangeHandler}
					onKeyPress={onKeyPressHandler}
					className={error ? "error" : ""}
				/>
				<button onClick={addTask}>+</button>
				{error && <div className="error-message">{error}</div>}
			</div>
			<ul>
				{
					props.tasks.map((t) => {


						const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
							props.changeStatus(props.todolistID, t.id, e.currentTarget.checked);
						}

						return <li key={t.id}>
							<input
								type="checkbox"
								onChange={onChangeHandler}
								checked={t.isDone}

							/>
							<span>{t.title}</span>
							<button onClick={() => { props.removeTask( props.todolistID, t.id) }}>x</button>
						</li>
					})
				}
			</ul>
			<div>
				<button className={props.filter === 'all' ? "active-filter" : ""} onClick={() => { props.changeFilter(props.todolistID, "all") }}>All</button>
				<button className={props.filter === 'active' ? "active-filter" : ""} onClick={() => { props.changeFilter(props.todolistID, "active") }}>Active</button>
				<button className={props.filter === 'completed' ? "active-filter" : ""} onClick={() => { props.changeFilter(props.todolistID, "completed") }}>Completed</button>
			</div>
		</div>
	)


}