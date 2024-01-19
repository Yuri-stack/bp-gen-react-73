import axios from "axios";

// Objeto de Config. do Axios - está pedindo para o axios conectar ao nosso Back
const api = axios.create({
    baseURL: 'https://db-blogpesoal-clvr.onrender.com/'
})

// Função Assíncrona - Funções que esperam que determinada tarefa termine para seguir o seu fluxo de lógica (async/await)
// URL: é o endpoint do back-end para fazer uma requisição. Ex.: usuarios/cadastrar para fazer o cadastro
// DADOS: é o objeto será enviado na requisição
// SETDADOS: é a função que vai receber a resposta do back-end e gravar os dados retornados em alguma variavel de estado

export const cadastrarUsuario = async (url: string, dados: Object, setDados: Function) => {
    const resposta = await api.post(url, dados) // espera que a requisição feita na rota informada pelo parametro url, no método post, seja finalizada para continuar o fluxo
    setDados(resposta.data)
}

export const login = async (url: string, dados: Object, setDados: Function) => {
    const resposta = await api.post(url, dados)
    setDados(resposta.data)
}