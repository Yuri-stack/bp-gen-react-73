import { toast } from 'react-toastify';

// Função que vai receber uma mensagem e o tipo da mensagem (erro, sucesso e info) e criar o alerta personalizado
export function toastAlerta(mensagem: string, tipo: string) {

    // Estrutura de decisão baseada em caso, para uma 
    switch (tipo) {

        // se o param. tipo tiver o valor SUCESSO, esse caso é executado, ou seja, um alerta de SUCESSO com a msg é exibido
        case 'sucesso':
            toast.success(mensagem, {
                position: 'top-right',
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                theme: 'colored',
                progress: undefined,
            });
            break;

        // se o param. tipo tiver o valor INFO, esse caso é executado, ou seja, um alerta INFORMATIVO com a msg é exibido
        case 'info':
            toast.info(mensagem, {
                position: 'top-right',
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                theme: 'colored',
                progress: undefined,
            });
            break;

        // se o param. tipo tiver o valor ERRO, esse caso é executado, ou seja, um alerta de ERRO com a msg é exibido
        case 'erro':
            toast.error(mensagem, {
                position: 'top-right',
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                theme: 'colored',
                progress: undefined,
            });
            break;

        // se o param. tipo tiver um valor diferente dos demais, um alerta do tipo INFO é executado, ou seja, um alerta INFORMATIVO com a msg é exibido
        default:
            toast.info(mensagem, {
                position: 'top-right',
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                theme: 'colored',
                progress: undefined,
            });
            break;
    }
}