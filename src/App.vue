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
  <div class="app-container">
    <RouterView />
  </div>
</template>

<style scoped>


  .app-container {
    max-width: 1920px;

    margin-left: auto;
    margin-right: auto;

    width: 100%;
  }

</style>
