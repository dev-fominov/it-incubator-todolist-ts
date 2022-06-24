import { v1 } from 'uuid';
import { TaskPriorities, TaskStatuses } from '../api/todolists-api';
import { TasksType } from '../App';
import { tasksReducer } from './tasksReducer';

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

	const endState = tasksReducer(startState, {
		type: 'REMOVE_TASK',
		payload: { todolistID: todolistID1, taskId: taskId2 }
	})

	expect(endState[todolistID1].length).toBe(1)
	expect(endState[todolistID2].length).toBe(3)

});

test('Add New Task', () => {

	const endState = tasksReducer(startState, {
		type: 'ADD_TASK',
		payload: { todolistID: todolistID1, title: "New Title Test Task" }
	})

	expect(endState[todolistID1].length).toBe(3)
	expect(endState[todolistID2].length).toBe(3)
	expect(endState[todolistID1][0].title).toBe('New Title Test Task')

});

test('Change Task Title', () => {

	const endState = tasksReducer(startState, {
		type: 'CHANGE_STATUS',
		payload: { todolistID: todolistID2, taskId: taskId4, status: TaskStatuses.New }
	})

	expect(endState[todolistID1].length).toBe(2)
	expect(endState[todolistID2].length).toBe(3)
	expect(endState[todolistID2][0].status).toBe(TaskStatuses.Completed)
	expect(endState[todolistID2][1].status).toBe(TaskStatuses.New)
	expect(endState[todolistID2][2].status).toBe(TaskStatuses.New)

});

test('Change Status Task', () => {

	const endState = tasksReducer(startState, {
		type: 'CHANGE_TASK_TITLE',
		payload: { todolistID: todolistID1, taskId: taskId1, newValue: "New Title" }
	})

	expect(endState[todolistID1].length).toBe(2)
	expect(endState[todolistID2].length).toBe(3)
	expect(endState[todolistID1][0].title).toBe("New Title")

});

test('Add todolist task', () => {
	let todolistID3 = v1()
	const endState = tasksReducer(startState, {
		type: 'ADD_TODOLIST_TASK',
		payload: { newId: todolistID3 }
	})

	expect(endState[todolistID1].length).toBe(2)
	expect(endState[todolistID2].length).toBe(3)
	expect(endState[todolistID3].length).toBe(0)
	expect(Object.keys(endState).length).toBe(3)

});