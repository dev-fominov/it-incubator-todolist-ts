import { RequestStatusType } from '../app/app-reducer';
import { v1 } from 'uuid';
import { addTodoListAC, setTodolistsAC, TodolistDomainType, todolistsReducer, changeTodolistEntityStatusAC, removeTodolistHandlerAC, changeFilterAC, onChangeTodolistTitleAC } from './todolists-reducer';

let todolistID1: string
let todolistID2: string
let startState: TodolistDomainType[]

beforeEach(() => {
	todolistID1 = v1()
	todolistID2 = v1()
	startState = [
		{ id: todolistID1, title: 'What to learn', filter: 'all', entityStatus: 'idle', addedDate: '', order: 0 },
		{ id: todolistID2, title: 'What to buy', filter: 'all', entityStatus: 'idle', addedDate: '', order: 0 }
	];
})



test('Remove First Todolist', () => {

	const action = removeTodolistHandlerAC(todolistID1)
	const endState = todolistsReducer(startState, action)

	expect(endState.length).toBe(1)
	expect(endState[0].id).toBe(todolistID2)

});

test('Add New Todolist', () => {

	let todolistID3 = v1();
	let action = addTodoListAC({
		title: 'New Todolist',
		addedDate: '',
		id: todolistID3,
		order: 0
	})
	const endState = todolistsReducer(startState, action)

	expect(endState.length).toBe(3)
	expect(endState[2].id).toBe(todolistID3)

});

test('Change Filter', () => {

	const action = changeFilterAC(todolistID2, 'completed')
	const endState = todolistsReducer(startState, action)

	expect(endState.length).toBe(2)
	expect(endState[1].filter).toBe('completed')

});

test('Correct entity status of todolist should be changed', () => {

	let newStatus: RequestStatusType = 'loading'
	const action = changeTodolistEntityStatusAC(todolistID2, newStatus)
	const endState = todolistsReducer(startState, action)

	expect(endState[0].entityStatus).toBe('idle')
	expect(endState[1].entityStatus).toBe('loading')

});

test('On Change Todolist Title', () => {

	const action = onChangeTodolistTitleAC(todolistID1, 'New Title Test')
	const endState = todolistsReducer(startState, action)

	expect(endState.length).toBe(2)
	expect(endState[0].title).toBe('New Title Test')
	expect(endState[1].title).toBe('What to buy')

});

test('set todolist', () => {

	const action = setTodolistsAC(startState)
	const endState = todolistsReducer([], action)

	expect(endState.length).toBe(2)

});