<template>
  <LoginTemplate>
    <template #branding>
      <BrandingPanel>
        <strong>Verifique seu E-mail</strong>
        <div style="font-size: 22px">
          Enviamos um código de 6 dígitos em seu e-mail acadêmico.
        </div>
      </BrandingPanel>
    </template>
    <template #form>
      <OTPPanel />
    </template>
  </LoginTemplate>
</template>

<script setup>
import LoginTemplate from '@/templates/LoginTemplate.vue';
import BrandingPanel from '@/components/organisms/BrandingPanel.vue';
import OTPPanel from '@/components/organisms/OTPPanel.vue';
</script>

<style scoped>
</style>