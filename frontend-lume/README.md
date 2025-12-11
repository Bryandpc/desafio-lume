# Frontend Lume - Sistema de Gestão de Clientes

Sistema web para gerenciamento de clientes com autenticação JWT e funcionalidades completas de CRUD.

## 🚀 Como Executar o Projeto

### Pré-requisitos

- Node.js (versão 14 ou superior)
- npm ou yarn
- Backend da aplicação rodando (padrão: `http://localhost:8080`)

### Instalação

1. Clone o repositório e navegue até a pasta do projeto:
```bash
cd frontend-lume
```

2. Instale as dependências:
```bash
npm install
```

3. Configure a URL da API (opcional):

Crie um arquivo `.env` na raiz do projeto:
```env
REACT_APP_API_URL=http://localhost:8080
```

4. Execute o projeto em modo de desenvolvimento:
```bash
npm start
```

A aplicação estará disponível em [http://localhost:3000](http://localhost:3000)

Para acesso padrão utilizem o usuario 
admin
com a senha 
pass

### Build para Produção

Para gerar a build de produção:
```bash
npm run build
```

Os arquivos otimizados serão gerados na pasta `build/`.

## 🛠️ Tecnologias Utilizadas

- **React** 18.3.1 - Biblioteca principal para construção da interface
- **React Router DOM** - Gerenciamento de rotas e navegação
- **Axios** - Cliente HTTP para comunicação com a API
- **React Hook Form** - Gerenciamento de formulários com validação
- **React Toastify** - Notificações toast para feedback ao usuário
- **React Icons** - Biblioteca de ícones
- **CSS Modules** - Estilização com escopo de componente

## 📁 Estrutura do Projeto

```
src/
├── components/          # Componentes reutilizáveis
│   ├── Button.js
│   ├── Checkbox.js
│   ├── Input.js
│   ├── Loading.js
│   ├── MenuWrapper.js
│   ├── Sidebar.js
│   └── Tabela.js
├── contexts/           # Contextos React (AuthContext)
├── lib/               # Configurações e utilitários principais
│   ├── http.js        # Instância Axios com interceptors JWT
│   └── routes.js      # Definição de rotas da aplicação
├── pages/             # Páginas da aplicação
│   ├── Clientes/      # Listagem, cadastro e edição de clientes
│   ├── Login/         # Página de autenticação
│   └── NotFound/      # Página 404
├── services/          # Serviços de comunicação com API
│   ├── cepService.js
│   ├── clienteService.js
│   └── loginService.js
├── styles/            # Arquivos CSS globais e módulos
└── utils/             # Utilitários (validação, máscaras, cache, etc.)
    ├── cacheUtils.js
    ├── enumUtils.js
    ├── maskUtils.js
    ├── stringUtils.js
    ├── toastUtils.js
    └── validationUtils.js
```

## 🔑 Funcionalidades Principais

### Autenticação
- Login com validação de credenciais
- Gerenciamento de sessão com JWT (token + refreshToken)
- Refresh automático de token expirado
- Logout com limpeza de cache

### Gestão de Clientes
- **Listagem**: Visualização paginada com filtros (nome, CPF, ID, situação)
- **Cadastro**: Formulário completo com validação e busca automática de endereço por CEP
- **Edição**: Atualização de dados com controle de situação (Ativo/Inativo)
- **Exclusão**: Remoção de clientes com confirmação

### Recursos Técnicos
- Validação de formulários com regras centralizadas
- Máscaras automáticas para CPF, CEP e telefone
- Validação de CPF e CEP por algoritmo
- Integração com API ViaCEP para busca de endereço
- Cache localStorage com utilitários tipados
- Notificações toast em português
- Layout responsivo com CSS Modules
- Componentização com padrões reutilizáveis

## 🎨 Padrão de Cores

As cores da aplicação seguem a identidade visual da Lume:

- **Primária**: `#023C6B` (Azul Lume)
- **Secundária**: `#666666` (Cinza)
- **Erro**: `#e74c3c`
- **Sucesso**: `#27ae60`
- **Aviso**: `#f39c12`

Todas as cores são definidas em variáveis CSS no arquivo `global.css` para fácil manutenção.

## 📝 Padrão de Resposta da API

A aplicação espera respostas da API no seguinte formato:

```json
{
  "sucesso": true,
  "dados": { ... },
  "mensagem": "Operação realizada com sucesso"
}
```

## 🔐 Autenticação JWT

O sistema utiliza dois tokens:

- **Token**: Access token de curta duração (enviado nas requisições)
- **Refresh Token**: Token de longa duração (usado para renovar o access token)

O refresh é automático quando o token expira, utilizando interceptors do Axios.
