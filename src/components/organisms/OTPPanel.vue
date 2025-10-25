<script setup lang="ts">

import LinkField from "@/components/atoms/LinkField.vue";
import PasswordRecoveryRequestForm from "@/components/molecules/PasswordRecoveryRequestForm.vue";
</script>

<template>
  <div class="login-panel">
    <PasswordRecoveryRequestForm />
    <div class="links-container">
      <LinkField
          label="Lembrou sua senha? Clique aqui"
          url="/forgot-password"
      />
    </div>
  </div>
</template>

<style scoped>

</style>