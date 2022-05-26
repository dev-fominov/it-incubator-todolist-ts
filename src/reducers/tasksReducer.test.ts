import { v1 } from 'uuid';
import { TasksType } from '../App';
import { tasksReducer } from './tasksReducer';

test('Remove Task', () => {

	let todolistID1 = v1();
	let todolistID2 = v1();

	let taskId1 = v1();
	let taskId2 = v1();
	let taskId3 = v1();
	let taskId4 = v1();
	let taskId5 = v1();

	const startState: TasksType = {
		[todolistID1]: [
			{ id: taskId1, title: "HTML&CSS", isDone: true },
			{ id: taskId2, title: "JS", isDone: true }
		],
		[todolistID2]: [
			{ id: taskId3, title: "HTML&CSS2", isDone: true },
			{ id: taskId4, title: "JS2", isDone: true },
			{ id: taskId5, title: "ReactJS2", isDone: false }
		]
	}

	const endState = tasksReducer(startState, {
		type: 'REMOVE_TASK',
		payload: { todolistID: todolistID1, taskId: taskId2 }
	})

	expect(endState[todolistID1].length).toBe(1)
	expect(endState[todolistID2].length).toBe(3)

});

test('Add New Task', () => {

	let todolistID1 = v1();
	let todolistID2 = v1();

	let taskId1 = v1();
	let taskId2 = v1();
	let taskId3 = v1();
	let taskId4 = v1();
	let taskId5 = v1();

	const startState: TasksType = {
		[todolistID1]: [
			{ id: taskId1, title: "HTML&CSS", isDone: true },
			{ id: taskId2, title: "JS", isDone: true }
		],
		[todolistID2]: [
			{ id: taskId3, title: "HTML&CSS2", isDone: true },
			{ id: taskId4, title: "JS2", isDone: true },
			{ id: taskId5, title: "ReactJS2", isDone: false }
		]
	}

	const endState = tasksReducer(startState, {
		type: 'ADD_TASK',
		payload: { todolistID: todolistID1, title: "New Title Test Task" }
	})

	expect(endState[todolistID1].length).toBe(3)
	expect(endState[todolistID2].length).toBe(3)
	expect(endState[todolistID1][0].title).toBe('New Title Test Task')

});

test('Change Task Title', () => {

	let todolistID1 = v1();
	let todolistID2 = v1();

	let taskId1 = v1();
	let taskId2 = v1();
	let taskId3 = v1();
	let taskId4 = v1();
	let taskId5 = v1();

	const startState: TasksType = {
		[todolistID1]: [
			{ id: taskId1, title: "HTML&CSS", isDone: true },
			{ id: taskId2, title: "JS", isDone: true }
		],
		[todolistID2]: [
			{ id: taskId3, title: "HTML&CSS2", isDone: true },
			{ id: taskId4, title: "JS2", isDone: true },
			{ id: taskId5, title: "ReactJS2", isDone: false }
		]
	}

	const endState = tasksReducer(startState, {
		type: 'CHANGE_STATUS',
		payload: { todolistID: todolistID2, taskId: taskId4, isDone: false }
	})

	expect(endState[todolistID1].length).toBe(2)
	expect(endState[todolistID2].length).toBe(3)
	expect(endState[todolistID2][0].isDone).toBe(true)
	expect(endState[todolistID2][1].isDone).toBe(false)
	expect(endState[todolistID2][2].isDone).toBe(false)

});

test('Change Status Task', () => {

	let todolistID1 = v1();
	let todolistID2 = v1();

	let taskId1 = v1();
	let taskId2 = v1();
	let taskId3 = v1();
	let taskId4 = v1();
	let taskId5 = v1();

	const startState: TasksType = {
		[todolistID1]: [
			{ id: taskId1, title: "HTML&CSS", isDone: true },
			{ id: taskId2, title: "JS", isDone: true }
		],
		[todolistID2]: [
			{ id: taskId3, title: "HTML&CSS2", isDone: true },
			{ id: taskId4, title: "JS2", isDone: true },
			{ id: taskId5, title: "ReactJS2", isDone: false }
		]
	}

	const endState = tasksReducer(startState, {
		type: 'CHANGE_TASK_TITLE',
		payload: { todolistID: todolistID1, taskId: taskId1, newValue: "New Title" }
	})

	expect(endState[todolistID1].length).toBe(2)
	expect(endState[todolistID2].length).toBe(3)
	expect(endState[todolistID1][0].title).toBe("New Title")

});

// test('Add todolist task', () => {

// 	let todolistID1 = v1();
// 	let todolistID2 = v1();

// 	let todolistID3 = v1();

// 	let taskId1 = v1();
// 	let taskId2 = v1();
// 	let taskId3 = v1();
// 	let taskId4 = v1();
// 	let taskId5 = v1();

// 	const startState: TasksType = {
// 		[todolistID1]: [
// 			{ id: taskId1, title: "HTML&CSS", isDone: true },
// 			{ id: taskId2, title: "JS", isDone: true }
// 		],
// 		[todolistID2]: [
// 			{ id: taskId3, title: "HTML&CSS2", isDone: true },
// 			{ id: taskId4, title: "JS2", isDone: true },
// 			{ id: taskId5, title: "ReactJS2", isDone: false }
// 		]
// 	}

// 	const endState = tasksReducer(startState, {
// 		type: 'ADD_TODOLIST_TASK',
// 		payload: { newID: todolistID3 }
// 	})

// 	expect(endState[todolistID1].length).toBe(2)
// 	expect(endState[todolistID2].length).toBe(3)
// 	expect(endState[todolistID3].length).toBe(0)
// 	expect(Object.keys(endState).length).toBe(3)

// });