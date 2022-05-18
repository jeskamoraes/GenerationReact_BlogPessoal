import { Box, Button, Grid, TextField, Typography } from '@material-ui/core';
import React, {ChangeEvent, useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import UserLogin from '../../models/UserLogin';
import'./Login.css';
import { useNavigate } from 'react-router-dom';
import { login } from '../../services/Service';
import { useDispatch } from 'react-redux';
import { addToken } from '../../store/tokens/Action';
import { toast } from 'react-toastify';


function Login() {
    // Redireciona o usuário para determinada pagina
    let history = useNavigate();
   
    // Hooks que vão manipular o nosso Local Storage para gravar o Token
    // const[token, setToken] = useLocalStorage('token');
    
    const [token, setToken] = useState('')

    // Informar quando vai disparar a action
    const dispatch = useDispatch()

    // useState define como uma determinada variavel será inicializada quando o Comp. for renderizado
    const[userLogin, setUserLogin] = useState<UserLogin> (
        {
            id:0,
            nome: "",
            usuario: "",
            senha: "",
            foto: "",
            token: ""

        }
    )
    // Função que junto com a setUserLogin irá atualizar o valor inicial da userLogin
    function updatedModel(e: ChangeEvent<HTMLInputElement>) {
        setUserLogin({
            ...userLogin,
            [e.target.name]: e.target.value
        })
    }
     // Hook de efeito colateral, sempre executa uma função quando o que estiver no seu Array é alterado
        useEffect(() => {
            if (token !== ''){
                dispatch(addToken(token))
                history('/posts')
            }
        }, [token])

    async function onSubmit(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault();

        try{
            await login (`/usuarios/logar`, userLogin, setToken)

            toast.success('Usuário logado com sucesso!', {
                position: 'top-right',
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false, // Mover a notificação de local
                theme: 'colored',
                progress: undefined,
            });
        } catch(error){
            toast.error('Erro ao logar. Dados de usuário inconsistentes.', {
                position: 'top-right',
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false, // Mover a notificação de local
                theme: 'colored',
                progress: undefined,
            });
        }
        
    }
    
    return(
        <Grid container className='container'>
            <Grid xs = {12} className='container-box'>
                <Box paddingX={20} className='box-login'>
                  <Box>
                  <form onSubmit={onSubmit}>
                        <Typography variant='h3' gutterBottom color='textPrimary' component='h3' className='textos'>Login</Typography>
                        <TextField value={userLogin.usuario} onChange={(e:ChangeEvent<HTMLInputElement>)=>updatedModel(e)} id='usuario' label='Usuário' variant='standard' name='usuario' margin='normal' required fullWidth />
                        <TextField value={userLogin.senha} onChange={(e:ChangeEvent<HTMLInputElement>)=>updatedModel(e)} id='senha' label='Senha' variant='standard' name='senha' margin='normal' type='password' required fullWidth />
                        <Box marginTop={2} textAlign='center'>
                                <Button className='btnAmarelo' type='submit' variant='contained' color='primary'>
                                    Logar
                                </Button>
                        </Box>
                    </form>
                    <Box marginTop={2} className='box-button'>
                        <Box marginRight={1} >
                            <Typography variant='subtitle1' gutterBottom className='textos2'>Não tem uma conta?</Typography>
                        </Box>
                        <Link to='/cadastrousuario' className='text-decorator-none'>
                        <Typography variant='subtitle1' gutterBottom className='cadastreSe'>Cadastre-se</Typography>
                        </Link>    
                    </Box>
                  </Box>
                </Box>
            </Grid>

            {/* <Grid xs = {6} className='imagem'>

            </Grid> */}
        </Grid>


    )
}

export default Login;