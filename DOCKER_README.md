# Configuração Docker e Variáveis de Ambiente - GRUPI Frontend

## 📋 Visão Geral

Este documento explica como configurar as variáveis de ambiente e usar o Docker para os três ambientes do projeto GRUPI Frontend:

1. **Ambiente Local** - Desenvolvimento local com hot reload
2. **Ambiente de Desenvolvimento** - Staging para testes de integração
3. **Ambiente de Produção** - Ambiente final de produção

## 🔧 Configuração de Ambientes

### 1. Ambiente Local (Desenvolvimento Local)

**URLs:**
- Frontend: `http://localhost:5173`
- API: `http://localhost:8000`
- CSRF: `http://localhost:8000`

**Características:**
- Hot reload habilitado
- Debug ativado
- Volumes mountados para desenvolvimento
- Conexão via `host.docker.internal`

### 2. Ambiente de Desenvolvimento (Staging)

**URLs:**
- Frontend: `http://localhost:3001`
- API: `https://api.grupi-dev.pavops.net`
- CSRF: `https://api.grupi-dev.pavops.net`

**Características:**
- Build otimizado para staging
- Integração com API de desenvolvimento
- Debug ativado
- Ideal para testes de integração

### 3. Ambiente de Produção

**URLs:**
- Frontend: `http://localhost:3000`
- API: `https://api.grupi.pavops.net`
- CSRF: `https://api.grupi.pavops.net`

**Características:**
- Build otimizado para produção
- Integração com API de produção
- Debug desativado
- Headers de segurança completos
- Cache otimizado

## 🔧 Variáveis de Ambiente

### Configuração de Ambiente

Antes de usar o projeto, copie o arquivo `.env.example` para `.env` e configure as variáveis:

```bash
cp .env.example .env
```

### Variáveis por Ambiente

| Variável | Local (Desenvolvimento) | Desenvolvimento (Staging) | Produção |
|----------|------------------------|---------------------------|----------|
| `VITE_NODE_ENV` | `development` | `development` | `production` |
| `VITE_API_BASE_URL` | `http://127.0.0.1:8000/api/v1/` | `https://api.grupi-dev.pavops.net/api/v1/` | `https://api.grupi.pavops.net/api/v1/` |
| `VITE_API_BASE_URL_CSRF` | `http://127.0.0.1:8000/` | `https://api.grupi-dev.pavops.net/` | `https://api.grupi.pavops.net/` |
| `VITE_APP_TITLE` | `GruPI - Desenvolvimento Local` | `GruPI - Desenvolvimento` | `GruPI - Plataforma de Gerenciamento` |
| `VITE_APP_VERSION` | `1.0.0-dev` | `1.0.0-dev` | `1.0.0` |
| `VITE_ENABLE_DEBUG` | `true` | `true` | `false` |

### Configuração Rápida

Para切换 ambiente, descomente as variáveis correspondentes no arquivo `.env.example`:

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

## 🐳 Docker

### Pré-requisitos

- Docker instalado
- Docker Compose instalado

### Arquivos de Compose por Ambiente

#### Ambiente Local (com hot reload)
```bash
docker-compose -f docker-compose.local.yml up grupi-frontend-local
```

#### Ambiente de Desenvolvimento (Staging)
```bash
docker-compose -f docker-compose.dev.yml up grupi-frontend-dev
```

#### Ambiente de Produção
```bash
docker-compose -f docker-compose.prod.yml up grupi-frontend
```

### Comandos Docker Completos

#### Desenvolvimento Local
```bash
# Iniciar ambiente local com hot reload
docker-compose -f docker-compose.local.yml up grupi-frontend-local

# Em background
docker-compose -f docker-compose.local.yml up -d grupi-frontend-local

# Acessar: http://localhost:5173
```

#### Ambiente de Desenvolvimento (Staging)
```bash
# Iniciar ambiente de desenvolvimento
docker-compose -f docker-compose.dev.yml up grupi-frontend-dev

# Em background
docker-compose -f docker-compose.dev.yml up -d grupi-frontend-dev

# Acessar: http://localhost:3001
```

#### Produção
```bash
# Iniciar ambiente de produção
docker-compose -f docker-compose.prod.yml up grupi-frontend

# Em background
docker-compose -f docker-compose.prod.yml up -d grupi-frontend

# Acessar: http://localhost:3000
```

#### Comandos Úteis

```bash
# Parar todos os containers
docker-compose -f docker-compose.local.yml down
docker-compose -f docker-compose.dev.yml down
docker-compose -f docker-compose.prod.yml down

# Rebuild de um serviço específico
docker-compose -f docker-compose.dev.yml build grupi-frontend-dev

# Ver logs
docker-compose -f docker-compose.prod.yml logs -f grupi-frontend

# Ver logs de um serviço específico
docker-compose -f docker-compose.local.yml logs -f grupi-frontend-local

# Limpar tudo e recomeçar
docker-compose -f docker-compose.local.yml down --volumes --remove-orphans
docker-compose -f docker-compose.dev.yml down --volumes --remove-orphans
docker-compose -f docker-compose.prod.yml down --volumes --remove-orphans
docker system prune -a
```

## 🔄 Configuração de Rede

### Mapeamento de Portas

| Ambiente | Porta Frontend | Descrição |
|----------|----------------|-----------|
| Local | 5173 | Desenvolvimento com hot reload |
| Desenvolvimento | 3001 | Staging para testes |
| Produção | 3000 | Ambiente de produção |

### URLs de API

