<script setup lang="ts">
import { toRef } from 'vue';
import { useField } from 'vee-validate';
import Message from 'primevue/message';

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
});

const { value, errorMessage } = useField(toRef(props, 'name'));
</script>

<template>
  <div class="input-wrapper flex ">
    <label :for="name" class="input-label">{{ label }}</label>
    <InputOtp
        integerOnly
        :id="name"
        v-model="value"
        :class="{ 'p-invalid': errorMessage }"
        :length="6"
        size="large"
        variant="filled"
    />
    <Message v-if="errorMessage" severity="error" :closable="false">{{ errorMessage }}</Message>
  </div>
</template>
<style scoped>

.input-wrapper {
  width: 100%;
  margin-bottom: 3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;

}

.input-label {
  margin-bottom: 0.5rem;
  color: #000000;
  font-family: sans-serif, Arial, Helvetica;
  font-size: 1.1rem;
  font-weight: normal;
}

</style>