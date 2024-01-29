import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'

import Footer from './components/Footer/Footer'
import Navbar from './components/Navbar/Navbar'

import Login from './pages/Login/Login'
import Cadastro from './pages/Cadastro/Cadastro'
import Home from './pages/Home/Home'
import ListaTemas from './components/temas/listaTemas/ListaTemas'
import FormularioTema from './components/temas/formularioTema/FormularioTema'
import DeletarTema from './components/temas/deletarTemas/DeletarTema'
import ListaPostagens from './components/postagens/listaPostagens/ListaPostagens'
import FormularioPostagem from './components/postagens/formularioPostagem/FormularioPostagem'
import DeletarPostagem from './components/postagens/deletarPostagem/DeletarPostagem'

function App() {
    return (
        <AuthProvider>  {/* Compartilha com a Aplicação todos os dados do Contexto */}
            <BrowserRouter>
                <Navbar />
                <div className='min-h-[80vh]'>  {/* Define o tamanho minimo das páginas */}
                    <Routes>
                        <Route path="/" element={<Login />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/cadastro" element={<Cadastro />} />
                        <Route path="/home" element={<Home />} />
                        <Route path="/temas" element={<ListaTemas />} />
                        <Route path="/cadastroTema" element={<FormularioTema />} />
                        <Route path="/editarTema/:id" element={<FormularioTema />} />   {/* :id = é uma variavel que vem pela url do Front, que represenda o id do item que vai ser editado */}
                        <Route path="/deletarTema/:id" element={<DeletarTema />} />     {/* :id = é uma variavel que vem pela url do Front, que represenda o id do item que vai ser excluído */}
                        <Route path="/postagens" element={<ListaPostagens />} />
                        <Route path="/cadastroPostagem" element={<FormularioPostagem />} />
                        <Route path="/editarPostagem/:id" element={<FormularioPostagem />} />
                        <Route path="/deletarPostagem/:id" element={<DeletarPostagem />} />
                    </Routes>
                </div>
                <Footer />
            </BrowserRouter>
        </ AuthProvider>
    )
}

export default App