| Ambiente | API Base URL | CSRF URL |
|----------|-------------|----------|
| Local | `http://localhost:8000/api/v1/` | `http://localhost:8000/` |
| Desenvolvimento | `https://api.grupi-dev.pavops.net/api/v1/` | `https://api.grupi-dev.pavops.net/` |
| Produção | `https://api.grupi.pavops.net/api/v1/` | `https://api.grupi.pavops.net/` |

## 🔒 Configurações de Segurança

### Nginx (Produção e Desenvolvimento)
- Headers de segurança habilitados
- Compression gzip
- Cache para assets estáticos
- Configuração para SPA (Single Page Application)

### Headers de Segurança Incluídos
- `X-Frame-Options: SAMEORIGIN`
- `X-XSS-Protection: 1; mode=block`
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: no-referrer-when-downgrade`
- `Content-Security-Policy`

### Diferenças entre Ambientes
- **Local/Desenvolvimento**: Debug ativado, logs detalhados
- **Produção**: Debug desativado, otimizações máximas

## 🚀 Deploy por Ambiente

### Pipeline de Deploy

#### Ambiente de Desenvolvimento
1. **Build da imagem de desenvolvimento**:
   ```bash
   docker-compose -f docker-compose.dev.yml build grupi-frontend-dev
   ```

2. **Deploy no servidor de staging**:
   ```bash
   docker-compose -f docker-compose.dev.yml up -d
   ```

#### Produção
1. **Build da imagem de produção**:
   ```bash
   docker-compose -f docker-compose.prod.yml build grupi-frontend
   ```

2. **Push para registry**:
   ```bash
   docker tag grupi-frontend:latest registry.example.com/grupi-frontend:latest
   docker push registry.example.com/grupi-frontend:latest
   ```

3. **Deploy no servidor de produção**:
   ```bash
   docker-compose -f docker-compose.prod.yml up -d
   ```

### Configurações Específicas por Ambiente

#### Local
- Volume mounting para hot reload
- Debug habilitado
- Conexão via `host.docker.internal`

#### Desenvolvimento
- Build otimizado para staging
- Integração com API de desenvolvimento
- Health checks habilitados

#### Produção
- Build otimizado para performance
- Integração com API de produção
- Headers de segurança completos
- Monitoramento habilitado

## 📝 Logs e Monitoramento

### Visualizar Logs por Ambiente

```bash
# Logs em tempo real - Local
docker-compose -f docker-compose.local.yml logs -f

# Logs em tempo real - Desenvolvimento
docker-compose -f docker-compose.dev.yml logs -f

# Logs em tempo real - Produção
docker-compose -f docker-compose.prod.yml logs -f

# Logs de um serviço específico
docker-compose -f docker-compose.local.yml logs -f grupi-frontend-local
```

### Health Checks

Todos os ambientes incluem health checks:
- **Intervalo**: 30s
- **Timeout**: 10s
- **Tentativas**: 3

### Status dos Serviços

```bash
# Ver status de todos os serviços
docker-compose -f docker-compose.local.yml ps
docker-compose -f docker-compose.dev.yml ps
docker-compose -f docker-compose.prod.yml ps

# Ver status de um ambiente específico
docker-compose -f docker-compose.dev.yml ps
```

## 🔧 Troubleshooting por Ambiente

### Ambiente Local

1. **Hot reload não funciona**:
   ```bash
   # Verificar se o volume está mountado
   docker-compose -f docker-compose.local.yml up grupi-frontend-local
   
   # Verificar logs
   docker-compose -f docker-compose.local.yml logs grupi-frontend-local
   ```

2. **API não responde**:
   - Verificar se o backend está rodando em `localhost:8000`
   - Confirmar uso de `host.docker.internal` nas URLs

### Ambiente de Desenvolvimento

1. **Erro de CORS**:
   - Verificar se a API de desenvolvimento permite requests
   - Confirmar configurações de `withCredentials`

2. **Build falha**:
   ```bash
   # Rebuild completo
   docker-compose -f docker-compose.dev.yml build --no-cache
   ```

### Ambiente de Produção

1. **Site não carrega**:
   - Verificar se a API de produção está acessível
   - Confirmar configurações DNS

2. **Performance lenta**:
   - Verificar logs do Nginx
   - Confirmar compressão habilitada

### Problemas Gerais

1. **Porta já em uso**:
   ```bash
   # Verificar portas em uso
   netstat -tulpn | grep :5173
   netstat -tulpn | grep :3000
   netstat -tulpn | grep :3001
   
   # Parar containers conflitantes
   docker-compose -f docker-compose.local.yml down
   docker-compose -f docker-compose.dev.yml down
   docker-compose -f docker-compose.prod.yml down
   ```

2. **Erro de permissão**:
   ```bash
   # Ajustar permissões
   sudo chown -R $USER:$USER .
   chmod +x scripts/*.sh
   ```

3. **Cache do Docker**:
   ```bash
   # Limpar cache completo
   docker system prune -a
   docker volume prune
   ```

## 📚 Arquivos de Configuração

- `.env.example` - Exemplo de variáveis de ambiente por ambiente
- `Dockerfile` - Build para produção
- `Dockerfile.dev` - Desenvolvimento com hot reload
- `docker-compose.local.yml` - Configuração para ambiente local
- `docker-compose.dev.yml` - Configuração para ambiente de desenvolvimento
- `docker-compose.prod.yml` - Configuração para ambiente de produção
- `nginx.conf` - Configuração do Nginx
- `README.md` - Documentação principal

## 🔗 Links Úteis

- [Vite Environment Variables](https://vitejs.dev/guide/env-and-mode.html)
- [Docker Compose Documentation](https://docs.docker.com/compose/)
- [Nginx Configuration](https://nginx.org/en/docs/)
- [Docker Networking](https://docs.docker.com/network/)