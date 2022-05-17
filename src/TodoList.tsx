import { Delete, DeleteForever } from "@mui/icons-material";
import { Button, Checkbox } from "@mui/material";
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
	onChangeTodolistTitle: (todolistID: string, newTitle: string) => void
	changeStatus: (todolistID: string, taskId: string, isDone: boolean) => void
	changeTaskTitle: (todolistID: string, taskId: string, newValue: string) => void
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

	const removeTodolist = () => props.removeTodolistHandler(props.todolistID)
	const onChangeTitle = (newTitle: string) => props.onChangeTodolistTitle(props.todolistID, newTitle)

	return (
		<div>
			<h3>
				<EditableSpan title={props.title} onChange={onChangeTitle} />
				<Button onClick={removeTodolist}>
					<DeleteForever />
				</Button>
			</h3>
			<FullInput callBack={addTaskHandler} />
			<div>
				{
					props.tasks.map((t) => {

						const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
							props.changeStatus(props.todolistID, t.id, e.currentTarget.checked);
						}

						const onChangeTitleHandler = (newValue: string) => {
							props.changeTaskTitle( props.todolistID, t.id, newValue );
						}

						return <div key={t.id}>
							<Checkbox
								onChange={onChangeStatusHandler}
								checked={t.isDone}
								color="secondary"
							/>
							<EditableSpan title={t.title} onChange={onChangeTitleHandler} />
							<Button onClick={() => { props.removeTask(props.todolistID, t.id) }}>
								<DeleteForever />
							</Button>
						</div>
					})
				}
			</div>
			<div>
				<Button variant={props.filter === 'all' ? "contained" : "outlined"} onClick={() => { props.changeFilter(props.todolistID, "all") }}>All</Button>
				<Button variant={props.filter === 'active' ? "contained" : "outlined"} onClick={() => { props.changeFilter(props.todolistID, "active") }}>Active</Button>
				<Button variant={props.filter === 'completed' ? "contained" : "outlined"} onClick={() => { props.changeFilter(props.todolistID, "completed") }}>Completed</Button>
			</div>
		</div>
	)


}