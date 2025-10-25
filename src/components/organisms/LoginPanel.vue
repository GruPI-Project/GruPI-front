<script setup>
import LoginForm from "@/components/molecules/LoginForm.vue";
import LinkField from "@/components/atoms/LinkField.vue";
</script>

<template>
  <div class="login-panel">
    <h2 class="welcome-text">
      Entre e faça parte de um <strong>ambiente colaborativo!</strong>
    </h2>
    <LoginForm />
    <div class="links-container">
      <LinkField
        label="Esqueceu sua senha?"
        url="/password-reset/request"
      />
      <LinkField
        label="Cadastre-se"
        url="/register"
      />
    </div>
  </div>
</template>

<style scoped>
</style>