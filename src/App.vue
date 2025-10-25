<script setup lang="ts">
import { onMounted } from 'vue';
import { useAuthStore } from '@/stores/auth.store';
import { apiClientCsrf } from '@/services/api.ts';


const authStore = useAuthStore();

onMounted(async () => {
  try {
    await apiClientCsrf.get('/csrf/');
    await authStore.fetchUser();
  } catch (error) {
    console.error("Erro na inicialização do app:", error);
  }
});
</script>

<template>
  <main>
    <router-view />
  </main>
</template>

<style scoped>
  html, body {
    margin: 0;
    padding: 0;
  }
  * {
    box-sizing: border-box;
  }
</style>
