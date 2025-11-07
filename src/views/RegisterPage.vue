<template>
  <LoginTemplate>
    <template #branding>
      <BrandingPanel>
        Encontre pessoas para seu
        <strong>Projeto Integrador</strong> e inicie a jornada rumo à
        <strong>excelência acadêmica!</strong>
      </BrandingPanel>
    </template>
    <template #form>
      <LoginPanel />
    </template>
  </LoginTemplate>
</template>

<script setup>
import LoginTemplate from '@/templates/LoginTemplate.vue';
import BrandingPanel from '@/components/organisms/BrandingPanel.vue';
import LoginPanel from '@/components/organisms/LoginPanel.vue';
</script>