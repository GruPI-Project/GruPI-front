<template>
  <Button class="btn" :label="label" :loading="false">
    <slot></slot>
  </Button>
</template>

<script setup lang="ts">

defineProps(
  {
    label: {
      type: String,
      default: '',
    }
  }
)


</script>

<style scoped>
.btn {
  width: 100%;
  text-transform: uppercase;
  transition: background-color 0.3s;
  background-color: var(--primary-500);
  color: white;
  height: 6vh;
}
.btn:hover {
  background-color: #8a2532;
}
</style>