import { DeleteForever } from "@mui/icons-material";
import { Button } from "@mui/material";
import React, { useCallback, useEffect } from "react";
import { TaskStatuses, TaskType } from "../api/todolists-api";
import { useAppDispatch } from "../app/hooks";
import { EditableSpan } from "./EditableSpan";
import { Task } from "./Task";
import { fetchTasksTC } from "../reducers/tasks-reducer";
import { FilterValuesType, TodolistDomainType } from "../reducers/todolists-reducer";
import FullInput from "./FullInput";

type TodoListPropsType = {
	todolist: TodolistDomainType
	tasks: TaskType[]
	removeTask: (todolistID: string, taskId: string) => void
	changeFilter: (todolistID: string, value: FilterValuesType) => void
	addTask: (todolistID: string, title: string) => void
	onChangeTodolistTitle: (todolistID: string, newTitle: string) => void
	changeStatus: (todolistID: string, taskId: string, status: TaskStatuses) => void
	changeTaskTitle: (todolistID: string, taskId: string, newValue: string) => void
	removeTodolistHandler: (todolistID: string) => void
	demo?: boolean
}

export const TodoList = React.memo(({ demo = false, ...props }: TodoListPropsType) => {

	const dispatch = useAppDispatch()

	useEffect(() => {
		if (!demo) {
			dispatch(fetchTasksTC(props.todolist.id))
		}
	}, [dispatch, props.todolist.id, demo])

	const addTaskHandler = useCallback((newTitle: string) => props.addTask(props.todolist.id, newTitle), [props.addTask, props.todolist.id])
	const removeTodolist = useCallback(() => props.removeTodolistHandler(props.todolist.id), [props.removeTodolistHandler, props.todolist.id])
	const onChangeTitle = useCallback((newTitle: string) => props.onChangeTodolistTitle(props.todolist.id, newTitle), [props.onChangeTodolistTitle, props.todolist.id])
	const onAllClickHandler = useCallback(() => props.changeFilter(props.todolist.id, "all"), [props.changeFilter, props.todolist.id])
	const onActiveClickHandler = useCallback(() => props.changeFilter(props.todolist.id, "active"), [props.changeFilter, props.todolist.id])
	const onCompletedClickHandler = useCallback(() => props.changeFilter(props.todolist.id, "completed"), [props.changeFilter, props.todolist.id])

	let tasksForTodoList = props.tasks;
	if (props.todolist.filter === 'completed') {
		tasksForTodoList = props.tasks.filter(t => t.status === TaskStatuses.Completed);
	}
	if (props.todolist.filter === 'active') {
		tasksForTodoList = props.tasks.filter(t => t.status === TaskStatuses.New);
	}
	return (
		<div>
			<h3>
				<EditableSpan title={props.todolist.title} onChange={onChangeTitle} />
				<Button onClick={removeTodolist} disabled={props.todolist.entityStatus === 'loading'}>
					<DeleteForever />
				</Button>
			</h3>
			<FullInput callBack={addTaskHandler} disabled={props.todolist.entityStatus === 'loading'} />
			<div>
				{
					tasksForTodoList.map((t) => {
						return <Task
							key={t.id}
							task={t}
							changeStatus={props.changeStatus}
							changeTaskTitle={props.changeTaskTitle}
							removeTask={props.removeTask}
							todolistID={props.todolist.id}
						/>
					})
				}
			</div>
			<div>
				<Button
					variant={props.todolist.filter === 'all' ? "contained" : "outlined"}
					onClick={onAllClickHandler}>All</Button>
				<Button
					variant={props.todolist.filter === 'active' ? "contained" : "outlined"}
					onClick={onActiveClickHandler}>Active</Button>
				<Button
					variant={props.todolist.filter === 'completed' ? "contained" : "outlined"}
					onClick={onCompletedClickHandler}>Completed</Button>
			</div>
		</div>
	)
});