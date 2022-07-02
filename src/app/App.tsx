import { Menu } from '@mui/icons-material';
import { AppBar, Button, IconButton, LinearProgress, Toolbar, Typography } from '@mui/material';
import { Container } from '@mui/system';
import React from 'react';
import './App.css';
import { useAppSelector } from '../app/hooks';
import { CustomizedSnackbars } from '../components/ErrorSnackbar/ErrorSnackbar';
import { TodolistsList } from '../components/TodolistsList';


type PropsType = {
	demo?: boolean
}

function App({demo = false}: PropsType) { 

    const status = useAppSelector(state=>state.app.status)

    return (
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
                    <Button color="inherit">Login</Button>
                </Toolbar>
                {status === 'loading' && <LinearProgress />}
            </AppBar>
            <Container fixed>
                <TodolistsList demo={demo} />
            </Container>
        </div>
    );
}

export default App;