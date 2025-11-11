<script setup lang="ts">

import LinkField from "@/components/atoms/LinkField.vue";
import RegisterOtpValidateForm from "@/components/molecules/RegisterOtpValidateForm.vue";

</script>

<template>
  <div class="login-panel">
    <RegisterOtpValidateForm />
    <div class="links-container">
      <LinkField
          label="Deseja fazer login?"
          url="/login"
      />
    </div>
  </div>
</template>

<style scoped>

</style>