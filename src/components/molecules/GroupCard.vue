<script setup lang="ts">

import type { Group } from '@/types/user.types.ts';
import Card from 'primevue/card';
import Tag from 'primevue/tag';
import Button from 'primevue/button';
import Divider from 'primevue/divider';
import { ref} from "vue";

const getPoloCardDt = ref( {
    card: {
      body: {
        padding: '1px'
      }
    }
});


defineProps<{
  group: Group;
}>();

</script>

<template>
  <Card class="group-card">
    <template #title>
      <strong class="title">{{ group.title }}</strong>
      <Divider class="divider" />
    </template>
    <template #content>

      <div class="card-content">
        <div class="info-section">
          <Card class="polo-card" :dt="getPoloCardDt">
            <template #content class="polo-card-content">
                <strong class="polo-info">Polo:</strong> {{ group.polo }}
            </template>
          </Card>
            <div class="tags-container">
              <Tag v-for="tag in group.tags" :key="tag.label" :value="tag.label" class="group-tag"  />
            </div>
        </div>
        <Card class="description-section">
          <template #content>
            <p class="description">
              <strong>Descrição:</strong> {{ group.description }}
            </p>
          </template>
        </Card>
      </div>
    </template>
    <template #footer>
      <div class="card-footer">
        <Button label="Detalhes do Grupo" class="action-button" />
        <Button label="Pedir Aprovação para Entrar" class="action-button secondary" />
      </div>
    </template>
  </Card>
</template>

<style scoped>

.title {
  font-size: 2rem;
  font-weight: bolder;
  font-family: 'Poppins', sans-serif;
}

.group-card {
  background-color: #EFE7DD; /* Cor de fundo creme */
  border: 1px solid #EAE0DA;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
}

/* Estilizando os slots internos com :deep() */
:deep(.p-card-title) {
  text-align: center;
  color: #9E1B32; /* Cor vinho */
  font-weight: bold;
  font-size: 1.25rem;
}

:deep(.p-card-body) {
 padding: 0.75rem;
}

.card-content {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.info-section {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
}

.polo-card {
  background-color: #FAF8F4;
  color: #7e1427;
  font-size: 1rem;
}

.polo-info {
  font-size: 1.1rem;
  font-family: 'Poppins', sans-serif;
  color: #7e1427;
}

.tags-container {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: flex-start;
  border: 1px solid #5E0B15;
  box-sizing: border-box;
  border-radius: 10px;
  padding: 0.5rem;
}

.group-tag {
  background-color: #B23A48; /* Cor rosa/vinho claro para as tags */
  color: white;
  font-size: 0.85rem;
}

.description-section {
  background-color: #FAF8F4;
  color: #7e1427;
  font-size: 1rem;
}

.description {
  font-family: 'Poppins', sans-serif;
  font-size: 1.3rem;
  margin: 0;
  color: #7e1427;
}

.card-footer {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  align-content: space-around;
  gap: 0.5rem;
  margin: 1rem;
}

.action-button {
  background-color: #9E1B32;
  border: none;
  width: 100%;
  display: flex;
  justify-content: center;
  max-width: 85%;
  font-size: 1.25rem;
}

.action-button.secondary {
  background-color: #B23A48; /* Tom um pouco mais claro */
}

/* Demo styles for padding controls */
.padding-demo {
  margin-top: 1rem;
  padding: 1rem;
  background-color: #f8f9fa;
  border-radius: 8px;
  font-size: 0.8rem;
}

.padding-controls {
  display: flex;
  gap: 0.5rem;
  margin: 0.5rem 0;
  flex-wrap: wrap;
}

.padding-controls .p-button.active {
  background-color: #7e1427;
}
</style>