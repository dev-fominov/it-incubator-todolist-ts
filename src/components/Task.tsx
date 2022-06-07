import React, { ChangeEvent, useCallback } from "react";
import { Button, Checkbox } from "@mui/material";
import { EditableSpan } from "./EditableSpan";
import { DeleteForever } from "@mui/icons-material";
import { TaskType } from "../TodoList";

type PropsTaskType = {
	removeTask: (todolistID: string, taskId: string) => void
	changeStatus: (todolistID: string, taskId: string, isDone: boolean) => void
	changeTaskTitle: (todolistID: string, taskId: string, newValue: string) => void
	task: TaskType
	todolistID: string
}

export const Task = React.memo((props:PropsTaskType) => {

	const onChangeStatusHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
		props.changeStatus(props.todolistID, props.task.id, e.currentTarget.checked);
	}, [props.changeStatus, props.todolistID, props.task.id])

	const onChangeTitleHandler = useCallback((newValue: string) => {
		props.changeTaskTitle(props.todolistID, props.task.id, newValue);
	}, [])

	const removeTaskHandler = useCallback(() => { 
		props.removeTask(props.todolistID, props.task.id) 
	}, [])

	return (
		<div key={props.task.id}>
			<Checkbox
				onChange={onChangeStatusHandler}
				checked={props.task.isDone}
				color="secondary"
			/>
			<EditableSpan title={props.task.title} onChange={onChangeTitleHandler} />
			<Button onClick={removeTaskHandler}>
				<DeleteForever />
			</Button>
		</div>
	)
})