# 📋 To-Do List Project

Este repositorio contiene dos partes:

1. **backend/**: API en Node.js + Express usando Supabase y JWT.  
2. **frontend/**: SPA en React (Vite) con TailwindCSS.

## 🔧 Prerrequisitos

- Node.js ≥ 16  
- pnpm o npm  
- Proyecto en [Supabase](https://app.supabase.com) con:  
  - Tablas **categories** y **tasks**  
  - Foreign key `tasks.category_id → categories.id`  
  - API keys (anon y service_role)

## 🛠️ Backend

1. `cd backend`  
2. Crea `backend/.env` con:
   ```env
   SUPABASE_URL=https://<tu-proyecto>.supabase.co
   SUPABASE_ANON_KEY=<tu_anon_key>
   SUPABASE_SERVICE_ROLE_KEY=<tu_service_role_key>
   JWT_SECRET=<clave_larga_y_aleatoria>
   JWT_EXPIRES_IN=1h
   PORT=4000
   ```  
3. Instalar dependencias:
   ```bash
   pnpm install
   ```  
4. Arrancar la API:
   ```bash
   pnpm start
   # o
   node -r dotenv/config src/index.js
   ```  
   La API quedará en `http://localhost:4000`.  
5. Ejecutar pruebas unitarias (Vitest):
   ```bash
   pnpm test
   pnpm test:watch
   ```

## 🖥️ Frontend

1. `cd frontend`  
2. Crea `frontend/.env` con:
   ```env
   VITE_API_URL=http://localhost:4000/api
   ```  
3. Instalar dependencias:
   ```bash
   pnpm install
   ```  
4. Levantar el servidor de desarrollo:
   ```bash
   pnpm dev
   ```  
   Abre `http://localhost:5173`.  
5. Para producción:
   ```bash
   pnpm build
   pnpm preview
   ```

## 🔗 Flujo de trabajo

1. Regístrate o haz login en el frontend.  
2. El JWT se guarda en `localStorage` y se envía en el header `Authorization`.  
3. El backend valida el token en `/api/categories` y `/api/tasks`.  
4. Realiza CRUD de categorías y tareas, asigna categorías y marca tareas como hechas.
