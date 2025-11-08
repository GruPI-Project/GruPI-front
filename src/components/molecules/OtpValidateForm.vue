<template>
  <Toast/>
  <form @submit.prevent="onFormSubmit" class="form-container">
    <OTPFormField
        name="otp"
        label="Digite o Código"
    />
    <BaseButton type="submit" severity="secondary" label="RECUPERAR SENHA" />
  </form>
</template>

<script setup lang="ts">

import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import * as z from 'zod';
import { useToast } from 'primevue/usetoast';
import Toast from 'primevue/toast';
import {useAuthStore} from "@/stores/auth.store.ts";

import OTPFormField from "@/components/atoms/OTPFormField.vue";
import BaseButton from "@/components/atoms/BaseButton.vue";
import {useRoute, useRouter} from "vue-router";
import {onMounted, ref} from "vue";

const authStore = useAuthStore();
const toast = useToast();
const router = useRouter();
const route = useRoute();

const email = ref('');

onMounted(() => {
  const emailFromQuery = route.query.email;
  if (!emailFromQuery || Array.isArray(emailFromQuery)) {
    toast.add({ severity: 'warn', summary: 'Inválido', detail: 'Nenhum email fornecido.', life: 3000 });
    router.push('/password-reset/request');
    return;
  }
  email.value = emailFromQuery;
});

const schema = toTypedSchema(z.object({
  otp: z.string().length(6, 'O código deve ter 6 dígitos'),
}));
const { handleSubmit } = useForm({ validationSchema: schema });

const onFormSubmit = handleSubmit(async (values) => {
  try {
    await authStore.validatePasswordResetOTP({
      email: email.value,
      otp: values.otp,
    });

    toast.add({ severity: 'success', summary: 'Código verificado!', detail: 'Agora defina sua nova senha.', life: 3000 });
    await router.push({name: 'set-new-password'});

  } catch (error: any) {
    console.error(error)
    const detail = error.response?.data?.detail || 'Código inválido ou expirado.';
    toast.add({ severity: 'error', summary: 'Erro na verificação', detail, life: 3000 });
  }
});
</script>

<style scoped>

</style>