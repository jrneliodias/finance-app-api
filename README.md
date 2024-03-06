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
- Create Transaction Controller: Verificar se o id é válido, verificar se todos os campos obrigatórios estão presentes e válidos com Zod, verificar se o email sendo cadastrado já não existe no banco de dados. Então passa para o CreateTransactionUseCase. Caso contrário, retorna um erro personalizado.
- Update Transaction Controller: Verificar se o campo para mundança é válida e respeita seu requisito. Então passa para o UpdateTransactionUseCase. Caso contrário, retorna um erro personalizado.

- Get Transaction Controller by User Id: Verifica se o id do usuário passado é válido e passa para o GetTransactionByIdUseCase. Caso contrário, retorna um erro personalizado.

- Delete Transaction Controller: Verifica se o id da transação passado é válido e passa para o DeleteUseCase. Caso contrário, retorna um erro personalizado.

### Use Case
#### User
- Create User Use Case: Verificar se o email está cadastrado no banco de dados. Cria o uuid do usuário, criptografa a senha. Então passa para o CreateTransactionUseCase. Caso contrário, retorna um erro personalizado.
- Update User Use Case:  Verificar se o email está cadastrado no banco de dados. Cria o uuid do usuário, criptografa a senha. Então passa para o CreateTransactionUseCase. Caso contrário, retorna um erro personalizado.
- Get User by Id Use Case: Passa para o GetUserByIdUseCase. Caso contrário, retorna um erro personalizado.

- Get User Balance Use Case: Verifica se o id passado pertence a um usuário no banco e passa para o GetUserBalanceUseCase. Caso contrário, retorna um erro personalizado.

- Delete User Use Case: Verifica se o id passado pertence a um usuário no banco e passa para o GetUserBalanceUseCase. Caso contrário, retorna um erro personalizado.
  
#### Transaction
- Create Transaction Use Case: Verifica se o id passado pertence a um usuário no banco, cria um uuid e passa para o GetUserBalanceUseCase. Caso contrário, retorna um erro personalizado.

- Update Transaction Use Case: Passar os parâmetros da transanção para o CreateTransactionUseCase. Caso contrário, retorna um erro personalizado.

- Get Transaction Use Case by User Id: Verifica se o id pertence a um usuário no banco de dados e passa para o GetTransactionByIdUseCase. Caso contrário, retorna um erro personalizado.

- Delete Transaction Use Case: Verifica se o id da transação passado pertence a uma transação e passa para o DeleteTransactionUseCase. Caso contrário, retorna um erro personalizado.

### Repositories
#### User e Transaction
- Atua diretamente com o banco de dados com o Prisma ORM com os parâmetros validados pelos Controllers e pelas regras de negócio do Use Case.

## Day Log

- No momento estou construindo o Back-End em Node e Express para criar as rotas de Create, Read, Update e Delete (CRUD) implementando a arquitetura MVC e testes de validação dos parâmetros.

- As rotas de Create, Read, Update e Delete (CRUD) das transações dos usuários.

- Inserido o Prisma ORM na camada Repositories para melhorar a comunicação com o Banco de Dados.

- Testes Criados com Jest para a camada controller dos usuários.

