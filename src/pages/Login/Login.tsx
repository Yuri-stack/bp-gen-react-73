import { ChangeEvent, useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../contexts/AuthContext';
import { RotatingLines } from 'react-loader-spinner';

import UsuarioLogin from '../../models/UsuarioLogin';

import './Login.css';

function Login() {

    // Pega as informações que queremos do nosso Contexto através do hook useContexo
    const { handleLogin, usuario, isLoading } = useContext(AuthContext)

    // Criamos uma constante que recebe o hook useNavigate, para podermos redirecionar o usuário
    const navigate = useNavigate();

    // Variavel de Estado do UsuarioLogin - Registra um Objeto da Interface UsuarioLogin que armazena os dados que foram digitados nos inputs do formulario
    const [usuarioLogin, setUsuarioLogin] = useState<UsuarioLogin>({} as UsuarioLogin);

    // Função que através do evento de mudança de um Input, captura o que foi digitado e através da função setUsuarioLogin() atualiza o estado/objeto de usuarioLogin
    function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {

        setUsuarioLogin({
            ...usuarioLogin,
            [e.target.name]: e.target.value
        })

    }

    // Função que vai ser chamada ao envio do formulário, que por sua vez, impede o recarregamento da página pelo form e chama a função handleLogin do Contexto
    function login(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault()
        handleLogin(usuarioLogin)   // chama a função e passo o objeto contendo usuario(email) e senha
    }

    // Função de Efeito Colateral - Sempre que a variavel Usuario, que importamos do Contexto, tiver alguns de seus valores alterados
    // uma função é disparada, essa função verifica se o token é diferente de "", se sim, isso indica que o usuário foi logado e então chama a função retornar()
    useEffect(() => {
        if (usuario.token !== "") {
            navigate('/home')
        }
    }, [usuario])

    return (
        <>
            <div className="grid grid-cols-1 lg:grid-cols-2 h-screen place-items-center font-bold ">

                <form className="flex justify-center items-center flex-col w-1/2 gap-4"
                    onSubmit={login}    // onSubmit é o evento que dispara a função de login quando o usuário clica em Entrar
                >
                    <h2 className="text-slate-900 text-5xl ">Entrar</h2>
                    <div className="flex flex-col w-full">
                        <label htmlFor="usuario">Usuário</label>
                        <input
                            type="text"
                            id="usuario"
                            name="usuario"
                            placeholder="Usuario"
                            className="border-2 border-slate-700 rounded p-2"
                            value={usuarioLogin.usuario}                                        // Conecta esse input com o atributo usuario(email) do estado/objeto usuario
                            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)} // Quando o usuario digitar algo, chama a função atualizarEstado
                        />
                    </div>
                    <div className="flex flex-col w-full">
                        <label htmlFor="senha">Senha</label>
                        <input
                            type="password"
                            id="senha"
                            name="senha"
                            placeholder="Senha"
                            className="border-2 border-slate-700 rounded p-2"
                            value={usuarioLogin.senha}                                          // Conecta esse input com o atributo senha do estado/objeto usuario
                            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)} // Quando o usuario digitar algo, chama a função atualizarEstado
                        />
                    </div>
                    <button type='submit' className="rounded bg-indigo-400 hover:bg-indigo-900 text-white w-1/2 py-2 flex justify-center">
                        {
                            // Renderização Condicial - Se isLoading for true mostra o componente de carregamento
                            isLoading ? <RotatingLines
                                strokeColor="white"
                                strokeWidth="5"
                                animationDuration="0.75"
                                width="24"
                                visible={true}
                            /> : // Se não, mostra apenas o Cadastrar
                                <span>Entrar</span>}
                    </button>

                    <hr className="border-slate-800 w-full" />

                    <p>
                        Ainda não tem uma conta?{' '}
                        <Link to="/cadastro" className="text-indigo-800 hover:underline">
                            Cadastre-se
                        </Link>
                    </p>
                </form>
                <div className="fundoLogin hidden lg:block"></div>
            </div>
        </>
    );
}

export default Login;