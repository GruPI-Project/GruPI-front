# Molecules (Moléculas)

Componentes compostos por átomos que trabalham juntos. São componentes de nível intermediário.

## Características

- **Composição de atoms**: Combinam vários átomos
- **Reutilizáveis**: Funcionam em diferentes contextos
- **Lógica de apresentação**: Podem conter lógica de UI
- **Estrutura**: Focados em layout e organização

## Exemplos de Molecules

- `FormField.vue` - Campo de formulário (Label + Input + ErrorMessage)
- `SearchBar.vue` - Barra de busca (Input + Button + Icon)
- `Card.vue` - Card genérico
- `AppHeader.vue` - Cabeçalho da aplicação
- `AppFooter.vue` - Rodapé da aplicação
- `Sidebar.vue` - Barra lateral
- `NavBar.vue` - Barra de navegação
- `Modal.vue` - Modal/Dialog
- `Toast.vue` - Notificação toast
- `Pagination.vue` - Paginação

## Exemplo de Estrutura

```vue
<script setup lang="ts">
import { computed } from 'vue'
import Label from '@/components/atoms/Label.vue'
import Input from '@/components/atoms/Input.vue'

interface Props {
  label: string
  modelValue: string
  error?: string
  required?: boolean
}

const props = defineProps<Props>()
const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const hasError = computed(() => !!props.error)
</script>

<template>
  <div class="form-field">
    <Label :required="required">{{ label }}</Label>
    <Input 
      :model-value="modelValue"
      :error="hasError"
      @update:model-value="emit('update:modelValue', $event)"
    />
    <span v-if="error" class="error-message">{{ error }}</span>
  </div>
</template>
```

## Boas Práticas

✅ **Faça:**
- Compor usando atoms
- Manter reutilizável
- Adicionar lógica de apresentação
- Usar composables para lógica comum
- Documentar props e eventos

❌ **Não faça:**
- Adicionar lógica de negócio específica
- Fazer chamadas diretas de API
- Tornar muito específico para um caso de uso

