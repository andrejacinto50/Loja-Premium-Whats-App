# Loja Premium com Venda pelo WhatsApp

Front-end React pronto para modelo de loja premium com catálogo, página de produto, WhatsApp inteligente e painel admin visual.

## Rodar o projeto

```bash
npm install
npm run dev
```

## Páginas públicas

- `/` Home
- `/catalogo` Catálogo com busca, filtro e ordenação
- `/produto/camiseta-premium-preta` Produto individual

## Painel admin visual

- `/admin/login`
- `/admin`
- `/admin/produtos`
- `/admin/categorias`
- `/admin/banners`
- `/admin/configuracoes`

## Onde editar agora

- `src/data/products.js`
- `src/data/categories.js`
- `src/data/banners.js`
- `src/data/storeConfig.js`

## Onde conectar Supabase depois

Trocar os arquivos de `src/services/` para buscar dados no Supabase.
O arquivo `src/lib/supabase.js` já está separado para isso.
