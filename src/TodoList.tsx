import React, { ChangeEvent } from "react";
import { FilterValuesType } from "./App";
import EditableSpan from "./components/EditableSpan";
import FullInput from "./FullInput";

type TodoListPropsType = {
	todolistID: string
	title: string
	tasks: TaskType[]
	removeTask: (todolistID: string, taskId: string) => void
	changeFilter: (todolistID: string, value: FilterValuesType) => void
	addTask: (todolistID: string, title: string) => void
	changeStatus: (todolistID: string, taskId: string, isDone: boolean) => void
	removeTodolistHandler: (todolistID: string) => void
	filter: FilterValuesType
}

export type TaskType = {
	id: string
	title: string
	isDone: boolean
}

export const TodoList = (props: TodoListPropsType) => {

	const addTaskHandler = (newTitle: string) => {
		props.addTask(props.todolistID, newTitle)
	}

	const onChangeTitleHandler = () => {
		// Code
	}

	return (
		<div>
			<h3>
				<EditableSpan title={props.title} onChange={onChangeTitleHandler} />
				<button onClick={() => props.removeTodolistHandler(props.todolistID)}>x</button>
			</h3>
			<FullInput callBack={addTaskHandler} />
			<ul>
				{
					props.tasks.map((t) => {

						const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
							props.changeStatus(props.todolistID, t.id, e.currentTarget.checked);
						}

						return <li key={t.id}>
							<input
								type="checkbox"
								onChange={onChangeStatusHandler}
								checked={t.isDone}

							/>
							<span>{t.title}</span>
							<button onClick={() => { props.removeTask(props.todolistID, t.id) }}>x</button>
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