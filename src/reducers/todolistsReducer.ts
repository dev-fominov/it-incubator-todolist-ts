import { todolistsType } from './../api/todolists-api';
import { v1 } from "uuid";

export let todolistID1 = v1();
export let todolistID2 = v1();

let initialState: Array<TodolistDomainType> = []

export type FilterValuesType = "all" | "completed" | "active";
export type TodolistDomainType = todolistsType & {
	filter: FilterValuesType
}
export type initialStateType = typeof initialState

export const todolistsReducer = (state: initialStateType = initialState, action: todolistsReduserType): initialStateType => {
	switch (action.type) {
		case 'REMOVE_TODOLIST_HANDLER': {
			return state.filter(t => t.id !== action.payload.todolistID)
		}
		case 'ADD_TODOLIST': {
			let newTodolist: TodolistDomainType = { id: action.payload.newId, addedDate: '', order: 0, title: action.payload.newTitle, filter: 'all' }
			return [...state, newTodolist]
		}
		case 'CHANGE_FILTER': {
			return state.map(el => el.id === action.payload.todolistID ? { ...el, filter: action.payload.value } : el)
		}
		case 'ON_CHANGE_TODOLIST_TITLE': {
			return state.map(el => el.id === action.payload.todolistID ? { ...el, title: action.payload.newTitle } : el)
		}
		default: return state
	}
}

type todolistsReduserType = removeTodolistHandlerACType | addTodoListACType | changeFilterACType | onChangeTodolistTitleACType

type removeTodolistHandlerACType = ReturnType<typeof removeTodolistHandlerAC>
export const removeTodolistHandlerAC = (todolistID: string) => {
	return {
		type: "REMOVE_TODOLIST_HANDLER",
		payload: { todolistID }
	} as const
}

type addTodoListACType = ReturnType<typeof addTodoListAC>
export const addTodoListAC = (newId: string, newTitle: string) => {
	return {
		type: "ADD_TODOLIST",
		payload: { newId, newTitle }
	} as const
}

type changeFilterACType = ReturnType<typeof changeFilterAC>
export const changeFilterAC = (todolistID: string, value: FilterValuesType) => {
	return {
		type: "CHANGE_FILTER",
		payload: { todolistID, value }
	} as const
}

type onChangeTodolistTitleACType = ReturnType<typeof onChangeTodolistTitleAC>
export const onChangeTodolistTitleAC = (todolistID: string, newTitle: string) => {
	return {
		type: "ON_CHANGE_TODOLIST_TITLE",
		payload: { todolistID, newTitle }
	} as const
}
