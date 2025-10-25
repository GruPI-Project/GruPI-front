<template>
  <LoginTemplate>
    <template #branding>
      <BrandingPanel>
        <strong>Esqueceu a Senha?</strong>
        <div style="font-size: 22px">
          Preencha o seu e-mail para recuperar.
        </div>
      </BrandingPanel>
    </template>
    <template #form>
      <RequestPasswordPanel />
    </template>
  </LoginTemplate>
</template>

<script setup>
import LoginTemplate from '@/templates/LoginTemplate.vue';
import BrandingPanel from '@/components/organisms/BrandingPanel.vue';
import RequestPasswordPanel from '@/components/organisms/RequestPasswordPanel.vue';
</script>

<style scoped>
</style>