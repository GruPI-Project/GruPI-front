<script setup lang="ts">
import GroupList from '@/components/organisms/GroupList.vue';
import IconField from 'primevue/iconfield';
import InputIcon from 'primevue/inputicon';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
</script>

<template>
  <div class="group-search-panel">
    <div class="search-bar">

      <div class="search-input-wrapper">
        <IconField iconPosition="left">
          <InputIcon class="pi pi-search"></InputIcon>
          <InputText placeholder="Pesquisar" class="search-input" />
        </IconField>
      </div>

      <Button label="Criar Novo GruPI" class="create-button" />
    </div>

    <GroupList />
  </div>
</template>

<style scoped>
.search-bar {
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
  gap: 2rem;

}

.search-input-wrapper {
  flex-grow: 1;
}

.search-input {
  width: 100%;
}

.create-button {
  background-color: #9E1B32;
  border: none;
  font-weight: bold;
  flex-shrink: 0;
}


@media (max-width: 768px) {
  .search-bar {
    flex-direction: column;
    gap: 1rem;
    align-items: stretch;
  }
  .search-input {
    width: 100%;
  }


  .search-input-wrapper {
    flex-grow: 0;
  }
}
</style>