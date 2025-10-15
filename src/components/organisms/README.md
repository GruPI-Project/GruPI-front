# Organisms (Organismos)

Componentes complexos e específicos do domínio. Combinam atoms e molecules para criar funcionalidades completas.

## Características

- **Complexos**: Combinam múltiplos atoms e molecules
- **Específicos do domínio**: Relacionados a funcionalidades específicas
- **Lógica de negócio**: Podem conter regras de negócio
- **Integração**: Conectam com APIs e stores

## Exemplos de Organisms

- `GroupList.vue` - Lista de grupos com filtros e ações
- `GroupForm.vue` - Formulário de criação/edição de grupo
- `GroupCard.vue` - Card de grupo com ações
- `GroupMembers.vue` - Lista de membros do grupo
- `UserProfile.vue` - Perfil completo do usuário
- `LoginForm.vue` - Formulário de login
- `Dashboard.vue` - Dashboard com múltiplos widgets

## Exemplo de Estrutura

```vue
<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useGroupStore } from '@/stores/group'
import Card from '@/components/molecules/Card.vue'
import Button from '@/components/atoms/Button.vue'
import SearchBar from '@/components/molecules/SearchBar.vue'

interface Group {
  id: string
  name: string
  members: number
}

const groupStore = useGroupStore()
const groups = ref<Group[]>([])
const searchQuery = ref('')
const isLoading = ref(false)

const fetchGroups = async () => {
  isLoading.value = true
  try {
    groups.value = await groupStore.fetchGroups()
  } catch (error) {
    console.error('Error fetching groups:', error)
  } finally {
    isLoading.value = false
  }
}

const handleSearch = (query: string) => {
  searchQuery.value = query
  // Implementar lógica de busca
}

onMounted(() => {
  fetchGroups()
})
</script>

<template>
  <div class="group-list">
    <div class="group-list__header">
      <h2>Meus Grupos</h2>
      <SearchBar 
        v-model="searchQuery"
        @search="handleSearch"
      />
    </div>
    
    <div v-if="isLoading">Carregando...</div>
    
    <div v-else class="group-list__items">
      <Card 
        v-for="group in groups" 
        :key="group.id"
        class="group-card"
      >
        <h3>{{ group.name }}</h3>
        <p>{{ group.members }} membros</p>
        <Button @click="viewGroup(group.id)">
          Ver Grupo
        </Button>
      </Card>
    </div>
  </div>
</template>
```

## Boas Práticas

✅ **Faça:**
- Compor usando atoms e molecules
- Usar stores (Pinia) para estado
- Fazer chamadas de API
- Adicionar lógica de negócio
- Usar composables para lógica reutilizável
- Tratar erros adequadamente

❌ **Não faça:**
- Criar componentes gigantes (divida em sub-organismos)
- Duplicar lógica (extraia para composables)
- Misturar muitas responsabilidades
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

