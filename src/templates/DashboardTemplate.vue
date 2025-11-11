<template>
  <div class="dashboard-layout">
    <header class="header-section">
      <slot name="header"></slot>
    </header>

    <main class="main-section">
      <slot name="main"></slot>
    </main>
  </div>
</template>

<style scoped>
.dashboard-layout {
  background-color: #F8F5F0; /* Cor de fundo creme para toda a página */
  min-height: 100vh;
}

.header-section {
  /* O header ocupará a largura total, mas o conteúdo dentro dele será centralizado pelo próprio organismo */
  width: 100%;
}

.main-section {
  /* Esta é a lógica para evitar que o conteúdo se estique em telas ultrawide */
  margin: 0 auto; /* Centraliza o conteúdo principal */
  padding: 2rem;
}


</style>
<script setup lang="ts">
</script>