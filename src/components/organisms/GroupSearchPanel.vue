<script setup lang="ts">
import GroupList from '@/components/organisms/GroupList.vue';
import IconField from 'primevue/iconfield';
import InputIcon from 'primevue/inputicon';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
</script>

<template>
  <div class="group-search-panel">
    <!-- Barra de Pesquisa e Ação -->
    <div class="search-bar">
      <IconField iconPosition="left">
        <InputIcon class="pi pi-search"></InputIcon>
        <InputText placeholder="Pesquisar" class="search-input" />
      </IconField>
      <Button label="Criar Novo GruPI" class="create-button" />
    </div>

    <!-- Lista de Grupos -->
    <GroupList />
  </div>
</template>

<style scoped>
.search-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.search-input {
  width: 400px;
}

.create-button {
  background-color: #9E1B32;
  border: none;
  font-weight: bold;
}

/* Media query para telas menores */
@media (max-width: 768px) {
  .search-bar {
    flex-direction: column;
    gap: 1rem;
    align-items: stretch;
  }
  .search-input {
    width: 100%;
  }
}
</style>