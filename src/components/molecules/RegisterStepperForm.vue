<script setup lang="ts">
import {useForm} from 'vee-validate';
import {toTypedSchema} from '@vee-validate/zod';
import * as z from 'zod';
import BaseButton from '@/components/atoms/BaseButton.vue';
import Toast from 'primevue/toast';
import {useAuthStore} from '@/stores/auth.store';
import FormField from '@/components/atoms/FormField.vue';

import {onMounted, ref, watch} from "vue";
import type {CursosOption, DrpOption, EixosOption, PolosOption} from '@/types/user.types';

const authStore = useAuthStore();

const DRPs = ref<DrpOption[]>([]);
const Polos = ref<PolosOption[]>([]);
const Eixos = ref<EixosOption[]>([]);
const Cursos = ref<CursosOption[]>([]);

const schema = toTypedSchema(z.object({
  email: z.email('Formato de email inválido')
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
  eixo: z.number().min(1, 'Eixo é obrigatório'),
  nome_completo: z.string().min(1, 'O nome completo é obrigatório'),
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
    const [drpData, polosData, cursoData, eixoData] = await Promise.all([
      authStore.getDRPs(),
      authStore.getPolos(),
      authStore.getCursos(),
      authStore.getEixos(),
    ]);
    DRPs.value = drpData;
    Polos.value = polosData;
    Cursos.value = cursoData;
    Eixos.value = eixoData;
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
  console.log("Form values:", values);
});

</script>

<template>
  <div class="card flex justify-left">
    <Toast />
    <form @submit="onFormSubmit" class="form-container">
      <FormField
          name="nome_completo"
          label="Nome Completo"
          type="text"
          placeholder=""
      />
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