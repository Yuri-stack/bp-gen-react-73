import axios from "axios";

// Objeto de Config. do Axios - está pedindo para o axios conectar ao nosso Back
const api = axios.create({
    baseURL: 'https://db-blogpesoal-clvr.onrender.com/'
})

// Função Assíncrona - Funções que esperam que determinada tarefa termine para seguir o seu fluxo de lógica (async/await)
// URL: é o endpoint do back-end para fazer uma requisição. Ex.: usuarios/cadastrar para fazer o cadastro
// DADOS: é o objeto será enviado na requisição (Objetos: Postagens, Temas, ...)
// SETDADOS: é a função que vai receber a resposta do back-end e gravar os dados retornados em alguma variavel de estado
// HEADER: parametro responsavel por mandar ao back-end um objeto que conterá o token de autorização - Similar ao Header do insomnia

export const cadastrarUsuario = async (url: string, dados: Object, setDados: Function) => {
    const resposta = await api.post(url, dados) // espera que a requisição feita na rota informada pelo parametro url, no método POST, seja finalizada para continuar o fluxo
    setDados(resposta.data)                     // salva as info retornadas em uma variavel de estado
}

// Segue a mesma lógica que a função cadastrarUsuario
export const login = async (url: string, dados: Object, setDados: Function) => {
    const resposta = await api.post(url, dados) // espera que a requisição feita na rota informada pelo parametro url, no método POST, seja finalizada para continuar o fluxo
    setDados(resposta.data)                     // salva as info retornadas em uma variavel de estado
}

// Service que será usada para BUSCAR informações ao Back-End
export const buscar = async (url: string, setDados: Function, header: Object) => {
    const resposta = await api.get(url, header) // espera a requisição do tipo GET, enviada pela rota informada dentro do parametro URL, seja finalizada. Também enviamos o Token através do parametro HEADER
    setDados(resposta.data)                     // salva as info retornadas em uma variavel de estado
}

// Service que será usada para CADASTRAR informações no Back-End
export const cadastrar = async (url: string, dados: Object, setDados: Function, header: Object) => {
    const resposta = await api.post(url, dados, header) // espera a requisição do tipo POST, enviada pela rota informada dentro do parametro URL, seja finalizada. Também enviamos o Token através do parametro HEADER
    setDados(resposta.data)                             // salva as info retornadas em uma variavel de estado
}

// Service que será usada para ATUALIZAR informações do Back-End
export const atualizar = async (url: string, dados: Object, setDados: Function, header: Object) => {
    const resposta = await api.put(url, dados, header)  // espera a requisição do tipo POST, enviada pela rota informada dentro do parametro URL, seja finalizada. Também enviamos o Token através do parametro HEADER
    setDados(resposta.data)                             // salva as info retornadas em uma variavel de estado
}

// Service que será usada para APAGAR informações do Back-End
export const deletar = async (url: string, header: Object) => {
    await api.delete(url, header)   // espera a requisição do tipo DELETE, enviada pela rota informada dentro do parametro URL, seja finalizada. Também enviamos o Token através do parametro HEADER
}