import { appReduser, InitialStateType, setAppErrorAC, setAppStatusAC } from "./app-reducer";

let startState: InitialStateType

beforeEach(() => {
	startState = {
		error: null,
		status: 'idle'
	}

})

test('Correct error message should be set', () => {

	const endState = appReduser(startState, setAppErrorAC('some error'))

	expect(endState.error).toBe('some error')

})

test('Correct status should be set', () => {

	const endState = appReduser(startState, setAppStatusAC('loading'))

	expect(endState.status).toBe('loading')

})