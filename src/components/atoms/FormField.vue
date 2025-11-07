<script setup lang="ts">
import { toRef } from 'vue';
import { useField } from 'vee-validate';
import InputText from 'primevue/inputtext';
import Message from 'primevue/message';

const props = defineProps<{
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
}>();

const { value, errorMessage } = useField<string | null>(toRef(props, 'name'));
</script>

<template>
  <div class="input-wrapper">
    <label :for="name" class="input-label">{{ label }}</label>
    <InputText
        :id="name"
        :name="name"
        :type="type"
        :placeholder="placeholder"
        v-model="value"
        fluid
        :class="{ 'p-invalid': errorMessage }"
        class="input-field"
    />
    <Message v-if="errorMessage" severity="error" :closable="false">{{ errorMessage }}</Message>
  </div>
</template>
<style scoped>

.input-wrapper {
  width: 100%;
  margin-bottom: 1.5rem;
}
.input-label {
  margin-bottom: 0.5rem;
  color: #000000;
  font-family: sans-serif, Arial, Helvetica;
  font-size: 1.1rem;
  font-weight: normal;
}
.input-field {
  width: 100%;
  border: none;
  background-color: #D9D9D9;
  border-radius: 8px;
  font-size: 1rem;
  height: 3rem;
}
</style>