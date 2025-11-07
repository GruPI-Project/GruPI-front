// src/views/Dashboard.vue
<script setup lang="ts">
import { useAuthStore } from '@/stores/auth.store';
import { useRouter } from 'vue-router';

// Átomos e Moléculas do PrimeVue
import Button from 'primevue/button';
import Card from 'primevue/card';
import ProgressSpinner from 'primevue/progressspinner';
import Tag from 'primevue/tag';

// 1. Instancie a store e o router
const authStore = useAuthStore();
const router = useRouter();

// 2. Crie a função de logout
const handleLogout = async () => {
  await authStore.logout();
  // Redireciona para a página de login após o logout
  router.push('/login');
};
</script>

<template>
  <div class="flex justify-center ">
    <h1 class="my-4 justify-center flex text-2xl font-bold items-center">
      Estes são os seus dados recuperados do servidor. PAGINA DE TESTE TEMPORARIA
    </h1>
  </div>
  <div class="dashboard-container">
    <!-- Estado 1: Carregando (verificando a sessão com o backend) -->
    <div v-if="authStore.status === 'loading'" class="card flex justify-center">
      <ProgressSpinner />
    </div>

    <!-- Estado 2: Autenticado com sucesso -->
    <Card v-else-if="authStore.isAuthenticated && authStore.user" style="width: 25rem; overflow: hidden">

      <template #content>
        <ul class="user-data-list">
          <li><strong>ID (PK):</strong> {{ authStore.user.pk }}</li>
          <li><strong>Nome:</strong> {{ authStore.user.first_name }}</li>
          <li><strong>Email:</strong> {{ authStore.user.email }}</li>
          <li><strong>Profile:</strong> <br> {{authStore.user.profile}} </li>
        </ul>
      </template>
      <template #footer>
        <div class="flex gap-4 mt-1">
          <Button
              label="Logout"
              icon="pi pi-sign-out"
              severity="danger"
              @click="handleLogout"
              class="w-full"
          />
        </div>
      </template>
    </Card>

    <!-- Estado 3: Não autenticado -->
    <Card v-else style="width: 25rem; overflow: hidden">
      <template #title>
        <div class="flex items-center justify-between">
          <span>Acesso Negado</span>
          <Tag severity="danger" value="Não Autenticado"></Tag>
        </div>
      </template>
      <template #content>
        <p>Você precisa estar logado para ver esta página.</p>
      </template>
      <template #footer>
        <div class="flex gap-4 mt-1">
          <Button
              label="Ir para Login"
              icon="pi pi-sign-in"
              @click="router.push('/login')"
              class="w-full"
          />
        </div>
      </template>
    </Card>
  </div>
</template>

<style scoped>
.dashboard-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f0f2f5; /* Um fundo suave */
}

.user-data-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.user-data-list li {
  padding: 0.5rem 0;
  border-bottom: 1px solid #dee2e6;
}

.user-data-list li:last-child {
  border-bottom: none;
}
</style>