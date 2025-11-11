<template>
  <Toast/>
  <form @submit.prevent="onFormSubmit" class="form-container">
    <OTPFormField
        name="otp"
        label="Digite o Código"
    />
    <BaseButton type="submit" severity="secondary" label="CONFIRMAR REGISTRO" />
    
    <div class="resend-container">
      <p class="resend-text">Não recebeu o código?</p>
      <Button
        type="button"
        variant="text"
        @click="onResendOTP"
        :disabled="isResending"
        class="resend-button"
      >
        <i v-if="!isResending" class="pi pi-refresh"></i>
        <i v-else class="pi pi-spin pi-spinner"></i>
        {{ isResending ? 'Enviando...' : 'Reenviar código' }}
      </Button>
    </div>
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
import Button from "primevue/button";

const authStore = useAuthStore();
const toast = useToast();
const router = useRouter();
const route = useRoute();

const email = ref('');
const isResending = ref(false);

onMounted(() => {
  const emailFromQuery = route.query.email;
  const otpFromQuery = route.query.otp;
  
  if (!emailFromQuery || Array.isArray(emailFromQuery)) {
    toast.add({ severity: 'warn', summary: 'Inválido', detail: 'Nenhum email fornecido.', life: 3000 });
    router.push('/register');
    return;
  }
  
  email.value = emailFromQuery;
  
  // If OTP is provided in URL, auto-fill and submit
  if (otpFromQuery && !Array.isArray(otpFromQuery) && otpFromQuery.length === 6) {
    setFieldValue('otp', otpFromQuery);
    
    toast.add({
      severity: 'info',
      summary: 'Código detectado',
      detail: 'Verificando o código automaticamente...',
      life: 2000
    });
    
    // Auto-submit after a short delay to allow the UI to update
    setTimeout(() => {
      handleAutoSubmit(otpFromQuery as string);
    }, 500);
  }
});

const schema = toTypedSchema(z.object({
  otp: z.string().length(6, 'O código deve ter 6 dígitos'),
}));
const { handleSubmit, setFieldValue } = useForm({ validationSchema: schema });

const onFormSubmit = handleSubmit(async (values) => {
  try {
    await authStore.validateRegistrationOTP({
      email: email.value,
      otp: values.otp,
    });

    toast.add({ severity: 'success', summary: 'Conta confirmada!', detail: 'Sua conta foi criada com sucesso. Faça login para continuar.', life: 3000 });
    await router.push('/login');

  } catch (error: any) {
    console.error(error)
    const detail = error.response?.data?.detail || 'Código inválido ou expirado.';
    toast.add({ severity: 'error', summary: 'Erro na verificação', detail, life: 3000 });
  }
});

// Check for OTP in URL and auto-submit
onMounted(() => {
  const emailFromQuery = route.query.email;
  const otpFromQuery = route.query.otp;
  
  if (!emailFromQuery || Array.isArray(emailFromQuery)) {
    toast.add({ severity: 'warn', summary: 'Inválido', detail: 'Nenhum email fornecido.', life: 3000 });
    router.push('/register');
    return;
  }
  
  email.value = emailFromQuery;
  
  // If OTP is provided in URL, auto-fill and submit
  if (otpFromQuery && !Array.isArray(otpFromQuery) && otpFromQuery.length === 6) {
    setFieldValue('otp', otpFromQuery);
    
    toast.add({
      severity: 'info',
      summary: 'Código detectado',
      detail: 'Verificando o código automaticamente...',
      life: 2000
    });
    
    // Auto-submit after a short delay to allow the UI to update
    setTimeout(() => {
      handleAutoSubmit(otpFromQuery as string);
    }, 500);
  }
});

const onResendOTP = async () => {
  if (isResending.value) return;
  
  isResending.value = true;
  try {
    await authStore.requestRegistrationOTP({ email: email.value });
    toast.add({
      severity: 'success',
      summary: 'Código reenviado!',
      detail: 'Um novo código foi enviado para seu email.',
      life: 3000
    });
  } catch (error: any) {
    console.error(error)
    const detail = error.response?.data?.detail || 'Erro ao reenviar código. Tente novamente.';
    toast.add({ severity: 'error', summary: 'Erro no reenvio', detail, life: 3000 });
  } finally {
    isResending.value = false;
  }
};

const handleAutoSubmit = async (otp: string) => {
  try {
    await authStore.validateRegistrationOTP({
      email: email.value,
      otp: otp,
    });

    toast.add({ severity: 'success', summary: 'Conta confirmada!', detail: 'Sua conta foi criada com sucesso. Faça login para continuar.', life: 3000 });
    await router.push('/login');

  } catch (error: any) {
    console.error(error)
    const detail = error.response?.data?.detail || 'Código inválido ou expirado.';
    toast.add({ severity: 'error', summary: 'Erro na verificação', detail, life: 3000 });
  }
};
</script>

<style scoped>
.resend-container {
  margin-top: 1rem;
  text-align: center;
}

.resend-text {
  margin: 0 0 0.5rem 0;
  color: #666;
  font-size: 0.9rem;
}

.resend-button {
  color: var(--p-primary-color) !important;
  font-size: 0.9rem;
  padding: 0.5rem 1rem;
}

.resend-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>