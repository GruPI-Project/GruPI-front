<template>
  <main class="login-layout">
    <div class="left-side">
      <slot name="branding"></slot>
    </div>
    <div class="right-side">
      <slot name="form"></slot>
    </div>
  </main>
</template>

<script>

</script>

<style scoped>
.login-layout {
  display: grid;
  grid-template-columns: 30% 70%;
  min-height: 100vh;
  width: 100%;
}

.left-side {
  background-color: var(--primary-500);
}

.right-side {
  background-color: #F8F5F0; /* Off-white */
  display: flex;
  align-items: center;
  justify-content: center;
}

@media (max-width: 1100px) {
  .login-layout {
    grid-template-columns: 1fr;
  }
  .left-side {
    display: none;
  }
}
</style>