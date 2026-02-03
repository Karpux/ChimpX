# ChimpX Threads

Interfaz estilo Threads creada con React + Vite y preparada para Supabase como backend.

## Requisitos

- Node.js 18+

## Configuración de Supabase

1. Crea un proyecto en Supabase.
2. Crea una tabla `posts` con columnas `id`, `content`, `author`, `handle`.
3. Define las variables de entorno en un archivo `.env`:

```bash
VITE_SUPABASE_URL=tu_url
VITE_SUPABASE_ANON_KEY=tu_anon_key
```

## Scripts

```bash
npm install
npm run dev
```
