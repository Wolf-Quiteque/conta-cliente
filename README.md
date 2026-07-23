# NAWA Contas — Cliente

App mobile-first onde os clientes fotografam e enviam os seus recibos (com
valor e data opcionais quando a foto sai pouco nítida). As contas ficam
pendentes até serem aprovadas no painel de administração (`conta-admin`).

## Stack

- Next.js 16 (App Router, Server Actions, Proxy)
- Neon Postgres + Drizzle ORM
- Vercel Blob (upload direto do browser, com conversão para WebP no cliente)
- Tailwind CSS v4
- Sessões com cookie assinado (JWT via `jose`)

## Configuração

1. Copie `.env.example` para `.env.local` e preencha:
   - `DATABASE_URL` — connection string do Neon (Vercel → Storage → Neon).
   - `BLOB_READ_WRITE_TOKEN` — token do Vercel Blob (Vercel → Storage → Blob).
   - `SESSION_SECRET` — gerar com `openssl rand -base64 32`.

   **Importante:** `DATABASE_URL` e `BLOB_READ_WRITE_TOKEN` devem ser os
   mesmos usados no projeto `conta-admin`, porque ambas as apps partilham a
   mesma base de dados e o mesmo espaço de armazenamento.

2. Instale as dependências:

   ```bash
   npm install
   ```

3. Crie as tabelas na base de dados (basta correr uma vez, a partir de
   qualquer um dos dois projetos, já que partilham o schema):

   ```bash
   npm run db:push
   ```

4. Crie o primeiro administrador — ver README do `conta-admin`
   (`npm run seed:admin`).

5. Arranque em desenvolvimento:

   ```bash
   npm run dev
   ```

## Fluxo

1. O cliente regista-se (`/registar`) e fica com estado **pendente**.
2. Um administrador aprova a conta em `conta-admin`.
3. Só depois de **aprovado** o cliente consegue enviar recibos em `/recibos`.
4. Cada envio: foto é redimensionada e convertida para WebP no browser,
   enviada diretamente para o Vercel Blob, e o registo (valor/data/nota) é
   guardado na base de dados.

## Deploy

Faça deploy como um projeto Vercel normal, com as três variáveis de ambiente
acima configuradas em Production/Preview. Recomenda-se ligar o mesmo recurso
Neon e o mesmo Blob Store usados pelo `conta-admin`.
