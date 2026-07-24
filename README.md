# NAWA Contas — Cliente

App mobile-first onde os membros de uma empresa fotografam e enviam os seus
recibos (com valor e data opcionais quando a foto sai pouco nítida). Cada
utilizador pertence a uma empresa; a empresa fica pendente até ser aprovada
no painel de administração (`conta-admin`).

## Stack

- Next.js 16 (App Router, Server Actions, Proxy)
- Neon Postgres + Drizzle ORM
- Vercel Blob (upload direto do browser, com conversão para WebP no cliente)
- Tailwind CSS v4
- Sessões com cookie assinado (JWT via `jose`)

## Configuração

1. Copie `.env.example` para `.env.local` e preencha:
   - `DATABASE_URL_UNPOOLED` — connection string do Neon (Vercel → Storage → Neon).
   - `BLOB_READ_WRITE_TOKEN` — só é usado como *fallback* local. O código nunca
     lê esta variável diretamente (`upload()`/`handleUpload()` são chamados
     sem `token`), por isso em produção, se a loja Blob estiver ligada via
     `BLOB_STORE_ID` + `BLOB_WEBHOOK_PUBLIC_KEY` (Vercel → Storage → Blob),
     não precisa de configurar nada aqui — o `VERCEL_OIDC_TOKEN` é injetado
     automaticamente pela Vercel em runtime e a biblioteca `@vercel/blob`
     usa-o sozinha.
   - `SESSION_SECRET` — gerar com `openssl rand -base64 32`.

   **Importante:** `DATABASE_URL_UNPOOLED` deve ser o mesmo usado no projeto
   `conta-admin`, porque ambas as apps partilham a mesma base de dados. Em
   produção, a Vercel pode expor esta variável com um prefixo específico do
   projeto (ex.: `nawabus_cliene_conta_DATABASE_URL_UNPOOLED`) — o código já
   trata isso (`lib/db/connection-string.ts`), não precisa de igualar os
   nomes manualmente.

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

1. Em `/registar` cria-se uma empresa (nome, NIF, morada, contacto) e o
   primeiro utilizador fica como **dono/admin** dessa empresa. A empresa
   fica com estado **pendente**.
2. Um administrador da plataforma aprova a empresa em `conta-admin`.
3. Só depois de **aprovada** os membros conseguem enviar recibos em
   `/recibos` (partilhado por toda a empresa).
4. Cada envio: foto é redimensionada e convertida para WebP no browser,
   enviada diretamente para o Vercel Blob, e o registo (valor/data/nota) é
   guardado na base de dados, associado à empresa e a quem o enviou.
5. Em `/equipa`, membros com função **Admin** podem adicionar novos membros
   (nome, email, palavra-passe inicial, função Admin/Gestor). Membros
   **Gestor** só podem enviar recibos.

## Deploy

Faça deploy como um projeto Vercel normal, ligado ao mesmo recurso Neon e à
mesma loja Blob usados pelo `conta-admin`, com `SESSION_SECRET` definido
(cada app pode ter o seu próprio valor). `DATABASE_URL_UNPOOLED` e as
variáveis do Blob costumam já vir configuradas automaticamente pelas
integrações Vercel-Neon e Vercel-Blob.
