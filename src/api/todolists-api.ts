import axios from "axios"

const instance = axios.create({
	withCredentials: true,
	baseURL: 'https://social-network.samuraijs.com/api/1.1/',
	headers: {
		"API-KEY": '1449fb6f-a118-46bc-8b11-af0716488d9c'
	}
})

type todolistsType = {
	id: string
	addedDate: string
	order: number
	title: string
}

type ResponseType<D = {}> = {
	resultCode: number
	messages: string[]
	data: D
}

export type TaskType = {
	description: string
	title: string
	status: number
	priority: number
	startDate: string
	deadline: string
	id: string
	todoListId: string
	order: number
	addedDate: string
}

type UpdateTaskModelType = {
	description: string
	title: string
	status: number
	priority: number
	startDate: string
	deadline: string
}

type getTasksResponseType = {
	error: string | null
	totalCount: number
	items: TaskType[]
}

export const todolistsAPI = {
	getTodolists() {
		return instance.get<todolistsType[]>(`todo-lists`)
	},
	createTodolist(title: string) {
		return instance.post<ResponseType<{ item: todolistsType }>>(`todo-lists`, { title })
	},
	deleteTodolist(id: string) {
		return instance.delete<ResponseType>(`todo-lists/${id}`)
	},
	updateTodolist(id: string, title: string) {
		return instance.put<ResponseType>(`todo-lists/${id}`, { title })
	},
	getTasks(todolistId: string) {
		return instance.get<getTasksResponseType>(`todo-lists/${todolistId}/tasks`)
	},
	deleteTasks(todolistId: string, taskId: string) {
		return instance.delete<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`)
	},
	updateTask(todolistId: string, taskId: string, model: UpdateTaskModelType) {
		return instance.put<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`, model )
	},
	createTask(todolistId: string, taskTitle: string) {
		return instance.post<ResponseType<{ data: TaskType }>>(`todo-lists/${todolistId}/tasks`, { title: taskTitle })
	},
}