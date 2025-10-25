<template>
  <Dialog v-model:visible="model" modal :header="Title" :style="{ width: '25rem' }">
    <div class="flex items-center gap-4 mb-4">
      <span class="block mb-8">{{ Details }}</span>
    </div>
    <div>
      <br>
      <Button type="button" :label="Label" @click="handleConfirmClick" size="large"></Button>
    </div>
  </Dialog>
</template>

<script setup>

const model = defineModel({ type: Boolean, default: false });

defineProps({
  Title: {
    type: String,
    required: true,
  },
  Details: {
    type: String,
    required: true,
  },
  Label: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(['confirm']);
const handleConfirmClick = () => {
  emit('confirm');
  model.value = false;
}
</script>
<style scoped>
  @import "tailwindcss";
  @import "tailwindcss-primeui";


  .p-button{
    width: 100%;

  }
</style>