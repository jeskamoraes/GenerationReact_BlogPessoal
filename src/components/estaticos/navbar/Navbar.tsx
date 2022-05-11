import React from 'react';
import { AppBar, Toolbar, Typography, Box } from '@material-ui/core';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css'
// import useLocalStorage from 'react-use-localstorage';
import { useDispatch, useSelector } from 'react-redux';
import { TokenState } from '../../../store/tokens/TokensReducer';
import { addToken } from '../../../store/tokens/Action';
import { toast } from 'react-toastify';

function Navbar() {
    
    const token = useSelector<TokenState, TokenState["tokens"]>(
        (state) => state.tokens
    );

    const dispatch = useDispatch();
    
    let history = useNavigate();

    function goLogout(){
        dispatch(addToken(''))
        toast.info('Usuário deslogado', {
            position: 'top-right',
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false, // Mover a notificação de local
            theme: 'colored',
            progress: undefined,
        });
        history('/login')
    }

    var navbarComponent;

    if(token !== "") {
        navbarComponent = 
        <AppBar position="static">
        <Toolbar variant="dense" className='container-navbar'>
            <Box mx={2} className='cursor' >
                <Typography className='font-menu-logo' variant="h5" color="inherit">
                   <h3>Jessica Moraes</h3> 
                </Typography>
            </Box>

            <Box display="flex" justifyContent="start">
            <Link to='/home' className='text-decorator-none'>
                <Box mx={2} className='cursor'>
                    <Typography className='font-menu' variant="h6" color="inherit">
                        Home
                    </Typography>
                </Box>
            </Link>
            <Link to='/posts' className='text-decorator-none'>
                <Box mx={2} className='cursor'>
                    <Typography className='font-menu' variant="h6" color="inherit">
                        Postagens
                    </Typography>
                </Box>
            </Link>
            <Link to='/temas' className='text-decorator-none'>
                <Box mx={2} className='cursor'>
                    <Typography className='font-menu' variant="h6" color="inherit">
                        Temas
                    </Typography>
                </Box>
            </Link> 
            <Link to='/formularioTema' className='text-decorator-none'>
                <Box mx={2} className='cursor'>
                    <Typography className='font-menu' variant="h6" color="inherit">
                        Cadastrar Tema
                    </Typography>
                </Box>
            </Link>  
                
                    <Box mx={2} className='cursor' onClick={goLogout}>
                        <Typography className='font-menu' variant="h6" color="inherit">
                            Logout
                        </Typography>
                    </Box>
                
            </Box>

        </Toolbar>
    </AppBar>
    }
    return (
        <>
           { navbarComponent }
        </>
    )
}

export default Navbar;