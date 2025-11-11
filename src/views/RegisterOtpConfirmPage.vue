<template>
  <LoginTemplate>
    <template #branding>
      <BrandingPanel>
        <strong>Confirme seu Registro</strong>
        <div style="font-size: 22px">
          Enviamos um código de 6 dígitos em seu email acadêmico.
        </div>
      </BrandingPanel>
    </template>
    <template #form>
      <RegisterOtpValidatePanel />
    </template>
  </LoginTemplate>
</template>

<script setup>
import LoginTemplate from '@/templates/LoginTemplate.vue';
import BrandingPanel from '@/components/organisms/BrandingPanel.vue';
import RegisterOtpValidatePanel from '@/components/organisms/RegisterOtpValidatePanel.vue';
</script>

<style scoped>
</style>