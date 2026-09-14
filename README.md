# Perfumaria LN — Site + Painel Administrativo

Site institucional/catálogo e painel admin da Perfumaria LN (Corumbá, MS).

## Stack

- **Frontend:** React + Vite + TypeScript + Tailwind CSS v4 + React Router
- **Backend:** [Supabase](https://supabase.com) (Postgres + Auth + Storage) — plano gratuito
- **Deploy sugerido:** Vercel (frontend) — o backend já fica hospedado no Supabase

## 1. Configurar o Supabase

1. Crie uma conta gratuita em [supabase.com](https://supabase.com) e crie um novo projeto.
2. No painel do projeto, vá em **SQL Editor** → cole e execute o conteúdo de [`supabase/schema.sql`](./supabase/schema.sql). Isso cria a tabela `products`, as políticas de segurança (RLS) e o bucket de imagens `product-images`.
3. Vá em **Authentication → Users** → **Add user** e crie o usuário da dona da loja (e-mail + senha). Esse será o login do painel `/admin`. Desative "Confirm email" ou confirme manualmente o usuário para não depender de e-mail.
4. Vá em **Project Settings → API** e copie:
   - `Project URL`
   - `anon public key`

## 2. Configurar o projeto localmente

```bash
cp .env.example .env
```

Edite `.env` com os valores copiados do Supabase:

```
VITE_SUPABASE_URL=https://SEU-PROJETO.supabase.co
VITE_SUPABASE_ANON_KEY=sua-chave-anon-publica
```

Instale as dependências e rode o servidor de desenvolvimento:

```bash
npm install
npm run dev
```

Acesse `http://localhost:5173` para o site público e `http://localhost:5173/admin` para o painel (será redirecionado ao login).

## 3. Estrutura de pastas

```
src/
  assets/media/      Logo, ícones de contato e vídeo do topo
  components/
    layout/          Header, Footer, botão flutuante do WhatsApp
    home/            Hero, Sobre, Catálogo, Card de produto, Localização
    admin/           Formulário de produto, tabela de produtos, rota protegida
  hooks/
    useProducts.ts   Busca de produtos no Supabase
  lib/
    supabase.ts      Cliente Supabase
    AuthContext.tsx  Contexto de autenticação do admin
    whatsapp.ts       Geração de links do WhatsApp
  pages/
    Home.tsx         Site público
    admin/
      Login.tsx
      Dashboard.tsx
  types/
    product.ts
supabase/
  schema.sql          Schema do banco + políticas de segurança
```

## 4. Conteúdo que ainda precisa ser confirmado pela loja

Alguns textos/dados foram preenchidos com placeholders até serem confirmados:

- **Endereço real da loja** e o embed do Google Maps ([`src/components/home/Location.tsx`](./src/components/home/Location.tsx))
- **Horário de funcionamento** exibido no rodapé ([`src/components/layout/Footer.tsx`](./src/components/layout/Footer.tsx))
- **Texto institucional "Sobre a loja"** ([`src/components/home/About.tsx`](./src/components/home/About.tsx))
- **Produtos do catálogo** — cadastrados pelo painel `/admin` (não há produtos de exemplo no banco)

## 5. Deploy

### Frontend (Vercel)

1. Suba o projeto para um repositório Git (GitHub/GitLab).
2. Importe o repositório na [Vercel](https://vercel.com).
3. Configure as variáveis de ambiente `VITE_SUPABASE_URL` e `VITE_SUPABASE_ANON_KEY` no painel da Vercel.
4. Deploy — a Vercel detecta automaticamente o projeto Vite.

### Backend

Nada a fazer — o Supabase já está hospedado. Basta manter o projeto ativo no plano gratuito (ele pausa projetos gratuitos após 7 dias sem uso; basta reativar no painel se isso acontecer).

## Comandos úteis

```bash
npm run dev      # servidor de desenvolvimento
npm run build     # build de produção
npm run preview   # pré-visualizar o build de produção
npm run lint       # ESLint
```
