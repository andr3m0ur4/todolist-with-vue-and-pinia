<template>
  <div class="box has-text-weight-bold">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'BoxTarefa'
};
</script>

<style scoped>
  .box {
    background-color: #faf0ca;
  }
</style>