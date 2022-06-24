import { DeleteForever } from "@mui/icons-material";
import { Button, Checkbox } from "@mui/material";
import React, { ChangeEvent, useCallback } from "react";
import { TaskStatuses, TaskType } from "./api/todolists-api";
// import { FilterValuesType } from "./App";
import {EditableSpan} from "./components/EditableSpan";
import { Task } from "./components/Task";
import FullInput from "./FullInput";
import { FilterValuesType } from "./reducers/todolistsReducer";

type TodoListPropsType = {
	todolistID: string
	title: string
	tasks: TaskType[]
	removeTask: (todolistID: string, taskId: string) => void
	changeFilter: (todolistID: string, value: FilterValuesType) => void
	addTask: (todolistID: string, title: string) => void
	onChangeTodolistTitle: (todolistID: string, newTitle: string) => void
	changeStatus: (todolistID: string, taskId: string, status: TaskStatuses) => void
	changeTaskTitle: (todolistID: string, taskId: string, newValue: string) => void
	removeTodolistHandler: (todolistID: string) => void
	filter: FilterValuesType
}

// export type TaskType = {
// 	id: string
// 	title: string
// 	isDone: boolean
// }

export const TodoList = React.memo((props: TodoListPropsType) => {

	const addTaskHandler = useCallback((newTitle: string) => props.addTask(props.todolistID, newTitle), [props.addTask, props.todolistID])

	const removeTodolist = useCallback(() => props.removeTodolistHandler(props.todolistID), [props.removeTodolistHandler, props.todolistID])
	const onChangeTitle = useCallback((newTitle: string) => props.onChangeTodolistTitle(props.todolistID, newTitle), [props.onChangeTodolistTitle, props.todolistID])

	const onAllClickHandler = useCallback(() => props.changeFilter(props.todolistID, "all"), [props.changeFilter, props.todolistID])
	const onActiveClickHandler = useCallback(() =>  props.changeFilter(props.todolistID, "active"), [props.changeFilter, props.todolistID])
	const onCompletedClickHandler = useCallback(() => props.changeFilter(props.todolistID, "completed"),[props.changeFilter, props.todolistID])

	let tasksForTodoList = props.tasks;
	if (props.filter === 'completed') {
		tasksForTodoList = props.tasks.filter(t => t.status === TaskStatuses.Completed);
	}
	if (props.filter === 'active') {
		tasksForTodoList = props.tasks.filter(t => t.status === TaskStatuses.New);
	}
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
					tasksForTodoList.map((t) => {
						return <Task 
							key={t.id}
							task={t}
							changeStatus={props.changeStatus}
							changeTaskTitle={props.changeTaskTitle}
							removeTask={props.removeTask}
							todolistID={props.todolistID}
						/>
					})
				}
			</div>
			<div>
				<Button 
					variant={props.filter === 'all' ? "contained" : "outlined"} 
					onClick={onAllClickHandler}>All</Button>
				<Button 
					variant={props.filter === 'active' ? "contained" : "outlined"} 
					onClick={onActiveClickHandler}>Active</Button>
				<Button 
					variant={props.filter === 'completed' ? "contained" : "outlined"} 
					onClick={onCompletedClickHandler}>Completed</Button>
			</div>
		</div>
	)
});