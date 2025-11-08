<script setup lang="ts">
import {useForm} from 'vee-validate';
import {toTypedSchema} from '@vee-validate/zod';
import * as z from 'zod';
import BaseButton from '@/components/atoms/BaseButton.vue';
import Toast from 'primevue/toast';
import {useAuthStore} from '@/stores/auth.store';
import FormField from '@/components/atoms/FormField.vue';
import SelectBoxField from '@/components/atoms/SelectBoxField.vue';

import {onMounted, ref, watch} from "vue";
import type {CursosOption, DrpOption, EixosOption, PolosOption, PIOption} from '@/types/user.types';

const authStore = useAuthStore();

const DRPs = ref<DrpOption[]>([]);
const Polos = ref<PolosOption[]>([]);
const Eixos = ref<EixosOption[]>([]);
const Cursos = ref<CursosOption[]>([]);
const PIs = ref<PIOption[]>([]);

const schema = toTypedSchema(z.object({
  email: z.string()
      .email('Formato de email inválido')
      .min(1, 'O email é obrigatório')
      .refine((email) => email.endsWith('@aluno.univesp.br'),{
            message: 'O email deve ser do domínio @aluno.univesp.br',
          })
      .refine((email) => {
            const localPart = email.split('@')[0];
            if (!localPart) {
              return false;
            }
            return /^[0-9]+$/.test(localPart);
          }, {message: 'O email academico deve começar com seu número de matrícula(apenas dígitos)',}),
  password1: z.string()
      .min(8, 'A senha deve ter no mínimo 8 caracteres')
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
      }),
  password2: z.string().min(1, 'A confirmação de senha é obrigatória'),
  polo: z.number().min(1, 'Polo é obrigatório'),
  drp: z.number().min(1, 'DRP é obrigatório'),
  curso: z.number().min(1, 'Curso é obrigatório'),
  projeto_integrador: z.number().min(1, 'Projeto Integrador é obrigatório'),
  eixo: z.number().optional(), // Campo apenas visual, não é enviado
  first_name: z.string().min(1, 'O nome é obrigatório'),
  last_name: z.string().min(1, 'O sobrenome é obrigatório'),
}).refine(
    data => data.password1 === data.password2, {
      message: "As senhas não coincidem",
      path: ["password2"],
    }
));

const { handleSubmit, values, setFieldValue } = useForm({
  validationSchema: schema,
});

onMounted(async () => {
  try {
    const [drpData, polosData, cursoData, eixoData, piData] = await Promise.all([
      authStore.getDRPs(),
      authStore.getPolos(),
      authStore.getCursos(),
      authStore.getEixos(),
      authStore.getPIs(),
    ]);
    DRPs.value = drpData;
    Polos.value = polosData;
    Cursos.value = cursoData;
    Eixos.value = eixoData;
    PIs.value = piData;
  } catch (error) {
    console.error("Não foi possível carregar os dados do formulário", error);
  }
});

watch(() => values.polo, (newPoloId) => {
  if (!newPoloId) {
    setFieldValue('drp', undefined);
    return;
  }
  const selectedPolo = Polos.value.find(p => p.id === newPoloId);
  if (selectedPolo) {
    setFieldValue('drp', selectedPolo.drp.id);
  }
});

watch(() => values.curso, async (newCursoId) => {
  if (!newCursoId) {
    setFieldValue('eixo', undefined);
    return;
  }
  const selectedCurso = Cursos.value.find(c => c.id === newCursoId);
  if (selectedCurso) {
    setFieldValue('eixo', selectedCurso.eixo.id);
    return;
  }
});

const onFormSubmit = handleSubmit(async (values) => {
  // Preparar o payload conforme esperado pela API
  const payload = {
    email: values.email,
    password1: values.password1,
    password2: values.password2,
    projeto_integrador: values.projeto_integrador,
    drp: values.drp,
    polo: values.polo,
    curso: values.curso,
    first_name: values.first_name,
    last_name: values.last_name,
  };
  
  try {
    await authStore.register(payload);
    console.log("Registro realizado com sucesso!");
  } catch (error) {
    console.error("Erro ao registrar:", error);
  }
});

</script>

<template>
  <div class="card flex justify-left">
    <Toast />
    <form @submit="onFormSubmit" class="form-container">
      <div style="display: flex; gap: 1rem;">
        <FormField
            name="first_name"
            label="Nome"
            type="text"
            placeholder="João"
        />
        <FormField
            name="last_name"
            label="Sobrenome"
            type="text"
            placeholder="Silva"
        />
      </div>
      <FormField
          name="email"
          label="Email Acadêmico"
          type="email"
          placeholder="12345678@aluno.univesp.br"
      />
      <div style="display: flex; gap: 1rem;">
        <SelectBoxField
            name="curso"
            label="Curso"
            :options="Cursos"
            optionValue="id"
            optionLabel="nome"
            placeholder=""
        />
        <SelectBoxField
            name="eixo"
            label="Eixo"
            :options="Eixos"
            optionValue="id"
            optionLabel="nome"
            placeholder=""
            :disabled="true"
        />
      </div>
      <div style="display: flex; gap: 1rem;">
      <SelectBoxField
          name="polo"
          label="Polo"
          :options="Polos"
          optionValue="id"
          optionLabel="nome"
          placeholder=""
      />
      <SelectBoxField
          name="drp"
          label="DRP"
          :options="DRPs"
          optionValue="id"
          optionLabel="numero"
          placeholder=""
          :disabled="true"
      />
      </div>
      <SelectBoxField
          name="projeto_integrador"
          label="Projeto Integrador (PI)"
          :options="PIs"
          optionValue="id"
          optionLabel="numero"
          placeholder="Selecione seu PI"
      />
      <div style="display: flex; gap: 1rem;">
      <FormField
          name="password1"
          label="Senha"
          type="password"
          placeholder=""
      />
      <FormField
          name="password2"
          label="Confirme a Senha"
          type="password"
          placeholder=""
      />
      </div>
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