import { Link } from 'react-router-dom';
import homeLogo from '../../assets/home.png'
import ListaPostagens from '../../components/postagens/listaPostagens/ListaPostagens';
import ModalPostagem from '../../components/postagens/modalPostagem/ModalPostagem';

function Home() {
    return (
        <>
            <div className="bg-indigo-900 flex justify-center">
                <div className='container grid grid-cols-2 text-white'>
                    <div className="flex flex-col gap-4 items-center justify-center py-4">
                        <h2 className='text-5xl font-bold'>Seja Bem Vinde!</h2>
                        <p className='text-xl'>Expresse aqui seus pensamentos e opniões</p>

                        <div className="flex justify-around gap-4">
                            <ModalPostagem />   {/* Colocamos o Componente ModalPostagem aqui, pois ele irá abrir o Modal com o Formulário */}
                            <button className='rounded bg-white text-blue-800 py-2 px-4'>
                                <Link to="/postagens">Ver Postagens</Link>
                            </button>
                        </div>
                    </div>

                    <div className="flex justify-center ">
                        <img src={homeLogo} alt="" className='w-2/3' />
                    </div>
                </div>
            </div>

            <ListaPostagens />  {/* Estamos inserindo aqui o Componente de Listagem para mostrar as Postagens no Home também */}

        </>
    );
}

export default Home