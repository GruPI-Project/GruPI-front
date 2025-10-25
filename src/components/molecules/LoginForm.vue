// SeuFormularioDeLogin.vue
<script setup lang="ts">
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import * as z from 'zod';
import BaseButton from '@/components/atoms/BaseButton.vue';
import Toast from 'primevue/toast';
import { useToast } from 'primevue/usetoast';
import { useAuthStore } from '@/stores/auth.store';
import FormField from '@/components/atoms/FormField.vue';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const toast = useToast();
const router = useRouter();

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
  password: z.string()
      .min(8, 'A senha deve ter no mínimo 8 caracteres')
      // Agora, adicionamos um .refine() para cada regra
      .refine((password) => /[a-z]/.test(password), {
        message: 'A senha deve conter pelo menos uma letra minúscula',
      })
      .refine((password) => /[A-Z]/.test(password), {
        message: 'A senha deve conter pelo menos uma letra maiúscula',
      })
      .refine((password) => /[0-9]/.test(password), {
        message: 'A senha deve conter pelo menos um número',
      })
      .refine((password) => /[^a-zA-Z0-9]/.test(password), {
        message: 'A senha deve conter pelo menos um caractere especial',
      })
});

const { handleSubmit } = useForm({
  validationSchema: toTypedSchema(schema),
});

const onFormSubmit = handleSubmit(async (values) => {
  try {
    await authStore.login(values);
    toast.add({ severity: 'success', summary: 'Login bem-sucedido!', life: 3000 });
    // Redireciona para o dashboard após o login
    await router.push('/dashboard');
  } catch (error) {
    toast.add({ severity: 'error', summary: 'Erro no Login', detail: 'Credenciais inválidas.', life: 3000 });
  }
});

</script>

<template>
  <div class="card flex justify-left">
    <Toast />
    <form @submit="onFormSubmit" class="form-container">
      <FormField
          name="email"
          label="E-mail UNIVESP"
          type="email"
          placeholder=""
      />
      <FormField
          name="password"
          label="Senha"
          type="password"
          placeholder=""
      />

      <BaseButton type="submit" severity="secondary" label="Entrar" />
    </form>
  </div>
</template>

<style scoped>
.form-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>