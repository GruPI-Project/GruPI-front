<script setup lang="ts">

import {ref} from "vue";
import Toast from "primevue/toast";
import BaseButton from "@/components/atoms/BaseButton.vue";
import FormField from "@/components/atoms/FormField.vue";
import * as z from 'zod';
import {useForm} from "vee-validate";
import {toTypedSchema} from "@vee-validate/zod";
import { useAuthStore } from '@/stores/auth.store';
import {useToast} from "primevue/usetoast";
import {useRouter} from "vue-router";


const authStore = useAuthStore();
const router = useRouter();
const submittedEmail = ref('');
const toast = useToast();
const schema = z.object({
  email: z.email('Formato de email inválido')
      .min(1, 'O email é obrigatório'),

  // .refine(
  //     (email) => email.endsWith('@aluno.univesp.br'),
  //     {
  //       message: 'O email deve ser do domínio @aluno.univesp.br',
  //     }
  // )
  // .refine(
  //     (email) => {
  //       const localPart = email.split('@')[0];
  //       if (!localPart) {
  //         return false;
  //       }
  //       return /^[0-9]+$/.test(localPart);
  //     },
  //     {
  //       message: 'O email do usuario deve começar com seu número de matrícula(apenas dígitos)',
  //     }
  // ),
});
const isOtpDialogVisible = ref(false);

const { handleSubmit } = useForm({
  validationSchema: toTypedSchema(schema),
});

const handleDialogConfirmation = () => {
  if (submittedEmail.value) {
    router.push({ name: 'password-reset-otp', query: { email: submittedEmail.value } });
  }
};

const onFormSubmit = handleSubmit(async (values) => {
  try {
    await authStore.requestPasswordReset(values);
    submittedEmail.value = values.email;
    isOtpDialogVisible.value = true;
} catch (error: any) {
    const detail = error.response?.data?.detail || 'Ocorreu um erro ao enviar a solicitação.';
    toast.add({ severity: 'error', summary: 'Erro', detail, life: 10000 });
  }
});



</script>

<template>
  <OtpRedirectDialog
      v-model="isOtpDialogVisible"
      Title="Verificação Necessária"
      Details="Enviamos um código para o seu email. Por favor, verifique para continuar."
      Label="Validar OTP"
      @confirm="handleDialogConfirmation"
  />
  <div class="card flex justify-left">
    <Toast/>
    <form @submit="onFormSubmit" class="form-container">
      <FormField
          name="email"
          label="E-mail UNIVESP"
          type="email"
          placeholder=""
      />
      <BaseButton type="submit" severity="secondary" label="Entrar" />
    </form>
  </div>
</template>

<style scoped>

</style>