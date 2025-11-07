<script setup lang="ts">
import UserProfileHeader from '@/components/organisms/UserProfileHeader.vue';
import GroupList from '@/components/organisms/GroupList.vue';
import IconField from 'primevue/iconfield';
import InputIcon from 'primevue/inputicon';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
</script>

<template>
  <div class="main-page">
    <UserProfileHeader />

    <main class="main-content">
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
    </main>
  </div>
</template>

<style scoped>
.main-page {
  background-color: #FAF7F5; /* Cor de fundo creme para toda a página */
  min-height: 100vh;
}
.main-content {
  max-width: 1440px;
  margin: 0 auto;
  padding: 2rem;
}
.search-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}
.search-input {
  width: 400px; /* Largura da barra de pesquisa */
}
.create-button {
  background-color: #9E1B32;
  border: none;
  font-weight: bold;
}
</style>