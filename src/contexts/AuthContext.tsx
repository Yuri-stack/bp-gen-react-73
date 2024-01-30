import { createContext, ReactNode, useState } from "react";
import UsuarioLogin from "../models/UsuarioLogin";
import { login } from "../services/Service";
import { toastAlerta } from "../utils/toastAlerta";

// Define os dados que Contexto irá armazenar
interface AuthContextProps {
    usuario: UsuarioLogin
    handleLogout(): void
    handleLogin(usuario: UsuarioLogin): Promise<void>
    isLoading: boolean
}

// Define a estrutura do Contexto, um componente que envolve outros componentes
interface AuthProviderProps {
    children: ReactNode
}

// Nessa linha, o Contexto da aplicação React é iniciado, através da função createContext()
export const AuthContext = createContext({} as AuthContextProps)

// Gerencia e compartilha os dados do Contexto aos componentes da aplicação
export function AuthProvider({ children }: AuthProviderProps) {

    // Variavel de Estado do Usuário - Armazena os dados do Usuario logado
    const [usuario, setUsuario] = useState<UsuarioLogin>({
        id: 0,
        nome: "",
        usuario: "",
        senha: "",
        foto: "",
        token: ""
    })

    // Variavel de Estado de Carregamento - usada para indicar que está havendo alguma requisição ao Back
    const [isLoading, setIsLoading] = useState<boolean>(false)

    // Função que vai ser chamada no Login.tsx e lida com o Login da aplicação
    async function handleLogin(userLogin: UsuarioLogin) {
        setIsLoading(true)  // Muda o estado para verdadeiro, indicando que existe uma requisição sendo processada no back

        try {   // Tenta fazer a requisição, e se houver erro impede que a aplicação pare

            await login(`/usuarios/logar`, userLogin, setUsuario)   // Esperamos que a Service Login() finalize a sua requisição
            toastAlerta("Usuário logado com sucesso", 'sucesso')    // Avisa ao usuário que deu bom com um Alerta Personalizado
            setIsLoading(false)                                     // Muda o estado para falso, indicando a requisição já terminou de ser processada

        } catch (error) {

            console.log(error)                                          // Avisa a gente do erro no console do navegador
            toastAlerta("Dados do usuário inconsistentes", 'erro')      // Avisa ao usuário que deu ruim com um Alerta Personalizado
            setIsLoading(false)                                         // Muda o estado para falso, indicando a requisição já terminou de ser processada
        }
    }

    // Função que apaga os dados do usuário logado na aplicação
    function handleLogout() {
        setUsuario({
            id: 0,
            nome: "",
            usuario: "",
            senha: "",
            foto: "",
            token: ""
        })
    }

    return (
        // Disponibilizamos os dados ao resto a aplicação
        <AuthContext.Provider value={{ usuario, handleLogin, handleLogout, isLoading }}>
            {children}  {/* Representa os outros componentes da aplicação */}
        </AuthContext.Provider>
    )
}