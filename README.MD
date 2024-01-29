![BIG_ICON](BIG_ICON.png)

# Facilita Jurídico Sistema de Gerenciamento de Clientes

## Visão Geral

O Sistema de Gerenciamento de Clientes do Facilita Jurídico é uma aplicação completa em stack desenvolvida para gerenciar dados de clientes e otimizar rotas de viagem para visitas de clientes de uma empresa de limpeza residencial. O sistema é construído com um backend robusto para lidar com operações de dados, combinado com um frontend rico em recursos que oferece uma experiência de usuário suave.

## Recursos

- **Gerenciamento de Clientes:** Gerencie de forma eficiente uma suíte completa de informações do cliente, incluindo adição, atualização e exclusão de registros de clientes.
- **Otimização de Rotas:** Utilize algoritmos avançados implementados com D3.js para determinar rotas de viagem eficientes para atendimento ao cliente.
- **Funcionalidade de Busca:** Incorpore um recurso de busca poderoso que permite encontrar clientes rapidamente com filtragem em tempo real e paginação para escalabilidade eficaz.
- **Design Responsivo:** Experimente um layout flexível otimizado para dispositivos móveis, tablet e desktop, garantindo funcionalidade consistente em todas as plataformas.
- **Segurança:** Beneficie-se de uma aplicação focada na segurança que adere a padrões elevados, apresentando cabeçalhos de proteção com Helmet e gerenciamento de Compartilhamento de Recursos de Origem Cruzada (CORS).

## Começando

### Pré-requisitos

Antes de configurar o projeto, certifique-se de ter as seguintes ferramentas instaladas:

- Node.js (versão LTS)
- PostgreSQL (versão 12 ou superior)
- Redis (última versão)

### Configuração do Cliente

A parte do cliente da aplicação, construída com React, oferece uma arquitetura de componentes semi-modulares que é tanto reutilizável quanto escalável.

1. **Navegue** até a pasta `client` após clonar o repositório.
2. **Instale** as dependências do cliente: `npm install` ou `yarn install`.
3. **Inicie** o servidor de desenvolvimento para o cliente: `npm run dev` ou `yarn dev`.
4. **Abra** `http://localhost:3000` para visualizar a aplicação do cliente no navegador.

A aplicação do cliente, estilizada com Tailwind CSS, apresenta uma série de componentes interativos, tais como:

- **Formulário do Cliente:** Um formulário para adicionar e editar detalhes do cliente.
- **Lista de Clientes:** Uma lista paginada de clientes com funcionalidade de busca.
- **Visualização de Mapa:** Um elemento de canvas que utiliza D3.js para exibir rotas de viagem otimizadas.
  
Todo o código frontend, incluindo componentes React, estilos e hooks, está localizado no diretório `client/src`.

### Instalação e Desenvolvimento Local

Para configurar e executar a aplicação localmente:

1. **Clone** o repositório:

```bash
git clone https://github.com/seu-nome-de-usuario/nome-do-seu-repo.git
cd nome-do-seu-repo
```

2. **Instale** as dependências do servidor:

```bash
npm install
```

3. **Crie** um arquivo `.env` com a configuração necessária do banco de dados e variáveis de ambiente.

4. **Migre** o esquema do banco de dados (encontrado no repositório) para configurar sua instância do PostgreSQL.

### Executando a Aplicação

1. **Inicie** o servidor backend no modo de desenvolvimento:

```bash
npm run dev
```

2. **Inicie** o servidor de desenvolvimento React para o cliente:

```bash
cd client
npm run dev
```

A aplicação agora está em execução e acessível em `http://localhost:3000`.

### Configuração do Docker

Utilize o Docker para simplificar o processo de configuração em diferentes ambientes:

```bash
docker-compose up --build
```

Este comando cria e implanta todo o conjunto de serviços, garantindo sincronia perfeita entre o banco de dados, instância do Redis e o servidor.

## Estrutura do Projeto

O projeto é dividido em duas seções principais: `client` e `server`. O diretório `client` abriga todo o código frontend escrito em React, e o diretório "server" contém o código da aplicação Node.js e Express.js.

**Componentes do Lado do Cliente:**

- Átomos: Elementos básicos da UI, como `Botão` e `Input`.
- Moléculas: Elementos compostos da UI, como `ClientCard`.
- Templates: Componentes de ordem superior, como `PageTemplate`, que ditam o layout geral.

**Estrutura do Lado do Servidor:**

- Controladores: Classes que lidam com solicitações HTTP recebidas.
- Modelos: Módulos que interagem diretamente com o banco de dados.
- Rotas: Definem os pontos de extremidade aos quais a aplicação Express.js responderá.

### Documentação da API

A documentação Swagger automaticamente gerada para a API do servidor está disponível em `/docs`, detalhando os pontos de extremidade disponíveis e suas estruturas esperadas de solicitação e resposta.
