import { handleServerAppErrors, handleServerNetworkError } from '../app/error-utils';
import { v1 } from "uuid";
import { addTodoListACType, removeTodolistHandlerACType, setTodolistsACType, todolistID1, todolistID2 } from "./todolists-reducer";
import { TaskPriorities, TaskStatuses, TaskType, todolistsAPI, UpdateTaskModelType } from '../api/todolists-api';
import { AppThunk, RootState } from './store';
import { setAppStatusAC } from '../app/app-reducer';
import { TasksType } from '../components/TodolistsList';

let initialState = {
	[todolistID1]: [
		{ id: v1(), title: "HTML&CSS", status: TaskStatuses.Completed, todoListId: todolistID1, startDate: '', addedDate: '', deadline: '', description: '', order: 0, priority: TaskPriorities.Low },
		{ id: v1(), title: "JS", status: TaskStatuses.Completed, todoListId: todolistID1, startDate: '', addedDate: '', deadline: '', description: '', order: 0, priority: TaskPriorities.Low },
		{ id: v1(), title: "ReactJS", status: TaskStatuses.Completed, todoListId: todolistID1, startDate: '', addedDate: '', deadline: '', description: '', order: 0, priority: TaskPriorities.Low },
		{ id: v1(), title: "Rest API", status: TaskStatuses.New, todoListId: todolistID1, startDate: '', addedDate: '', deadline: '', description: '', order: 0, priority: TaskPriorities.Low },
		{ id: v1(), title: "GraphQL", status: TaskStatuses.New, todoListId: todolistID1, startDate: '', addedDate: '', deadline: '', description: '', order: 0, priority: TaskPriorities.Low },
	],
	[todolistID2]: [
		{ id: v1(), title: "HTML&CSS2", status: TaskStatuses.Completed, todoListId: todolistID2, startDate: '', addedDate: '', deadline: '', description: '', order: 0, priority: TaskPriorities.Low },
		{ id: v1(), title: "JS2", status: TaskStatuses.New, todoListId: todolistID2, startDate: '', addedDate: '', deadline: '', description: '', order: 0, priority: TaskPriorities.Low },
		{ id: v1(), title: "ReactJS2", status: TaskStatuses.Completed, todoListId: todolistID2, startDate: '', addedDate: '', deadline: '', description: '', order: 0, priority: TaskPriorities.Low },
		{ id: v1(), title: "Rest API2", status: TaskStatuses.New, todoListId: todolistID2, startDate: '', addedDate: '', deadline: '', description: '', order: 0, priority: TaskPriorities.Low },
		{ id: v1(), title: "GraphQL2", status: TaskStatuses.Completed, todoListId: todolistID2, startDate: '', addedDate: '', deadline: '', description: '', order: 0, priority: TaskPriorities.Low },
	]
} as TasksType

export const tasksReducer = (state: initialStateType = initialState, action: tasksReduserType): initialStateType => {
	switch (action.type) {
		case 'REMOVE_TASK':
			return { ...state, [action.todolistID]: state[action.todolistID].filter(t => t.id !== action.taskId) }
		case 'ADD_TASK':
			return { ...state, [action.task.todoListId]: [action.task, ...state[action.task.todoListId]] }
		case 'UPDATE_TASK':
			return { ...state, [action.todolistID]: state[action.todolistID].map(el => el.id === action.taskId ? { ...el, ...action.model } : el) }
		case 'ADD_TODOLIST':
			return { ...state, [action.todolist.id]: [] }
		case 'REMOVE_TODOLIST': {
			const copyState = { ...state }
			delete copyState[action.todolistId]
			return copyState
		}
		case 'SET_TODOLISTS': {
			const copyState = { ...state }
			action.todolists.forEach(tl => copyState[tl.id] = [])
			return copyState
		}
		case 'SET_TASKS':
			return { ...state, [action.todolistId]: action.tasks }
		default: return state
	}
}

export const removeTaskAC = (todolistID: string, taskId: string) =>
	({ type: "REMOVE_TASK", todolistID, taskId } as const)
export const addTaskAC = (task: TaskType) =>
	({ type: "ADD_TASK", task } as const)
export const updateTaskAC = (todolistID: string, taskId: string, model: UpdateDomainTaskModelType) =>
	({ type: "UPDATE_TASK", todolistID, taskId, model } as const)
export const setTasksAC = (tasks: TaskType[], todolistId: string) =>
	({ type: "SET_TASKS", tasks, todolistId } as const)

export const fetchTasksTC = (todolistId: string): AppThunk => (dispatch) => {
	dispatch(setAppStatusAC('loading'))
	todolistsAPI.getTasks(todolistId)
		.then((res) => {
			dispatch(setTasksAC(res.data.items, todolistId))
			dispatch(setAppStatusAC('succeeded'))
		})
}
export const removeTaskTC = (todolistId: string, taskId: string): AppThunk => (dispatch) => {
	todolistsAPI.deleteTasks(todolistId, taskId)
		.then((res) => {
			dispatch(removeTaskAC(todolistId, taskId))
		})
}
export const addTaskTC = (todolistId: string, title: string): AppThunk => (dispatch) => {
	dispatch(setAppStatusAC('loading'))
	todolistsAPI.createTask(todolistId, title)
		.then((res) => {
			if (res.data.resultCode === 0) {
				dispatch(addTaskAC(res.data.data.item))
				dispatch(setAppStatusAC('succeeded'))
			} else {
				handleServerAppErrors(res.data, dispatch)
			}
		})
		.catch((error) => {
			handleServerNetworkError(error, dispatch)
		})
}

export const updateTaskTC = (todolistId: string, taskId: string, domainModel: UpdateDomainTaskModelType): AppThunk => (dispatch, getState: () => RootState) => {

	const state = getState()
	const task = state.tasks[todolistId].find(t => t.id === taskId)

	if (!task) {
		console.warn("Task not found in the state")
		return
	}

	const apiModel: UpdateTaskModelType = {
		deadline: task.deadline,
		description: task.description,
		priority: task.priority,
		startDate: task.startDate,
		title: task.title,
		status: task.status,
		...domainModel
	}
	todolistsAPI.updateTask(todolistId, taskId, apiModel)
		.then((res) => {
			res.data.resultCode === 0 ? dispatch(updateTaskAC(todolistId, taskId, domainModel)) : handleServerAppErrors(res.data, dispatch)
		})
		.catch((error) => {
			handleServerNetworkError(error, dispatch)
		})
}

export type initialStateType = typeof initialState

export type tasksReduserType =
	| ReturnType<typeof removeTaskAC>
	| ReturnType<typeof addTaskAC>
	| ReturnType<typeof updateTaskAC>
	| setTodolistsACType
	| ReturnType<typeof setTasksAC>
	| addTodoListACType
	| removeTodolistHandlerACType

type UpdateDomainTaskModelType = {
	description?: string
	title?: string
	status?: TaskStatuses
	priority?: number
	startDate?: string
	deadline?: string
}