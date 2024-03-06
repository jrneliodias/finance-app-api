# My Finance App

Estou construindo um web app para controlar meus gastos, ganhos e investimentos pessoais. O objetivo é construir uma API REST com protocolo HTTP robusta na arquitetura MVC (Model, View e Controller) e Clean utilizando 
os convetional commits aplicando no banco de dados PostgresSQL em Docker.

## Estrutura

O aplicativos está sendo construido com:

- Back-End: em Node Js, Express e Postgres SQL utilizando imagem em container no Docker e Prisma ORM.
- Validação com Zod.
- Testes: Jest Js.
- Prisma ORM: para gerenciar o banco de dados Postgres SQL

## Arquitetura MVC
### Model

| User  | Transaction|
| ------------- | ------------- |
| id uuid  (String)    | id uuid |
| first_name (string)  | user_id (Relação com User)  |
| last_name (String)    | date (datetime)  |
| email  (String)      | amount (Number) |
| password (Hash String)    | type (EARNING, EXPENSE, INVESTMENT)   |

### Controller
#### User
- Create User Controller: Verificar se o id é válido, verificar se todos os campos obrigatórios estão presentes e válidos com Zod, verificar se o email sendo cadastrado já não existe no banco de dados. Então passa para o CreateUserUseCase. Caso contrário, retorna um erro personalizado.
- Update User Controller: Verificar se o campo para mundança é válida e respeita seu requisito. Então passa para o UpdateUserUseCase. Caso contrário, retorna um erro personalizado.
- Get User Controller by Id: Verifica se o id passado é válido e passa para o GetUserByIdUseCase. Caso contrário, retorna um erro personalizado.
- Get User Controller by Email: Verifica se o email passado é válido e passa para o GetUserByEmailUseCase. Caso contrário, retorna um erro personalizado.
- Get User Balance Controller: Verifica se o id passado é válido e passa para o GetUserBalanceUseCase. Caso contrário, retorna um erro personalizado.
- Delete User Controller: Verifica se o id passado é válido e passa para o DeleteUseCase. Caso contrário, retorna um erro personalizado.
  
#### Transaction
- Create User Controller: Verificar se o id é válido, verificar se todos os campos obrigatórios estão presentes e válidos com Zod, verificar se o email sendo cadastrado já não existe no banco de dados. Então passa para o CreateUserUseCase. Caso contrário, retorna um erro personalizado.
- Update User Controller: Verificar se o campo para mundança é válida e respeita seu requisito. Então passa para o UpdateUserUseCase. Caso contrário, retorna um erro personalizado.
- Get User Controller by Id: Verifica se o id passado é válido e passa para o GetUserByIdUseCase. Caso contrário, retorna um erro personalizado.
- Get User Controller by Email: Verifica se o email passado é válido e passa para o GetUserByEmailUseCase. Caso contrário, retorna um erro personalizado.
- Get User Balance Controller: Verifica se o id passado é válido e passa para o GetUserBalanceUseCase. Caso contrário, retorna um erro personalizado.
- Delete User Controller: Verifica se o id passado é válido e passa para o DeleteUseCase. Caso contrário, retorna um erro personalizado.


## Day Log

- No momento estou construindo o Back-End em Node e Express para criar as rotas de Create, Read, Update e Delete (CRUD) implementando a arquitetura MVC e testes de validação dos parâmetros.

- As rotas de Create, Read, Update e Delete (CRUD) das transações dos usuários.

- Inserido o Prisma ORM na camada Repositories para melhorar a comunicação com o Banco de Dados.

- Testes Criados com Jest para a camada controller dos usuários.

