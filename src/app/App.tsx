import { Menu } from '@mui/icons-material';
import { AppBar, Button, CircularProgress, IconButton, LinearProgress, Toolbar, Typography } from '@mui/material';
import { Container } from '@mui/system';
import React, { useCallback, useEffect } from 'react';
import './App.css';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { CustomizedSnackbars } from '../components/ErrorSnackbar/ErrorSnackbar';
import { TodolistsList } from '../components/TodolistsList';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Login } from '../components/Login/Login';
import { initializeAppTC } from './app-reducer';
import { logoutTC } from '../components/Login/login-reducer';

type PropsType = {
    demo?: boolean
}

function App({ demo = false }: PropsType) {

    const status = useAppSelector(state => state.app.status)
    const initialized = useAppSelector(state => state.app.initialized)
    const isLoggedIn = useAppSelector(state => state.login.isLoggedIn)
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(initializeAppTC())
    }, [])

    const logoutHandle = useCallback(() => {
        dispatch(logoutTC())
    }, [dispatch])

    if (!initialized) {
        return <CircularProgress style={{ position: 'fixed', top: '30%', textAlign: 'center', left: '50%' }} />
    }

    return (
        <BrowserRouter>
            <div className="App">
                <CustomizedSnackbars />
                <AppBar position="static">
                    <Toolbar>
                        <IconButton>
                            <Menu />
                        </IconButton>
                        <Typography variant='h6'>
                            News
                        </Typography>
                        {isLoggedIn && <Button color="inherit" onClick={logoutHandle}>Log out</Button>}
                    </Toolbar>
                    {status === 'loading' && <LinearProgress />}
                </AppBar>
                <Container fixed>
                    <Routes>
                        <Route path={'/'} element={<TodolistsList demo={demo} />} />
                        <Route path={'/login'} element={<Login />} />
                    </Routes>
                </Container>
            </div>
        </BrowserRouter>
    );
}

export default App;