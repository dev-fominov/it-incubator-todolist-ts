import React from 'react';
import { action } from '@storybook/addon-actions';
import { Task } from './Task';
import { TaskPriorities, TaskStatuses } from '../api/todolists-api';

export default {
	newTitle: 'Task Component',
	component: Task
}

const changeStatusCallback = action("Change Status");
const changeTaskTitleCallback = action("Change Task Title");
const removeTaskCallback = action("Remove Task");

export const TaskBaseExample = () => {
	return <>
		<Task
			task={{ id: '1', title: "HTML & CSS", status: TaskStatuses.Completed, todoListId: "todolistID1", startDate: '', addedDate: '', deadline: '', description: '', order: 0, priority: TaskPriorities.Low }}
			changeStatus={changeStatusCallback}
			changeTaskTitle={changeTaskTitleCallback}
			removeTask={removeTaskCallback}
			todolistID={"todolistID1"}
		/>
		<Task
			task={{ id: '2', title: "JS", status: TaskStatuses.New, todoListId: "todolistID2", startDate: '', addedDate: '', deadline: '', description: '', order: 0, priority: TaskPriorities.Low }}
			changeStatus={changeStatusCallback}
			changeTaskTitle={changeTaskTitleCallback}
			removeTask={removeTaskCallback}
			todolistID={"todolistID2"}
		/>
	</>
}