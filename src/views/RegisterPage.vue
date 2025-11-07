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
      <RegisterPanel />
    </template>
  </LoginTemplate>
</template>

<script setup>
import LoginTemplate from '@/templates/LoginTemplate.vue';
import BrandingPanel from '@/components/organisms/BrandingPanel.vue';
import RegisterPanel from "@/components/organisms/RegisterPanel.vue";
</script>