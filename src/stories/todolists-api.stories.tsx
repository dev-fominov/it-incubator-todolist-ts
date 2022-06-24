import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { todolistsAPI } from '../api/todolists-api'

export default {
	title: 'API'
}

const setting = {
	withCredentials: true,
	headers: {
		"API-KEY": '1449fb6f-a118-46bc-8b11-af0716488d9c'
	}
}

export const GetTodolists = () => {
	const [state, setState] = useState<any>(null)
	useEffect(() => {
		todolistsAPI.getTodolists()
			.then((res) => {
				setState(res.data)
			})

	}, [])
	return <div>{JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
	const [state, setState] = useState<any>(null)
	useEffect(() => {
		todolistsAPI.createTodolist("Title string")
			.then((res) => {
				setState(res.data)
			})
	}, [])

	return <div>{JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
	const [state, setState] = useState<any>(null)
	useEffect(() => {
		const todolistId = '7107e368-8c19-4c49-98f6-86fbd9bfa2bd'
		todolistsAPI.deleteTodolist(todolistId)
			.then((res) => {
				setState(res.data)
			})
	}, [])

	return <div>{JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
	const [state, setState] = useState<any>(null)
	useEffect(() => {
		const todolistId = '32c394aa-1196-416e-9119-3401ee9a8582'
		const title = 'New title string'
		todolistsAPI.updateTodolist(todolistId, title)
			.then((res) => {
				setState(res.data)
			})
	}, [])

	return <div>{JSON.stringify(state)}</div>
}
export const GetTasks = () => {
	const [state, setState] = useState<any>(null)
	const [todolistId, setTodolistId] = useState<string>("")

	const getTask = () => {
		todolistsAPI.getTasks(todolistId)
			.then((res) => {
				setState(res.data.items)
			})
	}

	return <div>{JSON.stringify(state)}
		<div>
			<input
				placeholder={'todolistId'}
				value={todolistId}
				onChange={(e) => { setTodolistId(e.currentTarget.value) }} />

			<button onClick={getTask}>get Task</button>
		</div>
	</div>
}
export const DeleteTasks = () => {
	const [state, setState] = useState<any>(null)

	useEffect(() => {
		const todolistId = '32c394aa-1196-416e-9119-3401ee9a8582'
		const taskId = ''
		todolistsAPI.deleteTasks(todolistId, taskId)
			.then((res) => {
				setState(res.data)
			})

	}, [])
	return <div>{JSON.stringify(state)}</div>
}


// export const GetOzon = () => {
// 	const [state, setState] = useState<any>(null)

// 	const todolistId = '32c394aa-1196-416e-9119-3401ee9a8582'
// 	const title = 'New title string'

// 	useEffect(() => {
// 		todolistsAPI.getOzon()
// 			.then((res) => {
// 				setState(res.data)
// 			})

// 	}, [])
// 	return <div>{JSON.stringify(state)}</div>
// }

// export const PostToken = () => {
// 	const [state, setState] = useState<any>(null)

// 	const client_id = 'ApiTest_11111111-1111-1111-1111-111111111111'
// 	const client_secret = 'SRYksX3PBPUYj73A6cNqbQYRSaYNpjSodIMeWoSCQ8U='

// 	useEffect(() => {
// 		todolistsAPI.postToken(client_id, client_secret)
// 			.then((res) => {
// 				setState(res.data)
// 			})

// 	}, [])
// 	return <div>{JSON.stringify(state)}</div>
// }


export const UpdateTask = () => {
	const [state, setState] = useState<any>(null)
	const [title, setTitle] = useState<string>("")
	const [description, setDescription] = useState<string>("")
	const [status, setStatus] = useState<number>(0)
	const [priority, setPriority] = useState<number>(0)
	const [startDate, setStartDate] = useState<string>("")
	const [deadline, setDeadline] = useState<string>("")

	const [todolistId, setTodolistId] = useState<string>("")
	const [taskId, setTaskId] = useState<string>("")

	const updateTask = () => {
		todolistsAPI.updateTask(todolistId, taskId, { description, title, status, priority, startDate:'', deadline:'' })
			.then((res) => {
				setState(res.data)
			})
	}

	return <div>{JSON.stringify(state)}
		<div>
			<input placeholder={'todolistId'} value={todolistId} onChange={(e) => { setTodolistId(e.currentTarget.value) }} />
			<input placeholder={'taskId'} value={taskId} onChange={(e) => { setTaskId(e.currentTarget.value) }} />

			<input placeholder={'title'} value={title} onChange={(e) => { setTitle(e.currentTarget.value) }} />
			<input placeholder={'description'} value={description} onChange={(e) => { setDescription(e.currentTarget.value) }} />
			<input placeholder={'status'} value={status} onChange={(e) => { setStatus(+e.currentTarget.value) }} />
			<input placeholder={'priority'} value={priority} onChange={(e) => { setPriority(+e.currentTarget.value) }} />

			<button onClick={updateTask}>update Task</button>
		</div>
	</div>
}

export const CreateTask = () => {
	const [state, setState] = useState<any>(null)
	const [taskTitle, setTaskTitle] = useState<string>("")
	const [todolistId, setTodolistId] = useState<string>("")

	const createTask = () => {
		todolistsAPI.createTask(todolistId, taskTitle)
			.then((res) => {
				setState(res.data)
			})
	}

	return <div>{JSON.stringify(state)}
		<input
			placeholder={'todolistId'}
			value={todolistId}
			onChange={(e) => { setTodolistId(e.currentTarget.value) }} />
		<input
			placeholder={'taskTitle'}
			value={taskTitle}
			onChange={(e) => { setTaskTitle(e.currentTarget.value) }} />
		<button onClick={createTask}>create Task</button>
	</div>
}