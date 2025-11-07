# Grupi-front

Sistema de gerenciamento de grupos desenvolvido com Vue 3 + TypeScript + Vite + Bun.

## 📋 Índice

- [🚀 Tecnologias](#-tecnologias)
- [📋 Pré-requisitos](#-pré-requisitos)
- [⚡ Início Rápido](#-início-rápido)
- [🔧 Configuração do Ambiente de Desenvolvimento](#-configuração-do-ambiente-de-desenvolvimento)
- [🐳 Docker](#-docker)
- [🔧 Variáveis de Ambiente](#-variáveis-de-ambiente)
- [📜 Scripts Disponíveis](#-scripts-disponíveis)
- [🏗️ Estrutura do Projeto](#️-estrutura-do-projeto)
- [🎨 Atomic Design](#-atomic-design)
- [📝 Convenções de Código](#-convenções-de-código)
- [🐛 Solução de Problemas](#-solução-de-problemas)
- [📖 Recursos Úteis](#-recursos-úteis)
- [📄 Licença](#-licença)

## ⚡ Início Rápido

### Docker (Recomendado)

#### Ambiente Local (Hot Reload)
```bash
docker-compose -f docker-compose.local.yml up grupi-frontend-local
# Acessar: http://localhost:5173
```

#### Ambiente de Desenvolvimento (Staging)
```bash
docker-compose -f docker-compose.dev.yml up grupi-frontend-dev
# Acessar: http://localhost:3001
```

#### Ambiente de Produção
```bash
docker-compose -f docker-compose.prod.yml up grupi-frontend
# Acessar: http://localhost:3000
```

### Local (Sem Docker)

```bash
# 1. Instalar dependências
bun install

# 2. Configurar variáveis de ambiente
cp .env.example .env

# 3. Iniciar servidor de desenvolvimento
bun run dev
```

## 🚀 Tecnologias

- **Bun** - Runtime JavaScript rápido e gerenciador de pacotes
- **Vite** - Build tool e dev server
- **Vue 3** - Framework progressivo JavaScript
- **TypeScript** - Superset tipado do JavaScript
- **PrimeVue** - Biblioteca de componentes UI
- **Vue Router** - Roteamento oficial para Vue.js
- **Pinia** - Gerenciamento de estado para Vue
- **Docker** - Containerização para desenvolvimento e produção

## 🐳 Docker

O projeto inclui configurações completas para três ambientes diferentes:

### Serviços por Ambiente

- **grupi-frontend-local**: Ambiente local com hot reload
- **grupi-frontend-dev**: Ambiente de desenvolvimento (staging)
- **grupi-frontend**: Ambiente de produção

### Comandos Docker por Ambiente

#### Desenvolvimento Local
```bash
# Executar aplicação em desenvolvimento com hot reload
docker-compose -f docker-compose.local.yml up grupi-frontend-local

# Em background
docker-compose -f docker-compose.local.yml up -d grupi-frontend-local
```

A aplicação estará disponível em: http://localhost:5173

#### Ambiente de Desenvolvimento (Staging)
```bash
# Build e execução da aplicação de desenvolvimento
docker-compose -f docker-compose.dev.yml up grupi-frontend-dev

# Em background
docker-compose -f docker-compose.dev.yml up -d grupi-frontend-dev
```

A aplicação estará disponível em: http://localhost:3001

#### Produção
```bash
# Build e execução da aplicação de produção
docker-compose -f docker-compose.prod.yml up grupi-frontend

# Em background
docker-compose -f docker-compose.prod.yml up -d grupi-frontend
```

A aplicação estará disponível em: http://localhost:3000

#### Comandos Úteis

```bash
# Parar todos os containers
docker-compose -f docker-compose.local.yml down
docker-compose -f docker-compose.dev.yml down
docker-compose -f docker-compose.prod.yml down

# Rebuild da imagem
docker-compose -f docker-compose.dev.yml build grupi-frontend-dev

# Ver logs
docker-compose -f docker-compose.prod.yml logs -f grupi-frontend

# Ver logs por ambiente
docker-compose -f docker-compose.local.yml logs -f grupi-frontend-local
docker-compose -f docker-compose.dev.yml logs -f grupi-frontend-dev
```

Para mais detalhes sobre Docker, consulte o arquivo [DOCKER_README.md](./DOCKER_README.md).

## 🔧 Variáveis de Ambiente

### Configuração de Ambiente

Antes de usar o projeto, copie o arquivo `.env.example` para `.env` e configure as variáveis:

```bash
cp .env.example .env
```

### Variáveis por Ambiente

| Variável | Descrição | Local (Desenvolvimento) | Desenvolvimento (Staging) | Produção |
|----------|-----------|------------------------|---------------------------|----------|
| `VITE_NODE_ENV` | Ambiente de execução | `development` | `development` | `production` |
| `VITE_API_BASE_URL` | URL base da API | `http://127.0.0.1:8000/api/v1/` | `https://api.grupi-dev.pavops.net/api/v1/` | `https://api.grupi.pavops.net/api/v1/` |
| `VITE_API_BASE_URL_CSRF` | URL base para CSRF | `http://127.0.0.1:8000/` | `https://api.grupi-dev.pavops.net/` | `https://api.grupi.pavops.net/` |
| `VITE_APP_TITLE` | Título da aplicação | `GruPI - Desenvolvimento Local` | `GruPI - Desenvolvimento` | `GruPI - Plataforma de Gerenciamento` |
| `VITE_APP_VERSION` | Versão da aplicação | `1.0.0-dev` | `1.0.0-dev` | `1.0.0` |
| `VITE_API_TIMEOUT` | Timeout das requisições API (ms) | `30000` | `30000` | `30000` |
| `VITE_ENABLE_MOCKS` | Ativar mocks para desenvolvimento | `false` | `false` | `false` |
| `VITE_ENABLE_DEBUG` | Ativar logs de debug | `true` | `true` | `false` |

### Configuração Rápida

Para trocar de ambiente, descomente as variáveis correspondentes no arquivo `.env.example`:

```env
# Ambiente Local (padrão)
VITE_API_BASE_URL=http://127.0.0.1:8000/api/v1/
VITE_API_BASE_URL_CSRF=http://127.0.0.1:8000/

# Ambiente de Desenvolvimento
# VITE_API_BASE_URL=https://api.grupi-dev.pavops.net/api/v1/
# VITE_API_BASE_URL_CSRF=https://api.grupi-dev.pavops.net/

# Ambiente de Produção
# VITE_API_BASE_URL=https://api.grupi.pavops.net/api/v1/
# VITE_API_BASE_URL_CSRF=https://api.grupi.pavops.net/
```

## 📋 Pré-requisitos

### Windows

1. **Instalar Bun**
   ```bash
   powershell -c "irm bun.sh/install.ps1 | iex"
   ```
   
   Ou baixe o instalador em: https://bun.sh/

2. **Docker** (Recomendado para desenvolvimento)
   - Baixe em: https://www.docker.com/products/docker-desktop/

3. **Git** (opcional, mas recomendado)
   - Baixe em: https://git-scm.com/download/win

### Linux

1. **Instalar Bun**
   ```bash
   curl -fsSL https://bun.sh/install | bash
   ```

2. **Docker** (Recomendado para desenvolvimento)
   ```bash
   # Ubuntu/Debian
   sudo apt update
   sudo apt install docker.io docker-compose
   
   # Fedora
   sudo dnf install docker docker-compose
   ```

3. **Git** (opcional, mas recomendado)
   ```bash
   # Ubuntu/Debian
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

### 3. Configurar Variáveis de Ambiente

```bash
cp .env.example .env
```

Edite o arquivo `.env` conforme necessário para seu ambiente.

### 4. Iniciar o Servidor de Desenvolvimento

```bash
# Local
bun run dev

# Ou via Docker (recomendado)
docker-compose -f docker-compose.local.yml up grupi-frontend-local
```

O projeto estará disponível em: http://localhost:5173

## 📜 Scripts Disponíveis

- **`bun run dev`** - Inicia o servidor de desenvolvimento
- **`bun run build`** - Cria a versão de produção otimizada
- **`bun run preview`** - Pré-visualiza a build de produção localmente

### Scripts Docker

- **`docker-compose -f docker-compose.local.yml up`** - Ambiente local com hot reload
- **`docker-compose -f docker-compose.dev.yml up`** - Ambiente de desenvolvimento
- **`docker-compose -f docker-compose.prod.yml up`** - Ambiente de produção
- **`docker-compose -f docker-compose.dev.yml build`** - Rebuild das imagens Docker

## 🏗️ Estrutura do Projeto

```
Grupi-front/
├── public/                    # Arquivos estáticos
├── src/
│   ├── assets/               # Recursos (imagens, ícones, etc)
│   ├── components/           # Componentes Vue (Atomic Design)
│   │   ├── atoms/            # Atoms - Componentes básicos indivisíveis
│   │   ├── molecules/        # Molecules - Componentes compostos
│   │   └── organisms/        # Organisms - Componentes complexos do domínio
│   ├── router/               # Configuração de rotas
│   ├── services/             # Serviços (API, autenticação, etc)
│   ├── stores/               # Pinia stores para gerenciamento de estado
│   ├── types/                # Definições TypeScript
│   ├── views/                # Templates/Pages da aplicação
│   ├── App.vue               # Componente raiz
│   ├── main.ts               # Ponto de entrada da aplicação
│   └── style.css             # Estilos globais
├── .env.example              # Exemplo de variáveis de ambiente
├── Dockerfile                # Docker para produção
├── Dockerfile.dev            # Docker para desenvolvimento
├── docker-compose.yml        # Configuração principal do Docker
├── nginx.conf                # Configuração do Nginx
├── DOCKER_README.md          # Documentação detalhada do Docker
├── index.html                # Template HTML
├── package.json              # Dependências e scripts
├── vite.config.ts            # Configuração do Vite
└── tsconfig.json             # Configuração do TypeScript
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
- Configure APIs via variáveis de ambiente (não hard-code)

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

### Docker - API não responde
- Verifique se as URLs das APIs estão corretas no `.env`
- Confirme se o backend está rodando
- Para desenvolvimento local, use `host.docker.internal:8000` nas URLs

### Docker - Build falha
```bash
# Rebuild da imagem
docker-compose build --no-cache

# Ou limpe o cache do Docker
docker system prune -a
```

### Docker - Hot reload não funciona
- Verifique se o volume está mountado corretamente
- Confirme se a porta 5173 está livre
- Use `docker-compose -f docker-compose.local.yml up grupi-frontend-local` para desenvolvimento

### Portas em uso por ambiente

| Ambiente | Porta | Verificar se está em uso |
|----------|-------|-------------------------|
| Local | 5173 | `netstat -tulpn \| grep :5173` |
| Desenvolvimento | 3001 | `netstat -tulpn \| grep :3001` |
| Produção | 3000 | `netstat -tulpn \| grep :3000` |

## 📖 Recursos Úteis

### Documentação
- [Documentação do Vue 3](https://vuejs.org/)
- [Documentação do TypeScript](https://www.typescriptlang.org/)
- [Documentação do Vite](https://vitejs.dev/)
- [Documentação do Bun](https://bun.sh/docs)
- [Documentação do PrimeVue](https://primevue.org/)
- [Documentação do Docker](https://docs.docker.com/)
- [Docker Compose Documentation](https://docs.docker.com/compose/)
- [Atomic Design Methodology](https://atomicdesign.bradfrost.com/)

### Arquivos de Configuração
- [DOCKER_README.md](./DOCKER_README.md) - Documentação detalhada do Docker
- [`.env.example`](./.env.example) - Exemplo de variáveis de ambiente

## 📄 Licença

MIT License