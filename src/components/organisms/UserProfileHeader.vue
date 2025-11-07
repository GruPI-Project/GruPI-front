<script setup lang="ts">
import { computed } from 'vue';
import { useAuthStore } from '@/stores/auth.store';
import Button from 'primevue/button';
import Tag from 'primevue/tag';
import AppLogo from '@/components/atoms/AppLogo.vue';
import router from "@/router";

const authStore = useAuthStore();
const user = computed(() => authStore.user);

const handleLogout = () => {
  authStore.logout();
  router.push('/login');
}
</script>

<template>
  <header class="user-header">
    <div class="header-content">
      <AppLogo class="logo" />
      <div class="user-info-card" v-if="user">
        <p><strong>Nome:</strong> {{ user.first_name }} {{ user.last_name }}</p>
        <p><strong>E-mail Acadêmico:</strong> {{ user.email }}</p>
        <p><strong>Polo:</strong> {{ user.profile.polo }}</p>
        <p><strong>DRP:</strong> {{ user.profile.drp }} <strong>PI:</strong> {{ user.profile.projeto_integrador }} <strong>Eixo:</strong> {{ user.profile.eixo }}</p>
        <div class="user-actions">
          <Button label="Editar Perfil" icon="pi pi-user-edit" text />
          <Button label="Alterar Senha" icon="pi pi-lock" text />
          <Button label="Sair" icon="pi pi-sign-out" text @click="handleLogout" />
        </div>
      </div>
      <div class="skills-card">
        <h3>Habilidades</h3>
        <div class="skills-tags">
          <Tag value="GitHub" />
          <Tag value="HTML" />
          <Tag value="Organização" />
          <Tag value="Canvas" />
          <Tag value="Front-End" />
          <Tag value="Back-End" />
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped>
.user-header {
  background-color: #9E1B32;
  color: white;
  padding: 2rem;
  border-bottom: 5px solid #5E0B15;
}
.header-content {
  max-width: 1440px;
  margin: 0 auto;
  display: flex;
  align-items: flex-start;
  gap: 2rem;
}
.logo { font-size: 2.5rem; }
.user-info-card, .skills-card {
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 1rem;
  flex: 1;
}
.user-info-card p { margin: 0.25rem 0; }
.user-actions { margin-top: 1rem; }
.user-actions .p-button { color: white; text-decoration: underline; }
.skills-card h3 { margin-top: 0; }
.skills-tags { display: flex; flex-wrap: wrap; gap: 0.5rem; }
.skills-tags .p-tag { background-color: rgba(255, 255, 255, 0.2); }
</style>