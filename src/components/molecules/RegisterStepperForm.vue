<script setup lang="ts">
import {onMounted, ref, watch} from "vue";
import { useForm} from 'vee-validate';
import {toTypedSchema} from '@vee-validate/zod';
import * as z from 'zod';
import {useAuthStore} from "@/stores/auth.store.ts";
import {useRouter} from 'vue-router';
import {useToast} from 'primevue/usetoast';
import Toast from 'primevue/toast';
import type {CursosOption, DrpOption, EixosOption, PIOption, PolosOption, TagsOption} from '@/types/user.types';
import MultipleListBoxField from "@/components/atoms/MultipleListBoxField.vue";

const authStore = useAuthStore();
const router = useRouter();
const toast = useToast();

const DRPs = ref<DrpOption[]>([]);
const Polos = ref<PolosOption[]>([]);
const Eixos = ref<EixosOption[]>([]);
const Cursos = ref<CursosOption[]>([]);
const PIs = ref<PIOption[]>([]);
const Tags = ref<TagsOption[]>([]);

const schema = toTypedSchema(z.object({
  email: z
      .email('Formato de email inválido, O email deve ser do domínio @aluno.univesp.br')
      .min(1, 'O email é obrigatório ')
      .refine((email) => email.endsWith('@aluno.univesp.br'), {
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
  tags: z.array(z.number()).optional(),
}).refine(
    data => data.password1 === data.password2, {
      message: "As senhas não coincidem",
      path: ["password2"],
    }
));

const {handleSubmit, validateField, values, setFieldValue} = useForm({
  validationSchema: schema,
  initialValues: {
    tags: [], // Set default value here instead of in Zod schema
  },
});

onMounted(async () => {
  try {
    const [drpData, polosData, cursoData, eixoData, piData, tagData] = await Promise.all([
      authStore.getDRPs(),
      authStore.getPolos(),
      authStore.getCursos(),
      authStore.getEixos(),
      authStore.getPIs(),
      authStore.getTags(),
    ]);
    DRPs.value = drpData;
    Polos.value = polosData;
    Cursos.value = cursoData;
    Eixos.value = eixoData;
    PIs.value = piData;
    Tags.value = tagData;
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


const stepFields = {
  '1': ['first_name', 'last_name', 'email', 'projeto_integrador'],
  '2': ['polo', 'drp', 'curso', 'eixo'],
  '3': ['tags'],
  '4': ['password1', 'password2'],
  '5': [],
}as const;
type Step = keyof typeof stepFields;
const activeStep = ref<Step>('1');

const goToNextStep = async (targetStep: Step) => {
  const currentStep = activeStep.value;
  const fieldsToValidate = stepFields[currentStep];
  
  if (fieldsToValidate.length === 0) {
    // No validation needed for this step (e.g., confirmation step)
    activeStep.value = targetStep;
    return;
  }

  const validationResults = await Promise.all(
    fieldsToValidate.map(field => validateField(field))
  );

  const isStepValid = validationResults.every((result) => result.valid === true);
  if (isStepValid) {
    activeStep.value = targetStep;
  }
};
const goToPrevStep = (targetStep: Step) => {
  activeStep.value = targetStep;
};

const onFormSubmit = handleSubmit(async (formValues) => {
  try {
    console.log("Formulário completo enviado:", formValues);
    console.log("Tags (IDs inteiros):", formValues.tags);
    
    // Preparar o payload - enviar tags como array de inteiros diretamente
    const payload = {
      email: formValues.email,
      password1: formValues.password1,
      password2: formValues.password2,
      projeto_integrador: formValues.projeto_integrador,
      drp: formValues.drp,
      polo: formValues.polo,
      curso: formValues.curso,
      first_name: formValues.first_name,
      last_name: formValues.last_name,
      tags: formValues.tags || [], // Enviar tags como array de inteiros
    };
    
    console.log("Payload final a ser enviado:", payload);
    
    await authStore.registerAndRequestOTP(payload);
    
    toast.add({
      severity: 'success',
      summary: 'Cadastro realizado com sucesso!',
      detail: 'Enviamos um email com o código de validação. Redirecionando para confirmação...',
      life: 3000
    });
    
    // Redirecionar para a página de confirmação de OTP
    setTimeout(() => {
      router.push({ name: 'register-otp-confirm', query: { email: formValues.email } });
    }, 2000);
    
  } catch (error: any) {
    console.error('Erro ao registrar usuário:', error);
    
    // Extrair mensagem de erro da API se disponível
    const errorMessage = error?.response?.data?.message
      || error?.response?.data?.detail
      || error?.message
      || 'Erro ao registrar usuário. Tente novamente.';
    
    toast.add({
      severity: 'error',
      summary: 'Erro no cadastro',
      detail: errorMessage,
      life: 5000
    });
  }
});
</script>

<template>
  <div class="card flex justify-left">
    <Toast />
    <form @submit="onFormSubmit" >
      <Stepper v-model:value="activeStep" style="flex-basis: 50rem" class="stepper" >
        <StepList>
          <Step value="1"><strong>Dados Pessoais</strong></Step>
          <Step value="2">Dados Acadêmicos</Step>
          <Step value="3">Tags</Step>
          <Step value="4">Senha</Step>
          <Step value="5">Confirmação</Step>
        </StepList>
        <StepPanels>
          <StepPanel value="1">
            <div class="step-content" style=" flex-direction: column;">
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
              <FormField
                  name="email"
                  label="Email Acadêmico"
                  type="email"
              />
              <SelectBoxField
                  name="projeto_integrador"
                  label="Qual PI você esta fazendo?"
                  :options="PIs"
                  optionValue="id"
                  optionLabel="numero"
                  placeholder=""
              />
            </div>
            <div class="btn-group">
              <div></div>
              <Button label="Próximo" icon="pi pi-arrow-right" iconPos="right" type="button" @click="goToNextStep('2')" />
            </div>
          </StepPanel>
          <StepPanel value="2">
            <div class="step-content">
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
            <div class="step-content">
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
            <div class="btn-group">
              <Button label="Voltar" severity="secondary" icon="pi pi-arrow-left" type="button" @click="goToPrevStep('1')" />
              <Button label="Próximo" icon="pi pi-arrow-right" iconPos="right" type="button" @click="goToNextStep('3')" />
            </div>
          </StepPanel>
          <StepPanel value="3">
            <div class="step-content" style="flex-direction: column">
              <MultipleListBoxField
                  name="tags"
                  label="Escolha suas tags de interesse (max 5)"
                  :options="Tags"
                  optionValue="id"
                  optionLabel="name"
              />
            </div>
            <div class="btn-group">
              <Button label="Voltar" severity="secondary" icon="pi pi-arrow-left" type="button" @click="goToPrevStep('2')" />
              <Button label="Próximo" icon="pi pi-arrow-right" iconPos="right" type="button" @click="goToNextStep('4')" />
            </div>
          </StepPanel>
          <StepPanel value="4">
            <div class="step-content">
              <FormField
                  name="password1"
                  label="Senha"
                  type="password"
              />
              <FormField
                  name="password2"
                  label="Confirme a Senha"
                  type="password"
              />
            </div>
            <div class="btn-group">
              <Button label="Voltar" severity="secondary" icon="pi pi-arrow-left" type="button" @click="goToPrevStep('3')" />
              <Button label="Próximo" icon="pi pi-arrow-right" iconPos="right" type="button" @click="goToNextStep('5')" />
            </div>
          </StepPanel>
          <StepPanel value="5">
            <div class="step-content-final">
              <div style="justify-self: center ; text-align: center;">
              <h2>Confirmação dos Dados</h2>
              <strong> Você receberá um email com o código de validação</strong>
              </div>
            </div>
            <div class="btn-group">
              <Button label="Voltar" severity="secondary" icon="pi pi-arrow-left" type="button" @click="goToPrevStep('3')" />
              <Button label="Finalizar Cadastro" icon="pi pi-check" type="submit" />
            </div>
          </StepPanel>
        </StepPanels>
      </Stepper>
    </form>
  </div>
</template>

<style scoped>



.stepper {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  gap: 1rem;

}

.step-content {
  background-color: #F8F5F0;
  display: flex;
  gap: 1rem;
}

.step-content-final {
  background-color: #F8F5F0;
  border: 1px #000000 solid;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
}

.btn-group  {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  padding: 1rem;
  background-color: #F8F5F0;
}
.split-div-confirmation {
  display: flex;
  gap: 0.5rem;
  justify-content: center;
}

InputText{
  width: 100%;

}

</style>