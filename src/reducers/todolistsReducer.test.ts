import { v1 } from 'uuid';
import { TodolistsType } from '../App';
import { todolistsReducer } from './todolistsReducer';

test('Remove First Todolist', () => {

	let todolistID1 = v1();
	let todolistID2 = v1();

	const startState: TodolistsType[] = [
		{ id: todolistID1, title: 'What to learn', filter: 'all' },
		{ id: todolistID2, title: 'What to buy', filter: 'all' }
	];

	const endState = todolistsReducer(startState, { type: 'REMOVE_TODOLIST_HANDLER', payload: { todolistID: todolistID1 } })

	expect(endState.length).toBe(1)
	expect(endState[0].id).toBe(todolistID2)

});

test('Add New Todolist', () => {

	let todolistID1 = v1();
	let todolistID2 = v1();
	let todolistID3 = v1();

	const startState: TodolistsType[] = [
		{ id: todolistID1, title: 'What to learn', filter: 'all' },
		{ id: todolistID2, title: 'What to buy', filter: 'all' }
	];

	const endState = todolistsReducer(startState, { type: 'ADD_TODOLIST', payload: { newID: todolistID3, newTitle: 'New Todolist' } })

	expect(endState.length).toBe(3)
	expect(endState[2].id).toBe(todolistID3)

});

test('Change Filter', () => {

	let todolistID1 = v1();
	let todolistID2 = v1();

	const startState: TodolistsType[] = [
		{ id: todolistID1, title: 'What to learn', filter: 'all' },
		{ id: todolistID2, title: 'What to buy', filter: 'all' }
	];

	const endState = todolistsReducer(startState, { type: 'CHANGE_FILTER', payload: { todolistID: todolistID2, value: 'completed' } })

	expect(endState.length).toBe(2)
	expect(endState[1].filter).toBe('completed')

});

test('On Change Todolist Title', () => {

	let todolistID1 = v1();
	let todolistID2 = v1();

	const startState: TodolistsType[] = [
		{ id: todolistID1, title: 'What to learn', filter: 'all' },
		{ id: todolistID2, title: 'What to buy', filter: 'all' }
	];

	const endState = todolistsReducer(startState, { type: 'ON_CHANGE_TODOLIST_TITLE', payload: { todolistID: todolistID1, newTitle: 'New Title Test' } })

	expect(endState.length).toBe(2)
	expect(endState[0].title).toBe('New Title Test')
	expect(endState[1].title).toBe('What to buy')

});