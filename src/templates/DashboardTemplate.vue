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
  background-color: #FAF7F5; /* Cor de fundo creme para toda a página */
  min-height: 100vh;
}

.header-section {
  /* O header ocupará a largura total, mas o conteúdo dentro dele será centralizado pelo próprio organismo */
  width: 100%;
}

.main-section {
  /* Esta é a lógica para evitar que o conteúdo se estique em telas ultrawide */
  max-width: 1440px;
  margin: 0 auto; /* Centraliza o conteúdo principal */
  padding: 2rem;
}
</style>