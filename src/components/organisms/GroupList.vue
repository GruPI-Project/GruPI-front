<script setup lang="ts">
import { ref, onMounted } from 'vue';
import type { Group } from '@/types/user.types';
import GroupCard from '@/components/molecules/GroupCard.vue';
// import { useGroupStore } from '@/stores/group.store'; // Supondo que você crie uma store para grupos

// const groupStore = useGroupStore();
const groups = ref<Group[]>([]);
const isLoading = ref(true);

// Mock de dados para o design
const mockGroups: Group[] = Array(9).fill({
  id: 1,
  title: 'Grupo PI-1',
  polo: 'UniCEU São Rafael',
  description: 'Procuro 5 pessoas pra formar um grupo organizado e participativo na região do DRP 14.',
  tags: [{label: 'GitHub'}, {label: 'HTML'}, {label: 'Front-End'}, {label: 'CSS'}]
});

onMounted(async () => {
  try {
    // groups.value = await groupStore.fetchGroups(); // Versão real
    groups.value = mockGroups.map((g, i) => ({ ...g, id: i })); // Versão mock
  } catch (error) {
    console.error("Falha ao buscar grupos", error);
  } finally {
    isLoading.value = false;
  }
});
</script>

<template>
  <div class="group-list-container">
    <div v-if="isLoading">Carregando grupos...</div>
    <div v-else class="group-grid">
      <GroupCard v-for="group in groups" :key="group.id" :group="group" />
    </div>
  </div>
</template>

<style scoped>
.group-list-container {
  width: 100%;
}
.group-grid {
  display: grid;
  /* Cria colunas responsivas: tenta encaixar colunas de 350px, com no mínimo 3 colunas em telas grandes */
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 1.5rem;
}
</style>