import { Link } from 'react-router-dom'
import Postagem from '../../../models/Postagem'

// Definimos uma Interface chamada CardPostagemProps, e indicamos que sua estrutura contém uma propriedade chamada post
interface CardPostagemProps {
    post: Postagem  // A propriedade post é um objeto da Model Postagem, ou seja, um objeto com id, texto, titulo, etc
}

function CardPostagem({ post }: CardPostagemProps) {    // Definimos que o CardPostagem recebe uma propriedade chamada post e sua estrutura segue a Interface CardPostagemProps
    return (
        <div className='border-slate-900 border flex flex-col rounded overflow-hidden justify-between'>
            <div>
                <div className="flex w-full bg-indigo-400 py-2 px-4 items-center gap-4">
                    <img src={post.usuario?.foto} className='h-12 rounded-full' alt="" />   {/* aqui exibimos a foto do usuário, caso a postagem tenha sido cadastrada com um Usuário diferente de null  */}
                    <h3 className='text-lg font-bold text-center uppercase '>{post.usuario?.nome}</h3>
                </div>
                <div className='p-4 '>
                    <h4 className='text-lg font-semibold uppercase'>{post.titulo}</h4> {/* post é o objeto que é recebido por meio da props. e, titulo é o atributo do objeto */}
                    <p>{post.texto}</p>
                    <p>Tema: {post.tema?.descricao}</p>
                    <p>Data: {new Intl.DateTimeFormat(undefined, {
                        dateStyle: 'full',
                        timeStyle: 'medium',
                    }).format(new Date(post.data))}</p>
                </div>
            </div>
            <div className="flex">
                {/* Essa rota envia o usuário para o formulário de edição, passando em sua url, o id da Postagem que vai ser editada */}
                <Link to={`/editarPostagem/${post.id}`} className='w-full text-white bg-indigo-400 hover:bg-indigo-800 flex items-center justify-center py-2'>
                    <button>Editar</button>
                </Link>

                {/* Essa rota envia o usuário para o formulário de exclusão, passando em sua url, o id da Postagem que vai ser excluída */}
                <Link to={`/deletarPostagem/${post.id}`} className='text-white bg-red-400 hover:bg-red-700 w-full flex items-center justify-center'>
                    <button>Deletar</button>
                </Link>
            </div>
        </div>
    )
}

export default CardPostagem