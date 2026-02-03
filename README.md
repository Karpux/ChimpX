# ChimpX Threads

Interfaz estilo Threads creada con React + Vite y preparada para Supabase como backend.

## Requisitos

- Node.js 18+

## Configuración de Supabase

1. Crea un proyecto en Supabase.
2. Crea una tabla `posts` con columnas `id`, `content`, `author`, `handle`.
3. Copia `.env.example` a `.env` y completa los valores:

```bash
cp .env.example .env
```

```bash
VITE_SUPABASE_URL=tu_url
VITE_SUPABASE_ANON_KEY=tu_anon_key
```

## Deploy en Vercel

1. Importa el repositorio en Vercel.
2. Define las variables `VITE_SUPABASE_URL` y `VITE_SUPABASE_ANON_KEY` en el panel.
3. Vercel usará `npm run build` y publicará la carpeta `dist`.

## Scripts

```bash
npm install
npm run dev
```
