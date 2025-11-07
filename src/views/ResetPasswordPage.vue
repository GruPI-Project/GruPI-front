<template>
  <LoginTemplate>
    <template #branding>
      <BrandingPanel>
        <strong>Esqueceu a Senha?</strong>
        <div style="font-size: 22px">
          <strong>Alterar a Senha</strong>
          Digite a sua nova senha de acesso.
        </div>
      </BrandingPanel>
    </template>
    <template #form>
      <ResetPasswordPanel />
    </template>
  </LoginTemplate>
</template>

<script setup>
import LoginTemplate from '@/templates/LoginTemplate.vue';
import BrandingPanel from '@/components/organisms/BrandingPanel.vue';

</script>

<style scoped>
</style>