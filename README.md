## Projeto-back-Library

Este projeto é um backend focado no desenvolvimento de uma API RESTful para gerenciamento de uma biblioteca, que permite cadastrar livros, gerenciar usuários e monitorar suas atividades (como empréstimos e devoluções de livros). O projeto tem como objetivo principal fortalecer conhecimentos em desenvolvimento de APIs, arquitetura REST e manipulação de dados com foco em funcionalidades de uma biblioteca.

## Tecnologias Utilizadas

- Node.js: Plataforma de execução JavaScript no servidor.

- Express.js: Framework para criar APIs RESTful de forma rápida e modular.

- SQL: Banco de dados NoSQL para armazenamento de dados de livros e usuários.

- Angular 17: Biblioteca ODM para manipulação de dados no MongoDB de forma simplificada.

- TypeScript: Linguagem para adicionar tipagem estática ao JavaScript e facilitar o desenvolvimento.

- JWT (JSON Web Token): Gerenciamento de autenticação e autorização para controle de acesso aos endpoints.

## Fluxograma do Fluxo de Trabalho

 Desenvolveremos um fluxograma que ilustra:

- Entrada de Dados: O usuário acessa o sistema via requisições HTTP (REST API).
- Validação de Autenticação: Middleware verifica autenticação (JWT).
- Operação no Banco de Dados: Controladores processam requisições (e.g., cadastro, consulta, ou alteração).
- Resposta ao Usuário: Dados são enviados como resposta HTTP.

# Pré-requisitos

Para rodar este projeto, você precisa ter:

- Node.js e npm instalados para gerenciamento de dependências.

- SQL instalado e em execução localmente ou usar uma instância na nuvem (por exemplo, No SQL).

- Postman para testar as rotas da API.

# Estrutura do Projeto

```bash
├── src
│   ├── controllers
│   │   ├── bookController.ts          # Controlador de livros
│   │   └── userController.ts          # Controlador de usuários
│   ├── models
│   │   ├── bookModel.ts               # Modelo de dados de livros
│   │   └── userModel.ts               # Modelo de dados de usuários
│   ├── routes
│   │   ├── bookRoutes.ts              # Rotas para operações de livros
│   │   └── userRoutes.ts              # Rotas para operações de usuários
│   ├── middleware
│   │   └── authMiddleware.ts          # Middleware de autenticação
│   └── app.ts                         # Configuração principal da aplicação Express
└── README.md                          # Documentação do projeto
```

# Funcionalidades

- Cadastro de Livros: Adicione, edite e remova livros do acervo.
 
- Gestão de Usuários: Registre e monitore o histórico de usuários da biblioteca.

- Consulta ao Acervo: Permita que usuários consultem os livros disponíveis.

- Sistema de Empréstimos: Controle e registre o histórico de empréstimos de cada usuário.

## Configuração e Instalação

- Clone o repositório:

```bash
git clone https://github.com/seu-usuario/projeto-back-library.git
cd projeto-back-library
```

- Instale as dependências:

```bash
npm install
```

- Configuração do Banco de Dados:

Crie um banco de dados no SQL e configure a URL de conexão em um `arquivo .env`:


```bash
SQL_URI=SLQ://localhost:27017/nome-do-banco
JWT_SECRET=sua_chave_secreta
Inicie o servidor:
```

```bash
npm start
```

- Teste a API: Use o Postman ou Insomnia para testar as rotas e funcionalidades da API.

# Autenticação

- POST `/api/auth/register`: Registra um novo usuário.

- POST `/api/auth/login`: Faz o login de um usuário e retorna um token JWT.

# Gerenciamento de Livros

- POST `/api/books`: Adiciona um novo livro (requer autenticação).

- GET `/api/books`: Lista todos os livros.

- GET `/api/books/` : Retorna os detalhes de um livro específico.

- PUT `/api/books/`: Atualiza as informações de um livro (requer autenticação).

- DELETE `/api/books/`: Remove um livro do sistema (requer autenticação).

# Gerenciamento de Usuários

- GET `/api/users`: Lista todos os usuários (requer autenticação e permissão de administrador).

- GET `/api/users/`: Retorna informações detalhadas de um usuário.

- PUT `/api/users/`: Atualiza os dados de um usuário (requer autenticação).

- DELETE `/api/users/`: Remove um usuário do sistema (requer autenticação e permissão de administrador).

# Empréstimo e Devolução de Livros

- POST `/api/loans`: Registra o empréstimo de um livro a um usuário (requer autenticação).

- PUT `/api/loans/return`: Registra a devolução de um livro emprestado (requer autenticação).

## Exemplo de Código

- Modelo de Livro (`bookModel.ts`)

```bash
import SQL, { Schema, Document } from 'SQL';

export interface IBook extends Document {
  title: string;
  author: string;
  genre: string;
  publishedYear: number;
  isAvailable: boolean;
}

const BookSchema: Schema = new Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  genre: { type: String, required: true },
  publishedYear: { type: Number, required: true },
  isAvailable: { type: Boolean, default: true },
});

export default mongoose.model<IBook>('Book', BookSchema);
Controller para Livros (bookController.ts)
import { Request, Response } from 'express';
import Book from '../models/bookModel';

export const addBook = async (req: Request, res: Response) => {
  try {
    const newBook = new Book(req.body);
    await newBook.save();
    res.status(201).json(newBook);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao adicionar livro', error });
  }
};

export const getBooks = async (_req: Request, res: Response) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao obter livros', error });
  }
};
```
## CRIAÇÃO DO BANCO DE DADOS

 Em “api” no diretório “sql”, copie o conteúdo contido no arquivo *dump*  e cole no MySQL WorkBank e execute-o na ordem que está. Isso criará todo o banco de dados da 
 api junto com o usuário admin e os privilégios.

 Detalhe: Para que funcione você tem que ter algum servidor de banco de dados ativo, como MySQL, MariaDB etc.

- RODANDO O PROJETO
 Após criar o banco e tudo der certo.

 Abra o terminal em Bash e digite o comando: `cd api` . para entrar na pasta da api. 

E  em seguida digite: `npm run dev`. para iniciar a aplicação do express.

Se estiver rodando normalmente a api, abra um novo terminal em powershell e execute o comando: `cd frontend` para entrar no diretório do front.

- Digite: `npm install --global yarn` Isso instalará o Yarn globalmente no seu sistema.

- Agora digite: `Yarn start`, para executar a página no local: http://localhost:3000.

Se não exibir nenhum erro nos dois terminais, tudo estará rodando normalmente. Faça testes como inserir usuário e livro e simular um empréstimo para verificar se tudo está operando normalmente, relate algum erro se tiver.

## Testes

Este projeto pode ser expandido com testes unitários e de integração para validar o funcionamento dos endpoints e garantir a confiabilidade da aplicação.

# Melhorias Futuras 

Este projeto pode ser aprimorado com as seguintes funcionalidades:

- Notificações: Notificar os usuários sobre prazos de devolução de livros.

- Histórico de Empréstimos: Rastrear o histórico de empréstimos de cada usuário.

- Roles e Permissões: Adicionar diferentes níveis de permissão para usuários (como administrador, usuário comum).

- Paginação: Implementar paginação nas listas de livros e usuários para melhorar a performance.

# Licença

Este projeto é apenas para fins educativos e acadêmicos. Consulte os termos de uso para mais detalhes.

