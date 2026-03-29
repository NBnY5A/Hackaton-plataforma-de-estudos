# Hackaton - Plataforma de Estudos (Kizathon)

Esta é uma plataforma completa de gerenciamento de estudos e tarefas, desenvolvida para ajudar estudantes a manterem o foco e a organização. O projeto consiste em uma API robusta em Node.js e uma interface moderna e intuitiva em React.

## 🚀 Visão Geral do Projeto

A aplicação permite que usuários se cadastrem, façam login e gerenciem suas tarefas diárias. Possui um sistema de autenticação seguro, acompanhamento de progresso e filtros para tarefas pendentes e concluídas.

## 🛠️ Tecnologias Utilizadas

### **Frontend**
- **React** (com Vite)
- **Material UI (MUI)** para componentes de interface
- **React Router DOM** para navegação
- **CSS Modules** para estilização personalizada
- **Tema:** Deep Ocean | **Tipografia:** Poppins

### **Backend**
- **Node.js** com **Express.js**
- **Prisma ORM** para interação com o banco de dados
- **PostgreSQL** (rodando via Docker)
- **JWT (JSON Web Token)** para autenticação
- **Zod** para validação de esquemas e dados
- **Bcrypt** para hashing de senhas

---

## 📂 Estrutura de Pastas

```text
Hackaton-plataforma-de-estudos/
├── backend/          # API REST, Prisma e Configurações de Banco
├── frontend/         # Aplicação React e Assets
└── README.md         # Documentação Geral (este arquivo)
```

---

## 🔧 Como Executar o Projeto

### 1. Clonar o repositório
```bash
git clone <url-do-repositorio>
cd Hackaton-plataforma-de-estudos
```

### 2. Configuração do Backend
1. Entre na pasta: `cd backend`
2. Instale as dependências: `npm install`
3. Suba o banco de dados com Docker: `docker-compose up -d`
4. Configure o arquivo `.env`:
   ```env
   DATABASE_URL="postgresql://teste:teste@localhost:5432/teste"
   PORT=3000
   JWT_SECRET=sua_chave_secreta_aqui
   ```
5. Rode as migrations e gere o cliente Prisma:
   ```bash
   npx prisma db push
   npx prisma generate
   ```
6. Inicie o servidor: `npm run dev`

### 3. Configuração do Frontend
1. Em um novo terminal, entre na pasta: `cd frontend`
2. Instale as dependências: `npm install`
3. Configure o arquivo `.env`:
   ```env
   BACKEND_API_URL=http://localhost:3000/api
   ```
4. Inicie a aplicação: `npm run dev`
5. Acesse: `http://localhost:5173`

---

## 📍 Principais Funcionalidades

- **Autenticação:** Cadastro de novos usuários e login com persistência via Token JWT.
- **Gerenciamento de Tarefas:** CRUD completo (Criar, Ler, Atualizar e Deletar).
- **Dashboard de Progresso:** Visualização rápida de tarefas totais, pendentes e concluídas no cabeçalho.
- **Filtros e Paginação:** Listagem de tarefas com suporte a filtros de status.
- **Responsividade:** Interface adaptada para diferentes tamanhos de tela.

---

## 🔗 Endpoints da API (Resumo)

| Método | Rota | Descrição |
| :--- | :--- | :--- |
| POST | `/api/register` | Criação de conta |
| POST | `/api/login` | Autenticação |
| GET | `/api/tasks` | Lista tarefas (Suporta `?status=completed`) |
| POST | `/api/tasks` | Cria uma nova tarefa |
| PUT | `/api/tasks/:id` | Atualiza status ou dados da tarefa |

---
Desenvolvido durante o Hackaton Plataforma de Estudos.
