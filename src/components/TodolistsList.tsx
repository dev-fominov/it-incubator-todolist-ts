import { Grid, Paper } from '@mui/material';
import React, { useCallback, useEffect } from 'react';
import { TaskStatuses, TaskType } from '../api/todolists-api';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import FullInput from './FullInput';
import { addTaskTC, removeTaskTC, updateTaskTC } from '../reducers/tasks-reducer';
import { addTodolistTC, changeFilterAC, fetchTodolistsTC, FilterValuesType, onChangeTodolistTitleTC, removeTodolistTC } from '../reducers/todolists-reducer';
import { TodoList } from './TodoList';
import { Navigate } from "react-router-dom";

export const TodolistsList: React.FC<PropsType> = ({ demo = false }) => {
	const todolists = useAppSelector(state => state.todolists)
	const tasks = useAppSelector(state => state.tasks)
	const isLoggedIn = useAppSelector(state => state.login.isLoggedIn)

	const dispatch = useAppDispatch();

	useEffect(() => {
		if (!demo || isLoggedIn) {
			dispatch(fetchTodolistsTC())
		}
	}, [dispatch, demo, isLoggedIn])

	const removeTask = useCallback(function (todolistId: string, id: string) {
		dispatch(removeTaskTC(todolistId, id))
	}, [dispatch])

	const removeTodolistHandler = useCallback((todolistId: string) => {
		dispatch(removeTodolistTC(todolistId))
	}, [dispatch])

	const addTask = useCallback((todolistId: string, title: string) => {
		dispatch(addTaskTC(todolistId, title))
	}, [dispatch])

	const changeStatus = useCallback((todolistId: string, taskId: string, status: TaskStatuses) => {
		dispatch(updateTaskTC(todolistId, taskId, { status: status }))
	}, [dispatch])

	const changeTaskTitle = useCallback((todolistId: string, taskId: string, newValue: string) => {
		dispatch(updateTaskTC(todolistId, taskId, { title: newValue }))
	}, [dispatch])

	const changeFilter = useCallback((todolistId: string, value: FilterValuesType) => {
		dispatch(changeFilterAC(todolistId, value))
	}, [dispatch])

	const onChangeTodolistTitle = useCallback((todolistId: string, newTitle: string) => {
		dispatch(onChangeTodolistTitleTC(todolistId, newTitle))
	}, [dispatch])

	const addTodoList = useCallback((newTitle: string) => {
		dispatch(addTodolistTC(newTitle));
	}, [dispatch]);

	if(!isLoggedIn) {
		return <Navigate replace to="/login" />
	}

	return (
		<>
			<Grid container style={{ padding: '20px 0px' }}>
				<FullInput callBack={addTodoList} />
			</Grid>
			<Grid container spacing={3}>
				{
					todolists.map((t) => {
						let tasksForTodoList = tasks[t.id];

						return (
							<Grid item>
								<Paper style={{ padding: '15px' }}>
									<TodoList
										key={t.id}
										todolist={t}
										tasks={tasksForTodoList}
										removeTask={removeTask}
										changeFilter={changeFilter}
										addTask={addTask}
										changeStatus={changeStatus}
										changeTaskTitle={changeTaskTitle}
										removeTodolistHandler={removeTodolistHandler}
										onChangeTodolistTitle={onChangeTodolistTitle}
										demo={demo}
									/>
								</Paper>
							</Grid>
						)
					})
				}
			</Grid>
		</>
	)
}

export type ArrayTaskType = {
	tasks: TaskType[]
}

export type TasksType = {
	[userID: string]: TaskType[]
}

type PropsType = {
	demo?: boolean
}