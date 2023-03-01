import { defineStore } from 'pinia';

export const useNotificationStore = defineStore('notification', {
    state: () => ({
        notificacoes: []
    }),
    actions: {
        notificar(tipo, titulo, texto) {
            const novaNotificacao = { tipo, titulo, texto };
            novaNotificacao.id = new Date().getTime();
            this.notificacoes.push(novaNotificacao);

            setTimeout(() => {
                this.notificacoes = this.notificacoes.filter(notificacao => {
                    return notificacao.id != novaNotificacao.id
                });
            }, 3000);
        }
    }
});
