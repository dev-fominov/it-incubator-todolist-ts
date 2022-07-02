import { v1 } from 'uuid';
import { TaskPriorities, TaskStatuses } from '../api/todolists-api';
import { TasksType } from '../components/TodolistsList';
import { addTaskAC, removeTaskAC, setTasksAC, tasksReducer, updateTaskAC } from './tasks-reducer';
import { setTodolistsAC } from './todolists-reducer';

let todolistID1: string
let todolistID2: string
let startState: TasksType

let taskId1: string
let taskId2: string
let taskId3: string
let taskId4: string
let taskId5: string

beforeEach(() => {
	todolistID1 = v1()
	todolistID2 = v1()

	taskId1 = v1();
	taskId2 = v1();
	taskId3 = v1();
	taskId4 = v1();
	taskId5 = v1();

	startState = {
		[todolistID1]: [
			{ id: taskId1, title: "HTML&CSS", status: TaskStatuses.Completed, todoListId: todolistID1, startDate: '', addedDate: '', deadline: '', description: '', order: 0, priority: TaskPriorities.Low },
			{ id: taskId2, title: "JS", status: TaskStatuses.Completed, todoListId: todolistID1, startDate: '', addedDate: '', deadline: '', description: '', order: 0, priority: TaskPriorities.Low }
		],
		[todolistID2]: [
			{ id: taskId3, title: "HTML&CSS2", status: TaskStatuses.Completed, todoListId: todolistID2, startDate: '', addedDate: '', deadline: '', description: '', order: 0, priority: TaskPriorities.Low },
			{ id: taskId4, title: "JS2", status: TaskStatuses.Completed, todoListId: todolistID2, startDate: '', addedDate: '', deadline: '', description: '', order: 0, priority: TaskPriorities.Low },
			{ id: taskId5, title: "ReactJS2", status: TaskStatuses.New, todoListId: todolistID2, startDate: '', addedDate: '', deadline: '', description: '', order: 0, priority: TaskPriorities.Low }
		]
	}

})

test('Remove Task', () => {

	const action = removeTaskAC(todolistID1,taskId2)
	const endState = tasksReducer(startState, action)

	expect(endState[todolistID1].length).toBe(1)
	expect(endState[todolistID2].length).toBe(3)

});

test('Add New Task', () => {

	const action = addTaskAC({
		title: "New Title Test Task",
		addedDate: '',
		deadline: '',
		description: '',
		id: '12345',
		order: 0,
		priority: 0,
		startDate: '',
		status: TaskStatuses.New,
		todoListId: todolistID1
	})

	const endState = tasksReducer(startState, action)

	expect(endState[todolistID1].length).toBe(3)
	expect(endState[todolistID2].length).toBe(3)
	expect(endState[todolistID1][0].title).toBe('New Title Test Task')

});

test('Change Task Status', () => {

	const action = updateTaskAC( todolistID2, taskId4, {status: TaskStatuses.New} )
	const endState = tasksReducer(startState, action)

	expect(endState[todolistID1].length).toBe(2)
	expect(endState[todolistID2].length).toBe(3)
	expect(endState[todolistID2][0].status).toBe(TaskStatuses.Completed)
	expect(endState[todolistID2][1].status).toBe(TaskStatuses.New)
	expect(endState[todolistID2][2].status).toBe(TaskStatuses.New)

});

test('Change Title Task', () => {

	const action = updateTaskAC( todolistID1, taskId1, {title: "New Title"} )
	const endState = tasksReducer(startState, action)

	expect(endState[todolistID1].length).toBe(2)
	expect(endState[todolistID2].length).toBe(3)
	expect(endState[todolistID1][0].title).toBe("New Title")

});

test('set todolists', () => {

	const action = setTodolistsAC([
		{ id: todolistID1, title: 'What to learn', addedDate: '', order: 0 },
		{ id: todolistID2, title: 'What to buy', addedDate: '', order: 0 }
	])

	const endState = tasksReducer({}, action)
	const keys = Object.keys(endState)

	expect(endState[todolistID1]).toStrictEqual([])
	expect(endState[todolistID2]).toStrictEqual([])
	expect(keys.length).toBe(2)

});

test('set tasks', () => {

	const action = setTasksAC(startState[todolistID1], todolistID1)

	const endState = tasksReducer({
		todolistID1: []
	}, action)

	expect(endState[todolistID1].length).toBe(2)

});