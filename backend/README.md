# Node.js Kizathon (Backend)

Esta é a API backend para a plataforma de estudos do kizathon, construída para integração com frontend. Você pode optar por rodar o backend isoladamente via docker ou ambiente local, logo abaixo tem instruções de como você pode rodar das duas formas.

## Stack Tecnológica

- **Framework:** Express.js
- **Banco de Dados:** PostgreSQL (via Docker)
- **ORM:** Prisma
- **Autenticação:** JWT
- **Validação:** Zod
- **Segurança:** Bcrypt (hashing de senhas)

---

## Como rodar o backend localmente

1. **Instalar dependências:**
   ```bash
   npm install
   ```

2. **Subir o Banco de Dados (Docker):**
   ```bash
   docker-compose up -d postgres
   ```

3. **Configurar Variáveis de Ambiente:**
   Copie o arquivo `.env.example` e renomeie-o para `.env`, abaixo está um exemplo de como devem ficar suas variáveis de ambiente:
   ```env
   POSTGRES_USER=teste
   POSTGRES_PASSWORD=teste
   POSTGRES_DB=teste

   DATABASE_URL="postgresql://teste:teste@localhost:5432/teste"
   PORT=3000
   JWT_SECRET=sua_chave_secreta_aqui
   FRONTEND_URL="http://localhost:5173"
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

## 🚀 Como rodar o backend via docker

Com o docker iniciado e na pasta **`backend`**, basta apenas rodar o comando abaixo: 

```bash
docker-compose up -d
```

## Autenticação (Guia para Frontend)

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
| `/api/tasks` | `GET` | Lista tarefas com **paginação** e **filtros** (veja abaixo) |
| `/api/tasks/:id` | `GET` | Busca uma tarefa específica |
| `/api/tasks/:id` | `PUT` | Atualiza uma tarefa (gera `completedAt` se marcada como concluída) |
| `/api/tasks/:id` | `DELETE` | Remove uma tarefa |

#### Parâmetros de Query para `GET /api/tasks`:
- `page`: Número da página (padrão: 1)
- `limit`: Itens por página (padrão: 10)
- `status`: Filtre por `completed` (para o histórico) ou `pending`.

---

## Exemplos

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

## Dicas para o Frontend

- **Tratamento de Erros:** Se a API retornar `401 Unauthorized`, redirecione o usuário para a tela de login (o token expirou ou é inválido).
- **Dados do Usuário:** Use a rota `GET /api/me` logo após o login para carregar o perfil do usuário no estado global do seu app.
- **Histórico:** As tarefas concluídas possuem o campo `completedAt`. Para exibir o histórico no React, basta chamar `/api/tasks?status=completed`.

