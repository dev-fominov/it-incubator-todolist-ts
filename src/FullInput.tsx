import { AddBox } from "@mui/icons-material";
import { Button, TextField } from "@mui/material";
import React, { ChangeEvent, KeyboardEvent, useState } from "react";

export type FullInputType = {
	callBack: (newTitle: string) => void
}

function FullInput(props: FullInputType) {

	const [newTaskTitle, setNewTaskTitle] = useState("");
	const [error, setError] = useState<string | null>(null);

	const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
		setNewTaskTitle(e.currentTarget.value)
	}

	const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
		setError(null)
		if (e.charCode === 13) {
			props.callBack(newTaskTitle);
			setNewTaskTitle("");
		}
	}

	const addTaskHandler = () => {
		if (newTaskTitle.trim() === '') {
			setError("Title is required")
			return
		}
		props.callBack(newTaskTitle.trim());
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
			/>
			<Button onClick={addTaskHandler} variant="contained" > + </Button>
		</div>
	)
}

export default FullInput