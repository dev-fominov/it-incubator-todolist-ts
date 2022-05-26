import { v1 } from "uuid";
import { FilterValuesType, TodolistsType } from "../App"

export let todolistID1 = v1();
export let todolistID2 = v1();

let initialState = [
	{ id: todolistID1, title: 'What to learn', filter: 'all' },
	{ id: todolistID2, title: 'What to buy', filter: 'all' },
] as TodolistsType[]

export type initialStateType = typeof initialState

export const todolistsReducer = (state: initialStateType = initialState, action: todolistsReduserType): initialStateType => {
	switch (action.type) {
		case 'REMOVE_TODOLIST_HANDLER': {
			return state.filter(t => t.id !== action.payload.todolistID)
		}
		case 'ADD_TODOLIST': {
			let newTodolist: TodolistsType = { id: action.payload.newId, title: action.payload.newTitle, filter: 'all' }
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
