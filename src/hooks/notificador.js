import { NOTIFICAR } from '../stores/tipo-mutacoes'

export default () => {
    const notificar = (tipo, titulo, texto) => {
        store.commit(NOTIFICAR, {
            titulo,
            texto,
            tipo
        });
    }

    return {
        notificar
    }
}
