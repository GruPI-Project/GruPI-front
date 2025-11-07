# =================================================================
# Dockerfile para GRUPI Frontend
# =================================================================

# Build stage
FROM oven/bun:latest AS builder

# Definir diretório de trabalho
WORKDIR /app


# Copiar arquivos de dependências
COPY package*.json ./
COPY bun.lock* ./

# Instalar dependências (Bun ou NPM)
RUN bun install

# Copiar código fonte
COPY . .

# Construir a aplicação
RUN bun run build

# Production stage
FROM nginx:alpine AS production

# Copiar arquivos de build para o nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Copiar configuração personalizada do nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expor porta
EXPOSE 80

# Comando para iniciar o nginx
CMD ["nginx", "-g", "daemon off;"]