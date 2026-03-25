# Node.js Study API (Backend)

Esta é a API de backend para a plataforma de estudos, construída com foco em performance, segurança e facilidade de integração para o frontend.

## 🚀 Stack Tecnológica

- **Runtime:** Node.js (ES Modules)
- **Framework:** Express.js
- **Banco de Dados:** PostgreSQL (via Docker)
- **ORM:** Prisma
- **Autenticação:** JWT (JSON Web Token)
- **Validação:** Zod
- **Segurança:** Bcrypt (hashing de senhas)

---

## 🛠️ Como rodar o projeto

1. **Instalar dependências:**
   ```bash
   npm install
   ```

2. **Subir o Banco de Dados (Docker):**
   ```bash
   docker-compose up -d
   ```

3. **Configurar Variáveis de Ambiente:**
   Crie um arquivo `.env` na raiz com as seguintes chaves:
   ```env
   DATABASE_URL="postgresql://teste:teste@localhost:5432/teste"
   PORT=3000
   JWT_SECRET=sua_chave_secreta_aqui
   ```

4. **Sincronizar Banco e Gerar Prisma Client:**
   ```bash
   npx prisma db push
   npx prisma generate
   ```

5. **Iniciar Servidor:**
   ```bash
   npm run dev
   ```

---

## 🔐 Autenticação (Guia para Frontend)

A API utiliza tokens JWT para proteger as rotas. 

1. **Obter Token:** Faça um POST em `/api/login`.
2. **Enviar Token:** Em todas as rotas protegidas, envie o header:
   `Authorization: Bearer <SEU_TOKEN_AQUI>`

---

## 📍 Endpoints da API

### 1. Autenticação e Usuário
| Rota | Método | Descrição | Protegida? |
| :--- | :---: | :--- | :---: |
| `/api/register` | `POST` | Cria um novo usuário | ❌ Não |
| `/api/login` | `POST` | Autentica e retorna o Token | ❌ Não |
| `/api/me` | `GET` | Retorna os dados do usuário logado | ✅ Sim |
| `/api/users/:id` | `PUT` | Atualiza dados do usuário | ✅ Sim |
| `/api/users/:id` | `DELETE` | Remove a conta do usuário | ✅ Sim |

### 2. Tarefas (Tasks)
*Nota: Todas as rotas de tarefas são protegidas e retornam apenas os dados do usuário dono do token.*

| Rota | Método | Descrição |
| :--- | :---: | :--- |
| `/api/tasks` | `POST` | Cria uma tarefa (não precisa enviar userId no body) |
| `/api/tasks` | `GET` | Lista todas as tarefas do usuário logado |
| `/api/tasks/:id` | `GET` | Busca uma tarefa específica |
| `/api/tasks/:id` | `PUT` | Atualiza uma tarefa (título, descrição, categoria, status) |
| `/api/tasks/:id` | `DELETE` | Remove uma tarefa |

---

## 📝 Exemplos de JSON

### Criar Usuário (`POST /api/register`)
```json
{
  "name": "Maria Silva",
  "email": "maria@email.com",
  "password": "senha123"
}
```

### Criar Tarefa (`POST /api/tasks`)
```json
{
  "title": "Estudar React",
  "description": "Finalizar o módulo de Hooks",
  "category": "Estudos"
}
```

---

## 💡 Dicas para o Frontend

- **Tratamento de Erros:** Se a API retornar `401 Unauthorized`, redirecione o usuário para a tela de login (o token expirou ou é inválido).
- **Dados do Usuário:** Use a rota `GET /api/me` logo após o login para carregar o perfil do usuário no estado global do seu app.
- **Isolamento:** Você não precisa se preocupar em filtrar as tarefas por ID de usuário; o backend já faz esse isolamento automaticamente com base no token enviado.
