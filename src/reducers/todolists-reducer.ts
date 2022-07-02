import { todolistsAPI, todolistsType } from '../api/todolists-api';
import { v1 } from "uuid";
import { AppThunk } from './store';
import { RequestStatusType, setAppStatusAC } from '../app/app-reducer';

export let todolistID1 = v1();
export let todolistID2 = v1();

let initialState: Array<TodolistDomainType> = []

export const todolistsReducer = (state: initialStateType = initialState, action: todolistsReduserType): initialStateType => {
	switch (action.type) {
		case 'REMOVE_TODOLIST':
			return state.filter(t => t.id !== action.todolistId)
		case 'ADD_TODOLIST':
			return [...state, { ...action.todolist, filter: 'all', entityStatus: 'idle' }]
		case 'CHANGE_FILTER':
			return state.map(el => el.id === action.todolistId ? { ...el, filter: action.value } : el)
		case 'ON_CHANGE_TODOLIST_TITLE':
			return state.map(el => el.id === action.todolistId ? { ...el, title: action.newTitle } : el)
		case 'CHANGE_TODOLIST_ENTITY_STATUS':
			return state.map(el => el.id === action.todolistId ? { ...el, entityStatus: action.status } : el)
		case 'SET_TODOLISTS':
			return action.todolists.map(tl => ({ ...tl, filter: 'all', entityStatus: 'idle' }))
		default: return state
	}
}

export const removeTodolistHandlerAC = (todolistId: string) =>
	({ type: "REMOVE_TODOLIST", todolistId } as const)
export const addTodoListAC = (todolist: todolistsType) => ({ type: "ADD_TODOLIST", todolist }) as const
export const changeFilterAC = (todolistId: string, value: FilterValuesType) =>
	({ type: "CHANGE_FILTER", todolistId, value } as const)
export const onChangeTodolistTitleAC = (todolistId: string, newTitle: string) =>
	({ type: "ON_CHANGE_TODOLIST_TITLE", todolistId, newTitle } as const)
export const changeTodolistEntityStatusAC = (todolistId: string, status: RequestStatusType) =>
	({ type: "CHANGE_TODOLIST_ENTITY_STATUS", todolistId, status } as const)
export const setTodolistsAC = (todolists: Array<todolistsType>) => ({ type: "SET_TODOLISTS", todolists } as const)

export const fetchTodolistsTC = (): AppThunk => (dispatch) => {
	dispatch(setAppStatusAC('loading'))
	todolistsAPI.getTodolists()
		.then((res) => {
			dispatch(setTodolistsAC(res.data))
			dispatch(setAppStatusAC('succeeded'))
		})
}
export const removeTodolistTC = (todolistId: string): AppThunk => (dispatch) => {
	dispatch(setAppStatusAC('loading'))
	dispatch(changeTodolistEntityStatusAC(todolistId, 'loading'))
	todolistsAPI.deleteTodolist(todolistId)
		.then((res) => {
			dispatch(removeTodolistHandlerAC(todolistId))
			dispatch(setAppStatusAC('succeeded'))
		})
}
export const addTodolistTC = (title: string): AppThunk => (dispatch) => {
	dispatch(setAppStatusAC('loading'))
	todolistsAPI.createTodolist(title)
		.then((res) => {
			dispatch(addTodoListAC(res.data.data.item))
			dispatch(setAppStatusAC('succeeded'))
		})
}
export const onChangeTodolistTitleTC = (todolistId: string, newTitle: string): AppThunk => (dispatch) => {
	todolistsAPI.updateTodolist(todolistId, newTitle)
		.then((res) => {
			dispatch(onChangeTodolistTitleAC(todolistId, newTitle))
		})
}


export type FilterValuesType = "all" | "completed" | "active";
export type TodolistDomainType = todolistsType & {
	filter: FilterValuesType
	entityStatus: RequestStatusType
}
export type initialStateType = typeof initialState

export type todolistsReduserType =
	| removeTodolistHandlerACType
	| addTodoListACType
	| ReturnType<typeof changeFilterAC>
	| ReturnType<typeof onChangeTodolistTitleAC>
	| setTodolistsACType
	| ReturnType<typeof changeTodolistEntityStatusAC>

export type setTodolistsACType = ReturnType<typeof setTodolistsAC>
export type addTodoListACType = ReturnType<typeof addTodoListAC>
export type removeTodolistHandlerACType = ReturnType<typeof removeTodolistHandlerAC>