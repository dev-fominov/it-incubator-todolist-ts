import { v1 } from 'uuid';
import { TodolistDomainType, todolistsReducer } from './todolistsReducer';

let todolistID1: string
let todolistID2: string
let startState: TodolistDomainType[]

beforeEach(() => {
	todolistID1 = v1()
	todolistID2 = v1()
	startState = [
		{ id: todolistID1, title: 'What to learn', filter: 'all', addedDate: '', order: 0 },
		{ id: todolistID2, title: 'What to buy', filter: 'all', addedDate: '', order: 0 }
	];
})



test('Remove First Todolist', () => {

	const endState = todolistsReducer(startState, { type: 'REMOVE_TODOLIST_HANDLER', payload: { todolistID: todolistID1 } })

	expect(endState.length).toBe(1)
	expect(endState[0].id).toBe(todolistID2)

});

test('Add New Todolist', () => {

	let todolistID3 = v1();

	const endState = todolistsReducer(startState, {
		type: 'ADD_TODOLIST',
		payload: {
			newId: todolistID3,
			newTitle: 'New Todolist'
		}
	})

	expect(endState.length).toBe(3)
	expect(endState[2].id).toBe(todolistID3)

});

test('Change Filter', () => {

	const endState = todolistsReducer(startState, { type: 'CHANGE_FILTER', payload: { todolistID: todolistID2, value: 'completed' } })

	expect(endState.length).toBe(2)
	expect(endState[1].filter).toBe('completed')

});

test('On Change Todolist Title', () => {

	const endState = todolistsReducer(startState, { type: 'ON_CHANGE_TODOLIST_TITLE', payload: { todolistID: todolistID1, newTitle: 'New Title Test' } })

	expect(endState.length).toBe(2)
	expect(endState[0].title).toBe('New Title Test')
	expect(endState[1].title).toBe('What to buy')

});