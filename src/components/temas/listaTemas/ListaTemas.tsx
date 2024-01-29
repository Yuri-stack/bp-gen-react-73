import { useContext, useEffect, useState } from 'react';
import { DNA } from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthContext';
import Tema from '../../../models/Tema';
import { buscar } from '../../../services/Service';
import CardTemas from '../cardTemas/CardTemas';

function ListaTemas() {

    // Variavel de Estado de Temas - Registra um Array que possuí Objetos da Model Tema. Usada para armazena os dados que foram digitados nos inputs do formulario
    const [temas, setTemas] = useState<Tema[]>([]); // Indicamos que o temas é um Array de Objetos de Temas, e a iniciamos com um array vazio

    // Criamos uma constante que recebe o hook useNavigate, para podermos redirecionar o usuário
    const navigate = useNavigate();

    // Pega as informações que queremos do nosso Contexto através do hook useContexo
    const { usuario, handleLogout } = useContext(AuthContext);
    const token = usuario.token;    // pega o Token do Objeto Usuario

    // Função que vai chamada a service de Buscar para buscarmos os Temas
    async function buscarTemas() {

        try {   // Tenta fazer a requisição, e se houver erro impede que a aplicação pare

            await buscar('/temas', setTemas, {   // Passamos os parametros para Service Buscar(), junto com o Token
                headers: { Authorization: token },
            })

        } catch (error: any) {

            if (error.toString().includes('403')) {                 // Verifica se o erro é o 403 - Proibido que indica que o Token Expirou
                alert('O token expirou, favor logar novamente')     // Avisa ao usuário que deu ruim
                handleLogout()                                      // Chama a função para deslogar o usuário
            }

        }
    }

    // Função de Efeito Colateral - Sempre que a variavel token, tiver o seu valor alterado
    // uma função é disparada, essa função verifica se o token é IDÊNTICO a "", se sim, isso indica que o usuário NÃO ESTÁ LOGADO.
    // Com isso, o avisamos e enviamos para a tela de Login
    useEffect(() => {
        if (token === '') {
            alert('Você precisa estar logado')
            navigate('/login')
        }
    }, [token])


    // Função de Efeito Colateral - Sempre que o array de Temas for carregado em tela, e o seu tamanho for acessado pelo React,
    //  uma função é disparada, chamando a função que irá fazer uma requisição ao back para carregar os Temas em tela
    useEffect(() => {
        buscarTemas()
    }, [temas.length])

    return (
        <>
            {/* Renderização Condicial - Se o tamanho do Array de Tema for 0, mostra o componente de carregamento */}
            {temas.length === 0 && (
                <DNA
                    visible={true}
                    height="200"
                    width="200"
                    ariaLabel="dna-loading"
                    wrapperStyle={{}}
                    wrapperClass="dna-wrapper mx-auto"
                />
            )}

            <div className="flex justify-center w-full my-4">
                <div className="container flex flex-col">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

                        {/* MAP = método responsável por iterar/varrer um array e realizar uma função para cada Item do Array) */}
                        {
                            temas.map((tema) => (  /* tema = representa cada item do array */

                                // Para cada item do Array, será gerado um CardTema para ele, passando as info. desse tema para dentro do Card
                                <>
                                    <CardTemas key={tema.id} tema={tema} />
                                </>
                            ))}

                    </div>
                </div>
            </div>
        </>
    );
}

export default ListaTemas;