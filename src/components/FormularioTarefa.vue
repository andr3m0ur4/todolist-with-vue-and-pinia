<template>
  <div class="box formulario">
    <div class="columns">
      <div class="column is-5" role="form" aria-label="Formulario para criação de uma nova tarefa">
        <input type="text" v-model="descricao" class="input" placeholder="Qual tarefa você deseja iniciar?">
      </div>
      <div class="column is-3">
        <div class="select">
          <select v-model="idProjeto">
            <option value="">Selecione o projeto</option>
            <option :value="projeto.id" v-for="projeto in projetos" :key="projeto.id">
              {{ projeto.nome }}
            </option>
          </select>
        </div>
      </div>
      <div class="column">
        <TemporizadorTarefa @aoTemporizadorFinalizado="salvarTarefa" />
      </div>
    </div>
  </div>
</template>

<script>
import { TipoNotificacao } from '../interfaces/INotificacao';
import { NOTIFICAR } from '../stores/tipo-mutacoes';
import { useProjetoStore } from '../stores/project';
import { computed, defineComponent, ref } from 'vue';
import TemporizadorTarefa from "./TemporizadorTarefa.vue";
import { useNotificationStore } from '../stores/notification';

export default defineComponent({
  name: 'FormularioTarefa',
  props: ['aoSalvarTarefa'],
  components: {
    TemporizadorTarefa
  },
  setup(props, { emit }) {
    const projectStore = useProjetoStore();
    const notificationStore = useNotificationStore()
    const descricao = ref('');
    const idProjeto = ref('');
    const projetos = computed(() => projectStore.getProjetos);

    const salvarTarefa = (tempoDecorrido) => {
      const projeto = projetos.value.find(projeto => projeto.id == idProjeto.value);
      if (!projeto) {
        notificationStore.notificar(
          'Ops!',
          'Selecione um projeto antes de finalizar a tarefa!',
          TipoNotificacao.FALHA
        );
        return;
      }

      emit('aoSalvarTarefa', {
        duracaoEmSegundos: tempoDecorrido,
        descricao: descricao.value,
        projeto: projetos.value.find(projeto => projeto.id == idProjeto.value)
      });
      descricao.value = '';
    }

    return {
      descricao,
      idProjeto,
      projetos,
      salvarTarefa
    };
  }
});
</script>

<style scoped>
  .box.formulario {
    color: var(--text-primary);
    background-color: var(--bg-primary);
  }
</style>