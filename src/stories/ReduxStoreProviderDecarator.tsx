import React from 'react'
import { Provider } from 'react-redux'
import { applyMiddleware, combineReducers, legacy_createStore as createStore } from 'redux'
import { v1 } from 'uuid'
import { TaskPriorities, TaskStatuses } from '../api/todolists-api'
import { appReduser } from '../app/app-reducer'
import { RootState } from '../reducers/store'
import { tasksReducer } from '../reducers/tasks-reducer'
import { todolistsReducer } from '../reducers/todolists-reducer'
import thunkMiddleware from 'redux-thunk'


const rootReducer = combineReducers({
	tasks: tasksReducer,
	todolists: todolistsReducer,
	app: appReduser
})

const initialGlobalState: RootState = {
	todolists: [
		{ id: 'todolistId1', title: 'What to learn', filter: 'all', entityStatus: 'idle', addedDate: '', order: 0 },
		{ id: 'todolistId2', title: 'What to buy', filter: 'all', entityStatus: 'loading', addedDate: '', order: 0 }
	],
	tasks: {
		['todolistId1']: [
			{ id: v1(), title: 'HTML&CSS', status: TaskStatuses.Completed, todoListId: 'todolistId1', startDate: '', addedDate: '', deadline: '', description: '', order: 0, priority: TaskPriorities.Low },
			{ id: v1(), title: 'JS', status: TaskStatuses.Completed, todoListId: 'todolistId1', startDate: '', addedDate: '', deadline: '', description: '', order: 0, priority: TaskPriorities.Low }
		],
		['todolistId2']: [
			{ id: v1(), title: 'Milk', status: TaskStatuses.Completed, todoListId: 'todolistId2', startDate: '', addedDate: '', deadline: '', description: '', order: 0, priority: TaskPriorities.Low },
			{ id: v1(), title: 'React Book', status: TaskStatuses.Completed, todoListId: 'todolistId2', startDate: '', addedDate: '', deadline: '', description: '', order: 0, priority: TaskPriorities.Low }
		]
	},
	app: {
		error: null,
		status: 'idle',
		initialized: false
	},
	login: {
		isLoggedIn: false
	}
}

export const storyBookStore = createStore(rootReducer, initialGlobalState, applyMiddleware(thunkMiddleware))

export const ReduxStoreProviderDecorator = (storyFn: any) => (
	<Provider
		store={storyBookStore}>{storyFn()}
	</Provider>)