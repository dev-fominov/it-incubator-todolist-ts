import { ResponseType } from "../api/todolists-api"
import { AppDispatch } from "../reducers/store"
import { setAppErrorAC, setAppStatusAC } from "./app-reducer"

export const handleServerAppErrors = <D>(data: ResponseType<D>, dispatch: AppDispatch) => {
	data.messages.length ? dispatch(setAppErrorAC(data.messages[0])) : dispatch(setAppErrorAC('Some errror occurred'))
	dispatch(setAppStatusAC('failed'))
}

export const handleServerNetworkError = (error: any, dispatch: AppDispatch) => {
	dispatch(setAppErrorAC(error.message ? error.message : 'Some error occurred'))
	dispatch(setAppStatusAC('failed'))
}