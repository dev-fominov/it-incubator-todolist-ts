// import { AddBox } from "@mui/icons-material";
import { Button, TextField } from "@mui/material";
import React, { ChangeEvent, KeyboardEvent, useState } from "react";

export type FullInputType = {
	callBack: (newTitle: string) => void
	disabled?: boolean
}

export const FullInput = React.memo(({callBack, disabled = false}: FullInputType) => {
	const [newTaskTitle, setNewTaskTitle] = useState("");
	const [error, setError] = useState<string | null>(null);
	const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
		setNewTaskTitle(e.currentTarget.value)
	}
	const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
		setError(null)
		if (e.charCode === 13) {
			callBack(newTaskTitle);
			setNewTaskTitle("");
		}
	}
	const addTaskHandler = () => {
		if (newTaskTitle.trim() === '') {
			setError("Title is required")
			return
		}
		callBack(newTaskTitle.trim());
		setNewTaskTitle("");
	}
	return (
		<div>
			<TextField
				value={newTaskTitle}
				onChange={onNewTitleChangeHandler}
				onKeyPress={onKeyPressHandler}
				error={!!error}
				helperText={error}
				variant="outlined"
				disabled={disabled}
			/>
			<Button onClick={addTaskHandler} variant="contained" disabled={disabled} > + </Button>
		</div>
	)

});

export default FullInput