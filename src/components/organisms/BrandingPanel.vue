<template>
  <div class="branding-panel">
    <AppLogo />
    <h1 class="headline">
      <slot></slot>
    </h1>
    <p class="sub-headline">
      A plataforma de Match da UNVESP para conectar você à sua futura equipe.
    </p>
  </div>
</template>

<script setup>
import AppLogo from '../atoms/AppLogo.vue';
</script>

<style scoped>
.branding-panel {
  background-color: #a02c3b;
  color: white;
  padding: 0 2rem;
  display: flex;
  flex-direction: column;
  height: 100%;
}
.headline {
  font-family: sans-serif, Arial, Helvetica;
  font-size: 2.2rem;
  font-weight: 400;
  line-height: 1.4;
  margin: 4rem 1rem;
}
.sub-headline {
  font-family: sans-serif, Arial, Helvetica;
  font-size: 1.1rem;
  font-weight: normal;
  margin: 4rem 1rem;
  text-align: justify;
}
</style>