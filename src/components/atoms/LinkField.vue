<script setup lang="ts">

defineProps({
  label: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
});

</script>

<template>
  <div class="link-field">
    <router-link :to="url" class="link-text">{{ label }}</router-link>
  </div>
</template>

<style scoped>

.link-field {
  margin-bottom: 1.5rem;
  display: block;
}

.link-text {
  color: #000000;
  font-family: sans-serif, Arial, Helvetica;
  font-size: 1.1rem;
  font-weight: normal;
  text-decoration: underline;
}

</style>