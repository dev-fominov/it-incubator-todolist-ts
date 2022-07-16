import React from "react";
import { Button, Checkbox, FormControl, FormControlLabel, FormGroup, Grid, TextField } from "@mui/material"
import { useFormik } from 'formik'
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { loginTC } from "./login-reducer"
import { Navigate } from "react-router-dom";

export const Login = () => {
	// dev-fominov@yandex.by
	// 828Q2F8c7PvQ2sgKq5q0
	const dispatch = useAppDispatch();

	const isLoggedIn = useAppSelector(state => state.login.isLoggedIn)

	const formik = useFormik({
		validate: (values) => {
			if (!values.email) {
				return {
					email: 'Email is required'
				}
			}
			if (!values.password) {
				return {
					password: 'Password is required'
				}
			}
		},
		initialValues: {
			email: '',
			password: '',
			rememberMe: false
		},
		onSubmit: values => {
			dispatch(loginTC(values))
		}
	})

	if (isLoggedIn) {
		return <Navigate replace to="/" />
	}

	return <Grid container justifyContent={'center'}>
		<Grid item xs={4}>
			<form onSubmit={formik.handleSubmit}>
				<FormControl>
					<FormGroup>
						<TextField
							label="Email"
							margin="normal"
							{...formik.getFieldProps('email')} />
						{formik.errors.email ? <div>{formik.errors.email}</div> : null}
						<TextField
							type="password"
							label="Password"
							margin="normal"
							{...formik.getFieldProps('password')} />
						{formik.errors.password ? <div>{formik.errors.password}</div> : null}
						<FormControlLabel
							label={'Remember me'}
							control={<Checkbox
								{...formik.getFieldProps('rememberMe')}
								checked={formik.values.rememberMe} />} />
						<Button type={'submit'} variant={'contained'} color={'primary'} >Login</Button>
					</FormGroup>
				</FormControl>
			</form>
		</Grid>
	</Grid>
}