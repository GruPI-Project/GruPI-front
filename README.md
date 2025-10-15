# Grupi-front

Sistema de gerenciamento de grupos desenvolvido com Vue 3 + TypeScript + Vite + Bun.

## 🚀 Tecnologias

- **Bun** - Runtime JavaScript rápido e gerenciador de pacotes
- **Vite** - Build tool e dev server
- **Vue 3** - Framework progressivo JavaScript
- **TypeScript** - Superset tipado do JavaScript
- **PrimeVue** - Biblioteca de componentes UI
- **Vue Router** - Roteamento oficial para Vue.js
- **Pinia** - Gerenciamento de estado para Vue

## 📋 Pré-requisitos

### Windows

1. **Instalar Bun**
   ```bash
   powershell -c "irm bun.sh/install.ps1 | iex"
   ```
   
   Ou baixe o instalador em: https://bun.sh/

2. **Git** (opcional, mas recomendado)
   - Baixe em: https://git-scm.com/download/win

### Linux

1. **Instalar Bun**
   ```bash
   curl -fsSL https://bun.sh/install | bash
   ```

2. **Git** (opcional, mas recomendado)
   ```bash
   # Ubuntu/Debian
   sudo apt update
   sudo apt install git
   
   # Fedora
   sudo dnf install git
   
   # Arch
   sudo pacman -S git
   ```

## 🔧 Configuração do Ambiente de Desenvolvimento

### 1. Clonar o Repositório

```bash
git clone <url-do-repositorio>
cd Grupi-front
```

### 2. Instalar Dependências

```bash
bun install
```

### 3. Iniciar o Servidor de Desenvolvimento

```bash
bun run dev
```

O projeto estará disponível em: http://localhost:5173

## 📜 Scripts Disponíveis

- **`bun run dev`** - Inicia o servidor de desenvolvimento
- **`bun run build`** - Cria a versão de produção otimizada
- **`bun run preview`** - Pré-visualiza a build de produção localmente

## 🏗️ Estrutura do Projeto

```
Grupi-front/
├── public/          # Arquivos estáticos
├── src/
│   ├── assets/      # Recursos (imagens, ícones, etc)
│   ├── components/  # Componentes Vue (Atomic Design)
│   │   ├── atoms/      # Atoms - Componentes básicos indivisíveis
│   │   ├── molecules/  # Molecules - Componentes compostos
│   │   └── organisms/  # Organisms - Componentes complexos do domínio
│   ├── router/      # Configuração de rotas
│   ├── views/       # Templates/Pages da aplicação
│   ├── App.vue      # Componente raiz
│   ├── main.ts      # Ponto de entrada da aplicação
│   └── style.css    # Estilos globais
├── index.html       # Template HTML
├── package.json     # Dependências e scripts
└── vite.config.ts   # Configuração do Vite
```

## 🎨 Atomic Design

Este projeto segue os princípios do **Atomic Design** para organização dos componentes:

### 📁 Estrutura de Componentes

- **`atoms/`** - **Atoms** (Átomos)
  - Componentes básicos e indivisíveis
  - Exemplos: Button, Input, Label, Icon, Badge, Avatar
  - Altamente reutilizáveis e sem dependências
  - Sem lógica de negócio

- **`molecules/`** - **Molecules** (Moléculas)
  - Componentes compostos por átomos
  - Exemplos: FormField, SearchBar, Card, AppHeader, Modal
  - Componentes de estrutura e organização
  - Podem conter lógica de apresentação

- **`organisms/`** - **Organisms** (Organismos)
  - Componentes complexos e específicos do domínio
  - Exemplos: GroupList, GroupForm, GroupCard, UserProfile
  - Combinam átomos e moléculas para funcionalidades completas
  - Contêm lógica de negócio e integração com APIs/stores

- **`views/`** - **Templates/Pages**
  - Páginas completas da aplicação
  - Combinam organisms, molecules e atoms
  - Representam rotas da aplicação

### 💡 Boas Práticas do Atomic Design

1. **Mantenha os átomos (atoms/) simples e genéricos**
   - Sem lógica de negócio
   - Configuráveis via props
   - Documentados com exemplos
   - Não importam outros componentes

2. **Molecules (molecules/) devem ser reutilizáveis**
   - Podem conter lógica de apresentação
   - Devem funcionar em diferentes contextos
   - Compostos principalmente por atoms

3. **Organisms (organisms/) são específicos do domínio**
   - Podem conter lógica de negócio
   - Integram com APIs e stores
   - Específicos para funcionalidades da aplicação
   - Combinam atoms e molecules

### 🔄 Quando usar cada nível?

**Use Atoms quando:**
- Precisa de um componente básico reutilizável (Button, Input)
- Não há lógica de negócio
- Será usado em múltiplos contextos

**Use Molecules quando:**
- Precisa combinar vários atoms
- Criar componentes de layout (Header, Card)
- Adicionar lógica de apresentação

**Use Organisms quando:**
- Funcionalidade específica do domínio (GroupList)
- Integração com API ou Pinia store
- Lógica de negócio complexa

## 📝 Convenções de Código

### Geral
- Use TypeScript para tipagem estática
- Siga o padrão de Composition API do Vue 3 com `<script setup>`
- Nomeie componentes usando PascalCase
- Use ESLint/Prettier para formatação consistente

### Componentes
- **Atoms (atoms/)**: Nome simples e descritivo (ex: `Button.vue`, `Input.vue`, `Icon.vue`)
- **Molecules (molecules/)**: Nome descritivo da função (ex: `FormField.vue`, `SearchBar.vue`, `AppHeader.vue`)
- **Organisms (organisms/)**: Nome relacionado ao domínio (ex: `GroupList.vue`, `GroupForm.vue`, `UserProfile.vue`)
- **Views**: Nome da página + "Page" ou "View" (ex: `LoginPage.vue`, `GroupsView.vue`)

### Organização de Arquivos
```vue
<script setup lang="ts">
// 1. Imports
// 2. Props/Emits
// 3. Composables/Stores
// 4. State
// 5. Computed
// 6. Methods
// 7. Lifecycle hooks
</script>

<template>
  <!-- Template aqui -->
</template>

<style scoped>
/* Estilos específicos do componente */
</style>
```

## 🐛 Solução de Problemas

### Problema com permissões no Windows
Se encontrar erros de permissão ao executar scripts PowerShell:
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### Porta 5173 já em uso
Se a porta padrão estiver ocupada, você pode especificar outra:
```bash
bun run dev -- --port 3000
```

### Cache do Bun
Se tiver problemas com dependências, limpe o cache:
```bash
bun pm cache rm
bun install
```

## 📖 Recursos Úteis

- [Documentação do Vue 3](https://vuejs.org/)
- [Documentação do TypeScript](https://www.typescriptlang.org/)
- [Documentação do Vite](https://vitejs.dev/)
- [Documentação do Bun](https://bun.sh/docs)
- [Documentação do PrimeVue](https://primevue.org/)
- [Atomic Design Methodology](https://atomicdesign.bradfrost.com/)
- [Components README](./src/components/README.md)

## 📄 Licença

MIT License