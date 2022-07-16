import { authAPI, authAPIType } from "../../api/todolists-api"
import { setAppStatusAC } from "../../app/app-reducer"
import { handleServerAppErrors, handleServerNetworkError } from "../../app/error-utils"
import { AppThunk } from "../../reducers/store"

const initialState = {
	isLoggedIn: false
}
export type initialStateType = typeof initialState
export const loginReducer = (state: initialStateType = initialState, action: setIsLoggedInACType): initialStateType => {
	switch (action.type) {
		case 'login/SET-IS-LOGGED-IN':
			return { ...state, isLoggedIn: action.value }
		default: return state
	}
}

type setIsLoggedInACType = ReturnType<typeof setIsLoggedInAC>

export const setIsLoggedInAC = (value: boolean) => ({ type: 'login/SET-IS-LOGGED-IN', value } as const)

export const loginTC = (data: authAPIType): AppThunk => (dispatch) => {
	dispatch(setAppStatusAC('loading'))
	authAPI.login(data)
		.then((res) => {
			if (res.data.resultCode === 0) {
				dispatch(setIsLoggedInAC(true))
				dispatch(setAppStatusAC('succeeded'))
			} else {
				handleServerAppErrors(res.data, dispatch)
			}
		})
		.catch((error) => {
			handleServerNetworkError(error, dispatch)
		})
}

export const logoutTC = (): AppThunk => (dispatch) => {
	dispatch(setAppStatusAC('loading'))
	authAPI.logout()
		.then((res) => {
			if (res.data.resultCode === 0) {
				dispatch(setIsLoggedInAC(false))
				dispatch(setAppStatusAC('succeeded'))
			} else {
				handleServerAppErrors(res.data, dispatch)
			}
		})
		.catch((error) => {
			handleServerNetworkError(error, dispatch)
		})
}