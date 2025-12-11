## 🐳 Executando com Docker

### Pré-requisitos

- Docker instalado
- Docker Compose instalado

### Estrutura do projeto

- `backend-lume/` → API em Spring Boot (Java 21, H2, JWT, Bean Validation, Swagger)
- `frontend-lume/` → SPA em React
- `docker-compose.yml` → orquestra os dois serviços (API + Frontend)

### Subindo tudo com um comando

Na raiz do projeto (onde está o arquivo `docker-compose.yml`), execute:

```bash
docker compose up --build

Usuário padrão para acessar o projeto:
admin
pass
