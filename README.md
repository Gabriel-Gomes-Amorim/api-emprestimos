# Sistema de Gerenciamento de Empréstimos

Este repositório contém um sistema de gerenciamento de empréstimos desenvolvido para facilitar o cadastro de usuários, o registro de empréstimos e a verificação da disponibilidade de empréstimos para os usuários. O sistema é projetado para ser flexível e fácil de usar, tornando-o adequado para diversas aplicações de empréstimo, como bibliotecas, instituições financeiras ou qualquer contexto em que o empréstimo de recursos seja necessário.

## Recursos Principais

1. **Cadastro de Usuários:** Um módulo que permite a criação e manutenção de perfis de usuários. Os detalhes do usuário, como nome, endereço, e-mail e informações de contato, podem ser registrados e atualizados conforme necessário.

2. **Cadastro de Empréstimos:** Este módulo permite o registro de empréstimos de recursos ou itens. Os campos incluem informações sobre o usuário que está fazendo o empréstimo, o item emprestado, a data de retirada e a data de devolução prevista.

3. **Verificação de Disponibilidade de Empréstimos:** Um recurso poderoso que permite aos usuários verificar a disponibilidade de itens para empréstimo. Isso ajuda a evitar conflitos de empréstimos sobre os mesmos recursos e garante uma melhor experiência para os usuários.

## Tecnologias Utilizadas

- **NodeJS**
- **NestJS**
- **Prisma ORM**
- **Docker**
- **Postgres**
  
## Como Rodar o Projeto

Para rodar este projeto em seu ambiente local, siga estas etapas:

### Pré-requisitos

Certifique-se de ter as seguintes ferramentas instaladas em seu sistema:

- Node.js
- Docker
- Docker Compose

Além disso, você precisará configurar um banco de dados PostgreSQL. Você pode fazer isso manualmente ou usar o Docker Compose para criar um contêiner PostgreSQL. Certifique-se de atualizar as informações de configuração do banco de dados no arquivo `.env`.

### Passos de Instalação

1. Clone este repositório em seu computador:

   ```bash
   git clone https://github.com/seu-usuario/seu-projeto.git


2. Instale as depedências
   
    ```bash
    npm install

3. execute os contâiners

   ```bash
   docker-compose up -d

4. execute migrate

   ```bash
    npm run migrate
