import { defineStore } from 'pinia';
import http from '../http';

export const useTaskStore = defineStore('task', {
    state: () => ({
        tarefa: {
            tarefas: []
        }
    }),
    getters: {
        getTarefas(store) {
            return store.tarefa.tarefas;
        }
    },
    actions: {
        obterTarefas(filtro) {
            let url = 'tarefas';
            if (filtro) {
                url += `?q=${filtro}`;
            }

            http.get(url)
                .then(response => this.tarefa.tarefas = response.data);
        },
        cadastrarTarefa(tarefa) {
            http.post('tarefas', tarefa)
                .then(response => this.adicionaTarefa(response.data));
        },
        adicionaTarefa(tarefa) {
            this.tarefa.tarefas.push(tarefa);
        },
        alterarTarefa(tarefa) {
            return http.put(`tarefas/${tarefa.id}`, tarefa)
                .then(response => this.atualizarTarefa(tarefa));
        },
        atualizarTarefa(tarefa) {
            const index = this.tarefa.tarefas.findIndex(item => item.id == tarefa.id);
            this.tarefa.tarefas[index] = tarefa;
        },
        removerTarefa(id) {
            this.tarefa.tarefas = this.tarefa.tarefas.filter(item => item.id != id);
        },
    }
})