import { TextField } from "@mui/material";
import React, { ChangeEvent, useState } from "react";

type EditableSpanType = {
	title: string
	onChange: (newValue: string)=>void
}

export const EditableSpan = ((props: EditableSpanType) => {

	let [edit, setEdit] = useState(false)
	let [title, setTitle] = useState("")

	const activateEdit = () => {
		setEdit(true)
		setTitle(props.title)
	} 
	const activateView = () => {
		setEdit(false)
		props.onChange(title)
	}

	const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
		setTitle(e.currentTarget.value)
	}

	return (
		edit 
		? <TextField value={title} variant="standard" onBlur={activateView} autoFocus onChange={onChangeTitleHandler} /> 
		: <span onDoubleClick={activateEdit}>{props.title}</span>
	)
	
})