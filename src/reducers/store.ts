import { AnyAction, applyMiddleware, combineReducers, legacy_createStore as createStore } from 'redux'
import thunkMiddleware, { ThunkAction, ThunkDispatch } from 'redux-thunk'
import { ActionsType, appReduser } from '../app/app-reducer';
import { loginReducer } from '../components/Login/login-reducer';
import { tasksReducer, tasksReduserType } from "./tasks-reducer"
import { todolistsReducer, todolistsReduserType } from "./todolists-reducer"

export const rootReducer = combineReducers({
	tasks: tasksReducer,
	todolists: todolistsReducer,
	app: appReduser,
	login: loginReducer
});

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

type AppActionsType = todolistsReduserType | tasksReduserType | ActionsType

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = ThunkDispatch<RootState, unknown, AppActionsType>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, AnyAction>


// @ts-ignore
window.store = store