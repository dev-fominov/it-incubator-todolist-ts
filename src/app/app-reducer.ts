import { authAPI } from "../api/todolists-api"
import { setIsLoggedInAC } from "../components/Login/login-reducer"
import { AppThunk } from "../reducers/store"

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

export type InitialStateType = {
	status: RequestStatusType
	error: string | null
	initialized: boolean
}

const initialState: InitialStateType = {
	status: 'idle',
	error: null,
	initialized: false
}

export const appReduser = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
	switch (action.type) {
		case 'APP/SET-STATUS':
			return { ...state, status: action.status }
		case 'APP/SET-ERROR':
			return { ...state, error: action.error }
		case 'APP/SET-IS-INITIALIZED':
			return { ...state, initialized: action.value }
		default:
			return { ...state }
	}
}

export type ActionsType = setAppErrorType | setAppStatusType | setAppInitializedType

type setAppErrorType = ReturnType<typeof setAppErrorAC>
export const setAppErrorAC = (error: string | null) => ({ type: 'APP/SET-ERROR', error } as const)

type setAppStatusType = ReturnType<typeof setAppStatusAC>
export const setAppStatusAC = (status: RequestStatusType) => ({ type: 'APP/SET-STATUS', status } as const)

type setAppInitializedType = ReturnType<typeof setAppInitializedAC>
export const setAppInitializedAC = (value: boolean) => ({ type: 'APP/SET-IS-INITIALIZED', value } as const)

export const initializeAppTC = (): AppThunk => (dispatch) => {
	authAPI.me()
		.then((res) => {
			if (res.data.resultCode === 0) {
				dispatch(setIsLoggedInAC(true))
			} else {

			}
			dispatch(setAppInitializedAC(true))
		})
} 