import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'

import Footer from './components/Footer/Footer'
import Navbar from './components/Navbar/Navbar'

import Login from './pages/Login/Login'
import Cadastro from './pages/Cadastro/Cadastro'
import Home from './pages/Home/Home'

function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Navbar />
                <div className='min-h-[80vh]'>
                    <Routes>
                    <Route path="/" element={<Login />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/cadastro" element={<Cadastro />} />
                        <Route path="/home" element={<Home />} />
                    </Routes>
                </div>
                <Footer />
            </BrowserRouter>
        </ AuthProvider>
    )
}

export default App
