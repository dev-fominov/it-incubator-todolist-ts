import React, { useState } from "react";

type EditableSpanType = {
	title: string
}

function EditableSpan(props: EditableSpanType) {

	let [edit, setEdit] = useState(false)

	return (
		edit ? <input value={props.title} /> : <span>{props.title}</span>
	)
}

export default EditableSpan