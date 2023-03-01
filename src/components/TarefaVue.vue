<template>
  <BoxTarefa>
    <div class="columns clicavel" @click="tarefaClicada">
      <div class="column is-5">
        {{ tarefa.descricao || 'Tarefa sem descrição' }}
      </div>
      <div class="column is-3">
        {{ tarefa.projeto?.nome || 'N/D' }}
      </div>
      <div class="column">
        <CronometroTarefa :tempoEmSegundos="tarefa.duracaoEmSegundos" />
      </div>
    </div>
  </BoxTarefa>
</template>

<script>
import CronometroTarefa from './CronometroTarefa.vue';
import BoxTarefa from './BoxTarefa.vue';

export default {
  name: 'TarefaVue',
  emits: ['aoTarefaClicada'],
  components: {
    CronometroTarefa,
    BoxTarefa
  },
  props: {
    tarefa: {
      type: Object,
      required: true
    }
  },
  methods: {
    tarefaClicada() {
      this.$emit('aoTarefaClicada', this.tarefa);
    }
  }
};
</script>

<style scoped>
  .clicavel {
    cursor: pointer;
  }
</style>