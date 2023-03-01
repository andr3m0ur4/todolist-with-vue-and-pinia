<script setup>
import { RouterLink, RouterView } from 'vue-router'
import BarraLateral from './components/BarraLateral.vue';
import NotificacoesVue from './components/NotificacoesVue.vue';
</script>

<script>
export default {
  name: 'App',
  data() {
    return {
      modoEscuroAtivo: false
    }
  },
  methods: {
    trocarTema(modoEscuroAtivo) {
      this.modoEscuroAtivo = modoEscuroAtivo;
    }
  },
  components: {
    BarraLateral,
    NotificacoesVue
  }
}
</script>

<template>
  <main class="columns is-gapless is-multiline" :class="{ 'modo-escuro': modoEscuroAtivo }">
    <div class="column is-one-quarter">
      <BarraLateral @aoTemaAlterado="trocarTema" />
    </div>
    <div class="column is-three-quarters conteudo">
      <NotificacoesVue />

      <RouterView />
    </div>
  </main>
</template>

<style scoped>
main {
  --bg-primary: #fff;
  --text-primary: #000;
}
main.modo-escuro {
  --bg-primary: #2b2d42;
  --text-primary: #ddd;
}
.conteudo {
  background-color: var(--bg-primary);
}
</style>

<style>
.lista {
  padding: 1.25rem;
}
</style>