import React, { ChangeEvent, useState } from "react";

type EditableSpanType = {
	title: string
	onChange: (newValue: string)=>void
}

function EditableSpan(props: EditableSpanType) {

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
		? <input value={title} onBlur={activateView} autoFocus onChange={onChangeTitleHandler} /> 
		: <span onDoubleClick={activateEdit}>{props.title}</span>
	)
}

export default EditableSpan