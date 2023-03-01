<template>
  <FormularioTarefa @aoSalvarTarefa="salvarTarefa" />
  <div class="lista">
    <div class="field">
      <p class="control has-icons-left">
        <input type="text" class="input" placeholder="Digite para filtrar" v-model="filtro">
        <span class="icon is-small is-left">
          <i class="fas fa-search"></i>
        </span>
      </p>
    </div>
    <TarefaVue v-for="(tarefa, index) in tarefas"
      :key="index"
      :tarefa="tarefa"
      @aoTarefaClicada="selecionarTarefa"
    />
    <BoxTarefa v-if="listaEstaVazia">
      Você não está muito produtivo hoje
      <span class="has-text-weight-bold">=(</span>
    </BoxTarefa>
    <ModalTask :mostrar="tarefaSelecionada != null">
      <template v-slot:cabecalho>
        <p class="modal-card-title">Editando uma tarefa</p>
        <button class="delete" @click="fecharModal" aria-label="close"></button>
      </template>
      <template v-slot:corpo>
        <div class="field">
          <label for="descricaoDaTarefa" class="label">
            Descrição
          </label>
          <input
            type="text"
            class="input"
            v-model="tarefaSelecionada.descricao"
            id="descricaoDaTarefa"
          >
        </div>
      </template>
      <template v-slot:rodape>
        <button class="button is-success" @click="alterarTarefa">Salvar alterações</button>
        <button @click="fecharModal" class="button">Cancelar</button>
      </template>
    </ModalTask>
  </div>
</template>

<script>
import { computed, ref, watchEffect } from 'vue';
import FormularioTarefa from '../components/FormularioTarefa.vue';
import TarefaVue from '../components/TarefaVue.vue';
import BoxTarefa from '../components/BoxTarefa.vue';
import { useTaskStore } from '../stores/task';
import { useProjetoStore } from '../stores/project';
import ModalTask from '../components/ModalTask.vue';

export default {
  name: 'App',
  components: {
    FormularioTarefa,
    TarefaVue,
    BoxTarefa,
    ModalTask
},
  data() {
    return {
      tarefaSelecionada: null
    }
  },
  methods: {
    salvarTarefa(tarefa) {
      this.taskStore.cadastrarTarefa(tarefa);
    },
    selecionarTarefa(tarefa) {
      this.tarefaSelecionada = tarefa;
    },
    fecharModal() {
      this.tarefaSelecionada = null;
    },
    alterarTarefa() {
      this.taskStore.alterarTarefa(this.tarefaSelecionada)
        .then(() => this.fecharModal());
    }
  },
  computed: {
    listaEstaVazia() {
      return this.tarefas.length === 0;
    }
  },
  setup() {
    const taskStore = useTaskStore();
    const projectStore = useProjetoStore();
    taskStore.obterTarefas();
    projectStore.obterProjetos();

    const filtro = ref('');

    const tarefas = computed(() => taskStore.getTarefas.filter(
      tarefa => !filtro.value || tarefa.descricao.includes(filtro.value)
    ));

    watchEffect(() => {
      taskStore.obterTarefas(filtro.value);
    });

    return {
      tarefas: computed(() => taskStore.getTarefas),
      taskStore,
      filtro
    }
  }
};
</script>

<style>
</style>