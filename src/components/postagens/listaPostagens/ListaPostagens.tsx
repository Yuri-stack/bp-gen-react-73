import { useContext, useEffect, useState } from 'react';
import { DNA } from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthContext';
import Postagem from '../../../models/Postagem';
import { buscar } from '../../../services/Service';
import CardPostagem from '../cardPostagem/CardPostagem';

function ListaPostagens() {

    // Variavel de Estado de Postagens - Registra um Array que possuí Objetos da Model Postagem. Usada para armazena os dados que foram trazidos pela Service
    const [postagens, setPostagens] = useState<Postagem[]>([]);

    // Criamos uma constante que recebe o hook useNavigate, para podermos redirecionar o usuário
    const navigate = useNavigate();

    // Pega as informações que queremos do nosso Contexto através do hook useContexo
    const { usuario, handleLogout } = useContext(AuthContext);
    const token = usuario.token;

    // Função de Efeito Colateral - Sempre que a variavel token, tiver o seu valor alterado
    // uma função é disparada, essa função verifica se o token é IDÊNTICO a "", se sim, isso indica que o usuário NÃO ESTÁ LOGADO.
    // Com isso, o avisamos e enviamos para a tela de Login
    useEffect(() => {
        if (token === '') {
            alert('Você precisa estar logado');
            navigate('/');
        }
    }, [token]);

    // Função que vai chamada a service de Buscar para buscarmos as Postagens
    async function buscarPostagens() {

        try {   // Tenta fazer a requisição, e se houver erro impede que a aplicação pare

            await buscar('/postagens', setPostagens, {  // Passamos os parametros para Service Buscar(), junto com o Token
                headers: {
                    Authorization: token,
                },
            })

        } catch (error: any) {
            if (error.toString().includes('403')) {
                alert('O token expirou, favor logar novamente')
                handleLogout()
            }
        }
    }
    // Função de Efeito Colateral - Sempre que o array de Temas for carregado em tela, e o seu tamanho for acessado pelo React,
    //  uma função é disparada, chamando a função que irá fazer uma requisição ao back para carregar as Postagens em tela
    useEffect(() => {
        buscarPostagens()
    }, [postagens.length])

    return (
        <>
            {/* Renderização Condicial - Se o tamanho do Array de Postagem for 0, mostra o componente de carregamento */}
            {postagens.length === 0 && (
                <DNA
                    visible={true}
                    height="200"
                    width="200"
                    ariaLabel="dna-loading"
                    wrapperStyle={{}}
                    wrapperClass="dna-wrapper mx-auto"
                />
            )}
            <div className='container mx-auto my-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>

                {/* MAP = método responsável por iterar/varrer um array e realizar uma função para cada Item do Array) */}

                {
                    postagens.map((postagem) => (  /* postagem = representa cada item do array */

                        // Para cada item do Array, será gerado um CardPostagem para ele, passando as info. desse tema para dentro do Card
                        <CardPostagem key={postagem.id} post={postagem} />

                    ))}
            </div>
        </>
    );
}

export default ListaPostagens;