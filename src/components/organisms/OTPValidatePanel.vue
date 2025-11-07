<script setup lang="ts">

import LinkField from "@/components/atoms/LinkField.vue";
import OtpValidateForm from "@/components/molecules/OtpValidateForm.vue";

</script>

<template>
  <div class="login-panel">
    <OtpValidateForm />
    <div class="links-container">
      <LinkField
          label="Lembrou sua senha? Clique aqui"
          url="/login"
      />
    </div>
  </div>
</template>

<style scoped>

</style>