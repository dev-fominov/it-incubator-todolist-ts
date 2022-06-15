import React from 'react';
import { action } from '@storybook/addon-actions';
import { Task } from './Task';

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
			task={{ id: '1', title: "HTML & CSS", isDone: true }}
			changeStatus={changeStatusCallback}
			changeTaskTitle={changeTaskTitleCallback}
			removeTask={removeTaskCallback}
			todolistID={"todolistID1"}
		/>
		<Task
			task={{ id: '2', title: "JS", isDone: false }}
			changeStatus={changeStatusCallback}
			changeTaskTitle={changeTaskTitleCallback}
			removeTask={removeTaskCallback}
			todolistID={"todolistID2"}
		/>
	</>
}