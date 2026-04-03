# Frontend - Hackaton Plataforma de Estudos

Aplicação frontend construída com **React + Vite**, com tema visual **Deep Ocean** e tipografia **Poppins**. Assim como o backend, o frontend também possui duas formas de rodar, localmente ou via docker, abaixo tem as instruções de como rodar das duas formas.

## 📋 Pré-requisitos

Antes de começar, garanta que você tem instalado:

- **Node.js** (recomendado: 18+)
- **npm** (ou pnpm/yarn)
- **Docker** (opcional, porém preferível)

## 🚀 Como rodar o frontend localmente

1. Entre na pasta do frontend:

```bash
cd Hackaton-plataforma-de-estudos/frontend
```

2. Instale as dependências:

```bash
npm install
```

3. Configure as variáveis de ambiente (se ainda não existir):

Copie o arquivo `.env.example` e renomeie-o para `.env` na raiz do frontend, abaixo está um exemplo de como devem ficar suas variáveis de ambiente:

```env
VITE_BACKEND_API_URL=http://localhost:3000/api
```

4. Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

5. Abra no navegador o endereço exibido no terminal (normalmente):

- `http://localhost:5173`

---

## 🚀 Como rodar o frontend via docker

Com o docker iniciado, na pasta **`frontend`** digite o comando abaixo no seu terminal:

```bash
docker-compose up -d
```

## 🔧 Comandos principais

### `npm run dev`
Inicia o frontend em modo desenvolvimento com hot reload.

### `npm run build`
Gera a versão de produção na pasta `dist/`.

### `npm run preview`
Sobe um servidor local para visualizar a build de produção.

### `npm run lint`
Executa o ESLint no projeto para identificar problemas de padrão/código.

### `npm run format`
Formata arquivos `js`, `jsx`, `css` e `html` com Prettier.

---

## 🧩 Stack principal

- **React**
- **Vite**
- **React Router DOM**
- **Material UI (MUI)**
- **ESLint + Prettier**

---

## 🔗 Integração com backend

Este frontend espera um backend rodando em:

- `http://localhost:3000/api`

Se necessário, ajuste no arquivo `.env`:

```env
VITE_BACKEND_API_URL=http://localhost:3000/api
```

---

## ✅ Fluxo esperado

- Página inicial (Home)
- Login/Cadastro via modal
- Após autenticação, acesso à página de tarefas (rota protegida)
- Gerenciamento de tarefas (criar, editar, concluir, excluir)
