import { defineStore } from 'pinia';
import http from '../http';

export const useProjetoStore = defineStore('projeto', {
    state: () => ({
        projeto: {
            projetos: []
        }
    }),
    getters: {
        getProjetos: state => state.projeto.projetos
    },
    actions: {
        obterProjetos() {
            http.get('projetos')
                .then(response => this.projeto.projetos = response.data);
        },
        cadastrarProjeto(nomeDoProjeto) {
            return http.post('projetos', {
                nome: nomeDoProjeto
            });
        },
        alterarProjeto(projeto) {
            return http.put(`projetos/${projeto.id}`, projeto);
        },
        removerProjeto(id) {
            http.delete(`projetos/${id}`)
                .then(() => this.excluirProjeto(id));
        },
        excluirProjeto(id) {
            this.projeto.projetos = this.projeto.projetos.filter(item => item.id != id);
        }
    }
})
