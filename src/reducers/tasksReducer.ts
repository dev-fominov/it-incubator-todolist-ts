import { TasksType } from './../App';
import { v1 } from "uuid";
import { todolistID1, todolistID2 } from "./todolistsReducer";
import { TaskPriorities, TaskStatuses, TaskType } from '../api/todolists-api';


let initialState = {
	[todolistID1]: [
		{ id: v1(), title: "HTML&CSS", status: TaskStatuses.Completed, todoListId: todolistID1, startDate: '', addedDate: '', deadline: '', description: '', order: 0, priority: TaskPriorities.Low },
		{ id: v1(), title: "JS", status: TaskStatuses.Completed, todoListId: todolistID1, startDate: '', addedDate: '', deadline: '', description: '', order: 0, priority: TaskPriorities.Low },
		{ id: v1(), title: "ReactJS", status: TaskStatuses.Completed, todoListId: todolistID1, startDate: '', addedDate: '', deadline: '', description: '', order: 0, priority: TaskPriorities.Low },
		{ id: v1(), title: "Rest API", status: TaskStatuses.New, todoListId: todolistID1, startDate: '', addedDate: '', deadline: '', description: '', order: 0, priority: TaskPriorities.Low },
		{ id: v1(), title: "GraphQL", status: TaskStatuses.New, todoListId: todolistID1, startDate: '', addedDate: '', deadline: '', description: '', order: 0, priority: TaskPriorities.Low },
	],
	[todolistID2]: [
		{ id: v1(), title: "HTML&CSS2", status: TaskStatuses.Completed, todoListId: todolistID2, startDate: '',  addedDate: '', deadline: '', description: '', order: 0, priority: TaskPriorities.Low },
		{ id: v1(), title: "JS2", status: TaskStatuses.New, todoListId: todolistID2, startDate: '', addedDate: '', deadline: '', description: '', order: 0, priority: TaskPriorities.Low },
		{ id: v1(), title: "ReactJS2", status: TaskStatuses.Completed, todoListId: todolistID2, startDate: '', addedDate: '', deadline: '', description: '', order: 0, priority: TaskPriorities.Low },
		{ id: v1(), title: "Rest API2", status: TaskStatuses.New, todoListId: todolistID2, startDate: '', addedDate: '', deadline: '', description: '', order: 0, priority: TaskPriorities.Low },
		{ id: v1(), title: "GraphQL2", status: TaskStatuses.Completed, todoListId: todolistID2, startDate: '', addedDate: '', deadline: '', description: '', order: 0, priority: TaskPriorities.Low },
	]
} as TasksType

export type initialStateType = typeof initialState

export const tasksReducer = (state: initialStateType = initialState, action: tasksReduserType): initialStateType => {
	switch (action.type) {
		case 'REMOVE_TASK': {
			return { ...state, [action.payload.todolistID]: state[action.payload.todolistID].filter(t => t.id !== action.payload.taskId) }
		}
		case 'ADD_TASK': {
			const newTask: TaskType = { 
				id: v1(), 
				title: action.payload.title, 
				status: TaskStatuses.New, 
				todoListId: action.payload.todolistID,
				startDate: '',  
				addedDate: '', 
				deadline: '', 
				description: '', 
				order: 0, 
				priority: TaskPriorities.Low 
			};
			return { ...state, [action.payload.todolistID]: [newTask, ...state[action.payload.todolistID]] }
		}
		case 'CHANGE_STATUS': {
			return {
				...state, 
				[action.payload.todolistID]: state[action.payload.todolistID].map(el => el.id === action.payload.taskId ? { ...el, status: action.payload.status } : el) }
		}
		case 'CHANGE_TASK_TITLE': {
			return { ...state, [action.payload.todolistID]: state[action.payload.todolistID].map(el => el.id === action.payload.taskId ? { ...el, title: action.payload.newValue } : el) }
		}
		case 'ADD_TODOLIST_TASK': {
			return { ...state, [action.payload.newId]: [] }
		}
		default: return state
	}
}


type tasksReduserType = removeTaskACType | addTaskACType | changeStatusACType | changeTaskTitleACType | addTodoListTaskACType

type removeTaskACType = ReturnType<typeof removeTaskAC>
export const removeTaskAC = (todolistID: string, taskId: string) => {
	return {
		type: "REMOVE_TASK",
		payload: { todolistID, taskId }
	} as const
}

type addTaskACType = ReturnType<typeof addTaskAC>
export const addTaskAC = (todolistID: string, title: string) => {
	return {
		type: "ADD_TASK",
		payload: { todolistID, title }
	} as const
}

type changeStatusACType = ReturnType<typeof changeStatusAC>
export const changeStatusAC = (todolistID: string, taskId: string, status: TaskStatuses) => {
	return {
		type: "CHANGE_STATUS",
		payload: { todolistID, taskId, status }
	} as const
}

type changeTaskTitleACType = ReturnType<typeof changeTaskTitleAC>
export const changeTaskTitleAC = (todolistID: string, taskId: string, newValue: string) => {
	return {
		type: "CHANGE_TASK_TITLE",
		payload: { todolistID, taskId, newValue }
	} as const
}

type addTodoListTaskACType = ReturnType<typeof addTodoListTaskAC>
export const addTodoListTaskAC = (newId: string) => {
	return {
		type: "ADD_TODOLIST_TASK",
		payload: { newId }
	} as const
}
