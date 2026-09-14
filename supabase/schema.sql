-- Perfumaria LN — schema do banco (rodar no SQL Editor do Supabase)

create extension if not exists "pgcrypto";

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  brand text not null,
  category text not null,
  price numeric(10, 2) not null default 0,
  description text not null default '',
  image_url text,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

alter table public.products enable row level security;

-- Qualquer visitante pode ler apenas produtos ativos (site público)
create policy "Público pode ver produtos ativos"
  on public.products for select
  to anon
  using (active = true);

-- Usuários autenticados (admin) podem ver todos os produtos, inclusive ocultos
create policy "Admin pode ver todos os produtos"
  on public.products for select
  to authenticated
  using (true);

-- Apenas usuários autenticados podem inserir/editar/excluir
create policy "Admin pode inserir produtos"
  on public.products for insert
  to authenticated
  with check (true);

create policy "Admin pode editar produtos"
  on public.products for update
  to authenticated
  using (true)
  with check (true);

create policy "Admin pode excluir produtos"
  on public.products for delete
  to authenticated
  using (true);

-- Storage: bucket público de imagens dos produtos
insert into storage.buckets (id, name, public)
values ('product-images', 'product-images', true)
on conflict (id) do nothing;

create policy "Público pode ver imagens dos produtos"
  on storage.objects for select
  to public
  using (bucket_id = 'product-images');

create policy "Admin pode enviar imagens"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'product-images');

create policy "Admin pode atualizar imagens"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'product-images');

create policy "Admin pode excluir imagens"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'product-images');
