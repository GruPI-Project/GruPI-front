<script setup>
import LinkField from "@/components/atoms/LinkField.vue";
import RegisterForm from "@/components/molecules/RegisterForm.vue";
</script>

<template>
  <div class="login-panel">
    <h2 class="welcome-text">
      Cadastre-se e faça parte de um <strong>ambiente colaborativo!</strong>
    </h2>
    <RegisterStepperForm />
    <div class="links-container">
      <LinkField
          label="Já possui uma conta? Entre aqui"
          url="/login"
      />
    </div>
  </div>
</template>

<style scoped>
</style>