<script setup lang="ts">

import BaseButton from '@/components/atoms/BaseButton.vue';
import Toast from 'primevue/toast';
import { useToast } from 'primevue/usetoast';
import { useAuthStore } from '@/stores/auth.store';
import FormField from '@/components/atoms/FormField.vue';
import { useRouter } from 'vue-router';
import {toTypedSchema} from "@vee-validate/zod";
import {z} from "zod";
import {useForm} from "vee-validate";

const authStore = useAuthStore();
const toast = useToast();
const router = useRouter();


const schema = toTypedSchema(z.object({
  password: z.string().min(8, 'A senha deve ter no mínimo 8 caracteres'),
  password1: z.string(),
}).refine(data => data.password === data.password1, {
  message: "As senhas não coincidem",
  path: ["password1"],
}));
const { handleSubmit } = useForm({
  validationSchema: schema,
});

const onFormSubmit = handleSubmit(async (values) => {
  try {
    await authStore.setNewPassword({
      new_password1: values.password,
      new_password2: values.password1,
    });
    toast.add({ severity: 'success', summary: 'Sucesso', detail: 'Senha redefinida com sucesso.', life: 3000 });
    await router.push('/login');
  } catch (error) {
    toast.add({ severity: 'error', summary: 'Erro', detail: 'Falha ao redefinir a senha.', life: 3000 });
  }
});

</script>

<template>
  <div class="card flex justify-left">
    <Toast />
    <form @submit="onFormSubmit" class="form-container">
      <FormField
          name="password"
          label="Nova Senha"
          type="password"
          placeholder=""
      />
      <FormField
          name="password1"
          label="Confirme a Senha"
          type="password"
          placeholder=""
      />
      <BaseButton type="submit" severity="secondary" label="CADASTRAR NOVA SENHA" />
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