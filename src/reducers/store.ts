import { combineReducers, createStore } from 'redux';

import {tasksReducer} from "./tasksReducer";
import {todolistsReducer} from "./todolistsReducer";

export const rootReducer = combineReducers({
	tasks: tasksReducer,
	todolists: todolistsReducer
});



export type AppStateType = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer);

// @ts-ignore
window.store = store