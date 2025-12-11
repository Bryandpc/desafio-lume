# Backend Lume - API de Gestão de Clientes

API RESTful desenvolvida em Spring Boot para gerenciamento de clientes com autenticação JWT.

## 📋 Pré-requisitos

Antes de executar o projeto, certifique-se de ter instalado:

- **Java 21** ou superior ([Download JDK](https://www.oracle.com/java/technologies/downloads/))
- **Maven 3.6+** (ou use o Maven Wrapper incluído no projeto)
- **Git** (para clonar o repositório)

## 🚀 Como Executar

### 1. Clone o repositório

```bash
git clone https://github.com/Bryandpc/backend-lume.git
cd backend-lume
```

### 2. Execute o projeto

#### Usando Maven Wrapper (Windows):
```bash
.\mvnw.cmd spring-boot:run
```

#### Usando Maven Wrapper (Linux/Mac):
```bash
./mvnw spring-boot:run
```

#### Usando Maven instalado localmente:
```bash
mvn spring-boot:run
```

### 3. Acesse a aplicação

- **API Base**: http://localhost:8080
- **Swagger UI**: http://localhost:8080/swagger-ui.html
  - JDBC URL: `jdbc:h2:mem:desafiolume`
  - Username: `sa`
  - Password: *(deixe em branco)*

### 4. Credenciais Padrão

O sistema cria automaticamente um usuário padrão na inicialização:

- **Username**: `admin`
- **Password**: `admin123`

## 🔑 Autenticação

A API utiliza autenticação JWT. Para acessar os endpoints protegidos:

1. Faça login no endpoint `/auth/login` com as credenciais padrão
2. Copie o `accessToken` retornado
3. Adicione o token no header das requisições: `Authorization: Bearer {seu-token}`

### Exemplo de login:

```bash
POST /auth/login
Content-Type: application/json

{
  "username": "admin",
  "password": "admin123"
}
```

## 📚 Documentação da API

A documentação completa da API está disponível via Swagger UI após iniciar a aplicação:

👉 http://localhost:8080/swagger-ui.html

## 🏗️ Tecnologias Utilizadas

### Core
- **Java 21** - Linguagem de programação
- **Spring Boot 4.0.0** - Framework principal
- **Maven** - Gerenciamento de dependências e build

### Principais Dependências

#### Persistência de Dados
- **Spring Data JPA** - Abstração para acesso a dados
- **H2 Database** - Banco de dados em memória (desenvolvimento)
- **Hibernate** - ORM (Object-Relational Mapping)

#### Segurança
- **Spring Security** - Framework de segurança
- **JWT (JSON Web Token)** - Autenticação stateless
  - `jjwt-api` 0.12.5
  - `jjwt-impl` 0.12.5
  - `jjwt-jackson` 0.12.5

#### Web & API
- **Spring Web** - Criação de APIs REST
- **Spring Validation** - Validação de dados
- **SpringDoc OpenAPI** 2.8.14 - Documentação automática da API (Swagger)

#### Testes
- **Spring Boot Test** - Framework de testes
- **Spring Security Test** - Testes de segurança

## 🏛️ Arquitetura e Padrões

### Arquitetura em Camadas

O projeto segue uma arquitetura em camadas bem definida:

```
┌─────────────────────────────────────┐
│         Controller Layer            │  ← Endpoints REST
├─────────────────────────────────────┤
│          Service Layer              │  ← Lógica de negócio
├─────────────────────────────────────┤
│        Repository Layer             │  ← Acesso a dados
├─────────────────────────────────────┤
│         Database (H2)               │  ← Persistência
└─────────────────────────────────────┘
```

### Estrutura de Pacotes

```
com.example.desafio_lume/
├── config/                    # Configurações da aplicação
│   ├── seguranca/            # Segurança (JWT Filter, Service)
│   ├── OpenApiConfig.java    # Configuração do Swagger
│   ├── SecurityConfig.java   # Configuração do Spring Security
│   └── WebConfig.java        # Configuração CORS
│
├── controller/               # Controllers REST
│   ├── AutenticacaoController.java
│   ├── ClienteController.java
│   └── HealthController.java
│
├── service/                  # Lógica de negócio
│   ├── AutenticacaoService.java
│   ├── ClienteService.java
│   └── UsuarioService.java
│
├── repository/              # Camada de dados (JPA)
│   ├── ClienteRepository.java
│   └── UsuarioRepository.java
│
├── model/                   # Entidades e DTOs
│   ├── Cliente.java
│   ├── Usuario.java
│   ├── request/            # DTOs de entrada
│   └── response/           # DTOs de saída
│
├── mapper/                 # Conversão entre entidades e DTOs
│   └── ClienteMapper.java
│
├── enums/                  # Enumerações
│   └── SituacaoCadastro.java
│
├── handler/                # Tratamento global de exceções
│   └── GlobalExceptionHandler.java
│
└── utils/                  # Classes utilitárias
    ├── DataUtils.java
    ├── RetornoApiFactory.java
    └── StringUtils.java
```

### Padrões de Projeto Implementados

#### 1. **DTO (Data Transfer Object)**
- Separação entre entidades de domínio e objetos de transferência
- Classes `*Request` para entrada de dados
- Classes `*Response` para saída de dados
- Evita exposição direta das entidades

#### 2. **Repository Pattern**
- Abstração da camada de acesso a dados
- Uso do Spring Data JPA para operações CRUD
- Consultas customizadas quando necessário

#### 3. **Service Layer Pattern**
- Lógica de negócio concentrada nos services
- Controllers apenas orquestram as requisições
- Reutilização de lógica entre diferentes controllers

#### 4. **Mapper Pattern**
- Conversão entre entidades e DTOs
- Centralização da lógica de transformação
- Facilita manutenção e testes

#### 5. **Factory Pattern**
- `RetornoApiFactory` para padronizar respostas da API
- Criação consistente de objetos de resposta

#### 6. **Filter Pattern**
- `JwtFilter` para interceptar requisições
- Validação e autenticação transparente

#### 7. **Dependency Injection**
- Injeção via construtor (imutabilidade)
- Facilita testes e manutenção
- Baixo acoplamento entre componentes

### Abordagens e Boas Práticas

#### Segurança
- ✅ **Autenticação JWT stateless** - Sem sessão no servidor
- ✅ **Refresh Token** - Renovação segura de tokens
- ✅ **BCrypt** - Hash de senhas
- ✅ **CORS configurado** - Controle de origem cruzada
- ✅ **Endpoints públicos e protegidos** - Controle granular de acesso

#### Validação
- ✅ **Bean Validation** - Validações declarativas com annotations
- ✅ **Tratamento global de exceções** - Respostas consistentes de erro
- ✅ **Mensagens padronizadas** - Retornos uniformes da API

#### Documentação
- ✅ **OpenAPI/Swagger** - Documentação automática e interativa
- ✅ **Annotations detalhadas** - Descrição de operações e responses
- ✅ **Schemas documentados** - Modelos de dados claros

#### Banco de Dados
- ✅ **H2 em memória** - Facilita desenvolvimento e testes
- ✅ **JPA/Hibernate** - ORM maduro e robusto
- ✅ **Migrations automáticas** - `ddl-auto=update` (dev)
- ✅ **Console H2 habilitado** - Inspeção visual do banco

#### Código Limpo
- ✅ **Separação de responsabilidades** - Cada classe tem um propósito
- ✅ **Nomenclatura clara** - Nomes autoexplicativos
- ✅ **Métodos pequenos e coesos** - Facilita compreensão
- ✅ **Constantes e enums** - Evita magic numbers/strings

#### API RESTful
- ✅ **Verbos HTTP corretos** - GET, POST, PUT, DELETE
- ✅ **Status codes apropriados** - 200, 201, 400, 404, etc.
- ✅ **Paginação** - Suporte a `Pageable`
- ✅ **Filtros** - Busca com critérios customizados

## 📁 Funcionalidades Principais

### Gestão de Clientes
- ✨ Criar cliente
- ✨ Atualizar cliente
- ✨ Buscar cliente por ID
- ✨ Listar clientes (com paginação)
- ✨ Filtrar clientes por critérios
- ✨ Deletar cliente (soft delete)

### Autenticação
- 🔐 Login com JWT
- 🔐 Refresh token
- 🔐 Proteção de endpoints

### Monitoramento
- 💚 Health check endpoint

## 🧪 Testes

Execute os testes com:

```bash
mvn test
```

## 📝 Configurações

As principais configurações estão em `application.properties`:

- **Porta do servidor**: 8080
- **URL do banco**: `jdbc:h2:mem:desafiolume`
- **JWT Secret**: Configurado (altere em produção!)
- **JWT Expiration**: 30 minutos
- **Refresh Token Expiration**: 60 minutos

## 🔒 Segurança em Produção

⚠️ **IMPORTANTE**: Antes de implantar em produção:

1. Altere a `security.jwt.secret-key` para uma chave forte e única
2. Use variáveis de ambiente para dados sensíveis
3. Configure um banco de dados persistente (PostgreSQL, MySQL, etc.)
4. Ajuste os tempos de expiração do JWT conforme necessário
5. Habilite HTTPS
6. Configure CORS para domínios específicos
7. Desabilite o H2 Console

## 👨‍💻 Autor

**Bryan**

## 📄 Licença

Este projeto foi desenvolvido como desafio técnico para a Lume.
