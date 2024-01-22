import { Link } from 'react-router-dom'
import Tema from '../../../models/Tema'

// Definimos uma Interface chamada CardTemasProps, e indicamos que sua estrutura contém uma propriedade chamada tema
interface CardTemaProps {
    tema: Tema  // A propriedade tema é um objeto da Model Tema, ou seja, um objeto com id e descricao
}

function CardTemas({ tema }: CardTemaProps) {   // Definimos que o CardTemas recebe uma propriedade chamada tema e sua estrutura segue a Interface CardTemaProps
    return (
        <div className='border flex flex-col rounded-2xl overflow-hidden justify-between'>
            <header className='py-2 px-6 bg-indigo-800 text-white font-bold text-2xl'>
                Tema
            </header>

            <p className='p-8 text-3xl bg-slate-200 h-full'>
                {tema.descricao}    {/* tema é o objeto que é recebido por meio da props. e, descricao é o atributo do objeto */}
            </p>

            <div className="flex">
                {/* Essa rota envia o usuário para o formulário de edição, passando em sua url, o id do Tema que vai ser editado */}
                <Link to={`/editarTema/${tema.id}`} className='w-full text-slate-100 bg-indigo-400 hover:bg-indigo-800 flex items-center justify-center py-2'>
                    <button>Editar</button>
                </Link>

                {/* Essa rota envia o usuário para o formulário de exclusão, passando em sua url, o id do Tema que vai ser excluído */}
                <Link to={`/deletarTema/${tema.id}`} className='text-slate-100 bg-red-400 hover:bg-red-700 w-full flex items-center justify-center'>
                    <button>Deletar</button>
                </Link>

            </div>
        </div>
    )
}

export default CardTemas