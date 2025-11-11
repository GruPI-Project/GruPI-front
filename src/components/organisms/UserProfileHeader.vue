<!--UserProfeHeader-->
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
  // Redirect to logout page which handles comprehensive logout process
  router.push('/logout');
}
</script>

<template>
  <header class="user-header">
    <div class="header-content">
    <div class="logo-panel" >
      <AppLogo />
    </div>
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
  max-height: 30vh;
  display: flex;
  justify-content: center;
}
.header-content {
  margin: 0;
  display: flex;
  align-items: center;
  gap: 1rem;
}

.logo {
  font-size: 1.5rem;
  width: 12rem; /* <-- REDUZA ESTE VALOR (ex: de 22rem para 12rem) */
  height: auto;
}

.logo-panel {
  width: 20rem; /* <-- Experimente este valor. Ajuste se precisar (ex: 15rem, 18rem) */
  height: auto;
  flex-shrink: 0; /* Impede que os outros painéis "amassem" o logo */
}

.user-info-card, .skills-card {
  background-color: #B23A48;
  border-radius: 20px;
  padding: 1rem;
  flex: 1;

  font-size: 1.2rem ;
  font-family: 'Poppins', sans-serif;

}
.user-info-card p { margin: 0.25rem 0; }
.user-actions { margin-top: 1rem; }
.user-actions .p-button { color: white; text-decoration: underline; }
.skills-card h3 { margin-top: 0; }
.skills-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  color: white;


}
.skills-tags .p-tag { background-color: #C2555E;color: white;font-size: 1.2rem; padding: 1rem; border-radius: 15px }
</style>