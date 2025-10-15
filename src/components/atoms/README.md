# Atoms (Átomos)

Componentes básicos e indivisíveis da interface. São os blocos de construção mais fundamentais.

## Características

- **Simples e genéricos**: Não contêm lógica de negócio
- **Altamente reutilizáveis**: Podem ser usados em qualquer contexto
- **Configuráveis**: Funcionam através de props
- **Sem dependências**: Não importam outros componentes complexos

## Exemplos de Atoms

- `Button.vue` - Botão genérico
- `Input.vue` - Campo de entrada de texto
- `Label.vue` - Rótulo de texto
- `Icon.vue` - Ícones
- `Badge.vue` - Badges/Pills
- `Avatar.vue` - Imagem de avatar
- `Spinner.vue` - Loading spinner
- `Checkbox.vue` - Caixa de seleção
- `Radio.vue` - Botão de rádio

## Exemplo de Estrutura

```vue
<script setup lang="ts">
interface Props {
  variant?: 'primary' | 'secondary' | 'danger'
  size?: 'small' | 'medium' | 'large'
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'medium',
  disabled: false
})
</script>

<template>
  <button 
    :class="['btn', `btn-${variant}`, `btn-${size}`]"
    :disabled="disabled"
  >
    <slot />
  </button>
</template>
```

## Boas Práticas

✅ **Faça:**
- Mantenha simples e focado
- Use props para customização
- Documente todas as props
- Use slots quando apropriado
- Adicione tipos TypeScript

❌ **Não faça:**
- Adicionar lógica de negócio
- Fazer chamadas de API
- Usar stores (Pinia)
- Importar componentes complexos

