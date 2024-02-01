import { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../contexts/AuthContext'
import { toastAlerta } from '../../utils/toastAlerta'

function Navbar() {
    let navigate = useNavigate()

    const { usuario, handleLogout } = useContext(AuthContext)

    function logout() {
        handleLogout()
        toastAlerta('Usuário deslogado com sucesso', 'sucesso')
        navigate('/login')
    }

    let navbarComponent

    if (usuario.token !== "") {
        navbarComponent = (
            <div className='w-full bg-indigo-900 text-white flex justify-center py-4'>
                <div className="container flex justify-between text-lg">
                    <Link to='/home' className='text-2xl font-bold uppercase'>Blog Pessoal</Link>

                    <div className='flex gap-4'>
                        <Link to='/postagens'>Postagens</Link>
                        <Link to='/temas'>Temas</Link>
                        <Link to='/cadastroTema'>Cadastrar tema</Link>
                        <Link to='/perfil'>Perfil</Link>
                        <Link to='' onClick={logout}>Sair</Link>
                    </div>
                </div>
            </div>
        )
    } else {
        navbarComponent = (
            <div className='w-full bg-indigo-900 text-white flex justify-center py-4'>
                <div className="container flex justify-between text-lg">
                    <Link to='' className='text-2xl font-bold uppercase'>Blog Pessoal</Link>

                    <div className='flex gap-4'>
                        <Link to='/cadastro'>Cadastre-se</Link>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <>
            {navbarComponent}
        </>
    )
}

export default Navbar