<template>
  <div>
    <RouterLink to="/projetos/novo" class="button">
      <span class="icon is-small">
        <i class="fas fa-plus"></i>
      </span>
      <span>Novo projeto</span>
    </RouterLink>
    <table class="table is-fullwidth">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nome do Projeto</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="projeto in projetos" :key="projeto.id">
          <td>{{ projeto.id }}</td>
          <td>{{ projeto.nome }}</td>
          <td>
            <RouterLink :to="`/projetos/${projeto.id}`" class="button">
              <span class="icon is-small">
                <i class="fas fa-pencil-alt"></i>
              </span>
            </RouterLink>
            <button class="button ml-2 is-danger" @click="excluir(projeto.id)">
              <span class="icon is-small">
                <i class="fas fa-trash"></i>
              </span>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { computed, defineComponent, ref } from 'vue';
import { RouterLink } from 'vue-router';
import { useProjetoStore } from '../../stores/project'

export default defineComponent({
  name: 'ListProject',
  data() {
    return {};
  },
  methods: {
    excluir(id) {
      this.store.removerProjeto(id);
    }
  },
  setup() {
    const store = useProjetoStore();
    store.obterProjetos();

    return {
      projetos: computed(() => store.getProjetos),
      store
    };
  },
  components: { RouterLink }
});
</script>

<style scoped>
  
</style>