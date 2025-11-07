<script setup lang="ts">

import type { Group } from '@/types/user.types.ts';
import Card from 'primevue/card';
import Tag from 'primevue/tag';
import Button from 'primevue/button';

defineProps<{
  group: Group;
}>();

</script>

<template>
  <Card class="group-card">
    <template #title>{{ group.title }}</template>
    <template #content>
      <div class="card-content">
        <div class="info-section">
          <div class="polo-info">
            <strong>Polo:</strong> {{ group.polo }}
          </div>
          <div class="tags-container">
            <Tag v-for="tag in group.tags" :key="tag.label" :value="tag.label" class="group-tag" />
          </div>
        </div>
        <p class="description">
          <strong>Descrição:</strong> {{ group.description }}
        </p>
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
.group-card {
  background-color: #FAF7F5; /* Cor de fundo creme */
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

.polo-info {
  font-size: 0.9rem;
}

.tags-container {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: flex-end;
}

.group-tag {
  background-color: #C7A6B2; /* Cor rosa/vinho claro para as tags */
  color: #5E0B15;
  font-size: 0.75rem;
}

.description {
  font-size: 0.9rem;
  color: #333;
}

.card-footer {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.action-button {
  background-color: #9E1B32;
  border: none;
  width: 100%;
}

.action-button.secondary {
  background-color: #B23A48; /* Tom um pouco mais claro */
}
</style>