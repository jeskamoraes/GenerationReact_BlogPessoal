import React, { useEffect } from 'react';
import {Typography, Box, Grid, Button} from '@material-ui/core';
import './Home.css';
import TabPostagem from '../../components/postagens/tabpostagem/TabPostagem';
import ModalPostagem from '../../components/postagens/modalPostagem/ModalPostagem';
import { Link, useNavigate } from 'react-router-dom';
import useLocalStorage from 'react-use-localstorage';
import { useSelector } from 'react-redux';
import { TokenState } from '../../store/tokens/TokensReducer';
import { Token } from 'typescript';
import { toast } from 'react-toastify';

function Home() {

    let history = useNavigate();
    // const [token, setToken] = useLocalStorage('token');
    
    // Acessa a redux (que está lá na store) e pega a informação que precisamos, nesse caso, o token
    // <Estrutura, informação>
    const token = useSelector<TokenState, TokenState["tokens"]>(
        (state) => state.tokens
    )
    
    useEffect(() => {
      if (token == "") {
        toast.info('Você precisa estar logado', {
            position: 'top-right',
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false, // Mover a notificação de local
            theme: 'colored',
            progress: undefined,
        });
          history("/login")
  
      }
  }, [token])

    return (
        <>
            <Grid container className='container-home'>
                <Grid className='container-principal' item xs={6}>
                    <Box paddingX={20} >
                        <Typography variant="h3" gutterBottom color="textPrimary" component="h3" align="center" className='titulo-home' >Seja bem vindo(a)!</Typography>
                        <Typography variant="h5" gutterBottom color="textPrimary" component="h5" align="center" className='titulo-home' >Expresse aqui os seus pensamentos e opiniões!</Typography>
                    </Box>
                    <Box display="flex" justifyContent="center">
                        <Box marginRight={1}>
                            <ModalPostagem />
                        </Box>
                        <Link to='/posts' className='text-decorator-none'>
                        <Button variant="outlined" className='botao'>Ver Postagens</Button>
                        </Link>
                    </Box>
                </Grid>
                <Grid item xs={6} className="image-home">
                    {/* <img src="https://i.imgur.com/Y1TxghI.png" alt="" width="900px" height="600px" /> */}
                </Grid>
                <Grid xs={12} className="imagem01">
                    <TabPostagem />
                </Grid>
            </Grid>
        </>
    );
}

export default Home;