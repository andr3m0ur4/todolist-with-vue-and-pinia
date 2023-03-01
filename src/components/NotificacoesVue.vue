<template>
  <div class="notificacoes">
    <article class="message" :class="contexto[notificacao.tipo]"
      v-for="notificacao in notificacoes" :key="notificacao.id">
      <div class="message-header">
        {{ notificacao.titulo }}
      </div>
      <div class="message-body">
        {{ notificacao.texto }}
      </div>
    </article>
  </div>
</template>

<script>
import { computed } from 'vue';
import { TipoNotificacao } from '../interfaces/INotificacao';
import { useNotificationStore } from '../stores/notification';

export default {
  name: 'NotificacoesVue',
  data() {
    return {
      contexto: {
        [TipoNotificacao.SUCESSO]: 'is-success',
        [TipoNotificacao.FALHA]: 'is-warning',
        [TipoNotificacao.ATENCAO]: 'is-danger'
      }
    }
  },
  setup() {
    const store = useNotificationStore();

    return {
      notificacoes: computed(() => store.notificacoes)
    }
  }
}
</script>

<style scoped>
.notificacoes {
  position: absolute;
  right: 0;
  width: 300px;
  padding: 8px;
  z-index: 1;
}
</style>