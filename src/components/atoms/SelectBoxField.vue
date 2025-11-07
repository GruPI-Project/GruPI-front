<script setup lang="ts">
import { toRef } from 'vue';
import { useField } from 'vee-validate';
import Message from 'primevue/message';

const props = defineProps<{
  name: string;
  label: string;
  placeholder?: string;
  optionValue: string;
  optionLabel: string;
  options: any[];
  disabled?: boolean;
}>();

const { value, errorMessage } = useField(toRef(props, 'name'));

</script>

<template>
  <div class="input-wrapper">
    <label :for="props.name" class="input-label">{{ props.label }}</label>
    <Select
        :id="props.name"
        :placeholder="props.placeholder"
        :options="props.options"
        :option-value="props.optionValue"
        :option-label="props.optionLabel"
        v-model="value"
        :class="{ 'p-invalid': errorMessage }"
        size="large"
        :disabled="disabled"
        filter
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

.p-select {
  width: 100%;
  border: none;
  background-color: #D9D9D9;
  border-radius: 8px;
  height: 3rem;
}

.p-select-option {
  font-size: 2rem;
  background-color: #D9D9D9;
}

.p-select-option-selected {
  background-color: var(--primary-600) !important;
  color: #ffffff !important;
}


</style>