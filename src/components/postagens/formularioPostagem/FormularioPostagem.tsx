import { ChangeEvent, useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthContext';
import Postagem from '../../../models/Postagem';
import Tema from '../../../models/Tema';
import { buscar, atualizar, cadastrar } from '../../../services/Service';
import { RotatingLines } from 'react-loader-spinner';


function FormularioPostagem() {

    // Variavel de Estado de Carregamento - usada para indicar que está havendo alguma requisição ao Back
    const [isLoading, setIsLoading] = useState<boolean>(false)

    // Criamos uma constante que recebe o hook useNavigate, para podermos redirecionar o usuário
    const navigate = useNavigate();

    // useParams = Esse hook serve para pegarmos parametros que veem na url do FRONT
    const { id } = useParams<{ id: string }>();

    // Pega as informações que queremos do nosso Contexto através do hook useContexo
    const { usuario, handleLogout } = useContext(AuthContext);
    const token = usuario.token;

    // Variavel de Estado de Temas - Registra um Array que possuí Objetos da Model Tema. Usada para armazena os Temas trazidos do Back para aparecerem no SELECT
    const [temas, setTemas] = useState<Tema[]>([]); // Indicamos que o temas é um Array de Objetos de Temas, e a iniciamos com um array vazio

    // Variavel de Estado de Tema - Registra um Objeto da Model Tema. Usada para armazena o Tema escolhido dentro do SELECT
    const [tema, setTema] = useState<Tema>({
        id: 0,
        descricao: '',
    });

    // Variavel de Estado de Postagem - Registra um Objeto da Model Postagem. Usada para armazena os dados que foram digitados nos inputs do formulario, junto com o Usuario logado e Tema escolhido
    const [postagem, setPostagem] = useState<Postagem>({
        id: 0,
        titulo: '',
        texto: '',
        data: '',
        tema: null,
        usuario: null,
    });

    // Função que vai chamada a service de Buscar para buscarmos uma Postagem em Especifico - ESSA FUNÇÃO É USADA PARA EDITAR UMA POSTAGEM
    async function buscarPostagemPorId(id: string) {
        await buscar(`/postagens/${id}`, setPostagem, {
            headers: {
                Authorization: token,
            },
        });
    }

    // Função que vai chamada a service de Buscar para buscarmos um Tema em Especifico - ESSA FUNÇÃO É USADA BUSCAR OS DADOS DO TEMA ESCOLHIDO NO SELECT
    async function buscarTemaPorId(id: string) {
        await buscar(`/temas/${id}`, setTema, {
            headers: {
                Authorization: token,
            },
        });
    }

    // Função que vai chamaR a service de Buscar para buscarmos todos os Temas do Back - ESSA FUNÇÃO É USADA PARA POPULAR O ARRAY DE TEMAS E EXIBI-LOS NO SELECT
    async function buscarTemas() {
        await buscar('/temas', setTemas, {
            headers: {
                Authorization: token,
            },
        });
    }

    // Função de Efeito Colateral - Sempre que a variavel token, tiver o seu valor alterado
    // uma função é disparada, essa função verifica se o token é IDÊNTICO a "", se sim, isso indica que o usuário NÃO ESTÁ LOGADO.
    // Com isso, o avisamos e enviamos para a tela de Login
    useEffect(() => {
        if (token === '') {
            alert('Você precisa estar logado');
            navigate('/');
        }
    }, [token]);

    // Função de Efeito Colateral - Sempre que o ID for montado pelo React dentro do Componente,
    //  uma função é disparada, ela irá chamar a Função BUSCARTEMAS() e depois verificar se o ID é diferente de undefined.
    // See sim, quer dizer que iremos atualizar uma Postagem, por isso, precisamos chamar a função que irá fazer uma requisição ao back para carregar os dados da Postagem em tela
    useEffect(() => {

        buscarTemas()

        if (id !== undefined) {
            buscarPostagemPorId(id) // esse ID, é o que vem pela a URL da rota do Front End
        }

    }, [id])

    // Função de Efeito Colateral - Sempre que o usuário escolhe um Tema do Select, os dados desse tema são buscados do Back End
    // e salvos no Estado de Tema. Com isso feito, esse useEffect é disparado, atualizando o objeto de Postagem com o Tema escolhido pelo usuário
    useEffect(() => {
        setPostagem({
            ...postagem,
            tema: tema,
        })
    }, [tema])

    // Função que através do evento de mudança de um Input, captura o que foi digitado e através da função setPostagem() atualiza o estado/objeto de Postagem
    function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
        setPostagem({                           // Atualiza o objeto/estado Postagem com os dados digitados no input
            ...postagem,                        // O spread operator (...) espalha os atributos do objeto para facilitar a atualização
            [e.target.name]: e.target.value,    // O lado esquerdo, representa qual input chamou essa função e qual atributo do Objeto Postagem que será acessado, a parte direita pega o valor digitado
            tema: tema,                         // O tema escolhido no Select é vinculado a Postagem AQUI
            usuario: usuario,                   // O usuário logado é vinculado a Postagem AQUI
        });
    }

    function retornar() {
        navigate('/postagens');
    }

    // Função assincrona que vai cadastrar a Postagem ou editar uma Postagem já cadastrada
    async function gerarNovaPostagem(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault()  // Através do parametro E que representa um os eventos do Formulario, impedimos que o Form recarregue a página ao tentar enviar os dados
        setIsLoading(true)  // Muda o estado para verdadeiro, indicando que existe uma requisição sendo processada no back

        if (id != undefined) {  // Se o ID é diferente de undefined, quer dizer que estamos fazendo uma atualização
            try {

                await atualizar(`/postagens`, postagem, setPostagem, {
                    headers: {
                        Authorization: token,
                    },
                })

                alert('Postagem atualizada com sucesso');
                retornar()

            } catch (error: any) {

                if (error.toString().includes('403')) {
                    alert('O token expirou, favor logar novamente')
                    handleLogout()

                } else {

                    alert('Erro ao atualizar a Postagem');
                }
            }
        } else {    // Essa parte referesse ao Cadastro de uma Postagem

            try {

                await cadastrar(`/postagens`, postagem, setPostagem, {
                    headers: {
                        Authorization: token,
                    },
                });

                alert('Postagem cadastrada com sucesso');
                retornar();

            } catch (error: any) {

                if (error.toString().includes('403')) {
                    alert('O token expirou, favor logar novamente')
                    handleLogout()

                } else {

                    alert('Erro ao cadastrar a Postagem');
                }

            }
        }

        setIsLoading(false) // Muda o estado para falso, indicando a requisição já terminou de ser processada
    }

    const carregandoTema = tema.descricao === '';   // Essa constante indica se um tema foi ou não escolhido

    return (
        <div className="container flex flex-col mx-auto items-center">
            <h1 className="text-4xl text-center my-8">{id !== undefined ? 'Editar Postagem' : 'Cadastrar Postagem'}</h1>

            <form onSubmit={gerarNovaPostagem} className="flex flex-col w-1/2 gap-4">
                <div className="flex flex-col gap-2">
                    <label htmlFor="titulo">Titulo da postagem</label>
                    <input
                        value={postagem.titulo}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                        type="text"
                        placeholder="Titulo"
                        name="titulo"
                        required
                        className="border-2 border-slate-700 rounded p-2"
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="titulo">Texto da postagem</label>
                    <input
                        value={postagem.texto}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                        type="text"
                        placeholder="Texto"
                        name="texto"
                        required
                        className="border-2 border-slate-700 rounded p-2"
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <p>Tema da postagem</p>

                    {/* Ao clicarmos em um tema, a função buscarTemaPorId() é chamada com o ID do Tema escolhido, para que seus dados sejam buscados e depois vinculados a postagem */}
                    <select name="tema" id="tema" className='border p-2 border-slate-800 rounded' onChange={(e) => buscarTemaPorId(e.currentTarget.value)}>
                        <option value="" selected disabled>Selecione um tema</option>

                        {/* Dentro do Select, percorremos o ARRAY de Temas, carregados com os Temas do Back End, usando o MAP e para cada um criamos uma tag OPTION para exibí-los */}
                        {temas.map((tema) => (
                            <>
                                <option value={tema.id} >{tema.descricao}</option>
                            </>
                        ))}

                    </select>

                </div>

                <button
                    disabled={carregandoTema}   // Se nenhum tema for escolhido, desabilite o botão
                    type='submit' className='rounded disabled:bg-slate-200 bg-indigo-400 hover:bg-indigo-800 text-white font-bold w-1/2 mx-auto py-2 flex justify-center'>

                    {/* Se carregandoTema for true e isLoding também, isso indica que há um processo sendo feito, então mostre o componente de Carregamento */}
                    {carregandoTema || isLoading ?

                        <RotatingLines
                            strokeColor="white"
                            strokeWidth="5"
                            animationDuration="0.75"
                            width="24"
                            visible={true}
                        />

                        // Senão, verifique se existe um ID, se houver coloque o texto Editar, se não coloque o texto Cadastrar 
                        : id !== undefined ? 'Editar' : 'Cadastrar'}

                </button>
            </form>
        </div>
    );
}

export default FormularioPostagem;