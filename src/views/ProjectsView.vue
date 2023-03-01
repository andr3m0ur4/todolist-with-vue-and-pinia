<template>
  <section class="projetos">
    <h1 class="title">Projetos</h1>
    <Suspense>
      <RouterView />

    </Suspense>
  </section>
</template>

<script>
import { defineComponent } from 'vue';
import { RouterView } from 'vue-router';

export default defineComponent({
    name: "ProjectsVue",
    components: { RouterView }
});
</script>

<style scoped>
.projetos {
  padding: 1.25rem;
}
</style>