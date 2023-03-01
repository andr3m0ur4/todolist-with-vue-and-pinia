<template>
  <form @submit.prevent="salvar">
    <div class="field">
      <label for="nomeDoProjeto" class="label">
        Nome do Projeto
      </label>
      <input type="text" v-model="nomeDoProjeto" id="nomeDoProjeto" class="input">
    </div>
    <div class="field">
      <button class="button" type="submit">
        Salvar
      </button>
    </div>
  </form>
</template>

<script>
import { TipoNotificacao } from '../../interfaces/INotificacao';
import { defineComponent, ref } from 'vue';
import { useProjetoStore } from '../../stores/project'
import { useNotificationStore } from '../../stores/notification'
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'FormProject',
  props: {
    id: {
      type: String
    }
  },
  setup(props) {
    const router = useRouter();
    const store = useProjetoStore();
    const notificadorStore = useNotificationStore();
    const nomeDoProjeto = ref('');

    if (props.id) {
      const projeto = store.getProjetos.find(projeto => projeto.id == props.id);
      nomeDoProjeto.value = projeto?.nome || '';
    }

    const lidarComSucesso = () => {
      nomeDoProjeto.value = '';
      notificadorStore.notificar(TipoNotificacao.SUCESSO, 'Excelente!', 'O projeto foi cadastrado com sucesso!');
      router.push('/projetos');
    }

    const salvar = () => {
      if (props.id) {
        store.alterarProjeto({
          id: props.id,
          nome: nomeDoProjeto.value
        })
          .then(() => lidarComSucesso());
      } else {
        store.cadastrarProjeto(nomeDoProjeto.value)
          .then(() => lidarComSucesso())
      }
    }

    return {
      nomeDoProjeto,
      salvar
    };
  }
});
</script>

<style scoped>
  
</style>