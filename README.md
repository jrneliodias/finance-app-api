# My API Finance App

I am building a web app to control my personal expenses, income, and investments. The goal is to build a robust REST API with the HTTP protocol using the MVC (Model, View, and Controller) and Clean architecture, following conventional commits, and applying it to the PostgreSQL database in Docker.

## Structure

The app is being built with:

- **Back-End**: in Node.js, Express, and PostgreSQL using a container image in Docker and Prisma ORM.
- **Validation**: with Zod.
- **Testing**: Jest.
- **Prisma ORM**: to manage the PostgreSQL database.

## MVC Architecture
### Model

| User  | Transaction |
| ------------- | ------------- |
| id (uuid String) | id (uuid String) |
| first_name (string) | user_id (Relation with User) |
| last_name (string) | date (datetime) |
| email (string) | amount (number) |
| password (Hashed string) | type (EARNING, EXPENSE, INVESTMENT) |

### Controller
#### User
- **Create User Controller**: Verifies if the ID is valid, checks if all required fields are present and valid with Zod, and ensures the email being registered doesn't already exist in the database. It then passes it to the `CreateUserUseCase`. Otherwise, it returns a custom error.
- **Update User Controller**: Checks if the field for change is valid and respects its requirements. It then passes it to the `UpdateUserUseCase`. Otherwise, it returns a custom error.
- **Get User Controller by Id**: Verifies if the passed ID is valid and passes it to the `GetUserByIdUseCase`. Otherwise, it returns a custom error.
- **Get User Controller by Email**: Verifies if the passed email is valid and passes it to the `GetUserByEmailUseCase`. Otherwise, it returns a custom error.
- **Get User Balance Controller**: Verifies if the passed ID is valid and passes it to the `GetUserBalanceUseCase`. Otherwise, it returns a custom error.
- **Delete User Controller**: Verifies if the passed ID is valid and passes it to the `DeleteUseCase`. Otherwise, it returns a custom error.

#### Transaction
- **Create Transaction Controller**: Verifies if the ID is valid, checks if all required fields are present and valid with Zod, and ensures the transaction does not already exist. It then passes it to the `CreateTransactionUseCase`. Otherwise, it returns a custom error.
- **Update Transaction Controller**: Verifies if the field for change is valid and respects its requirements. It then passes it to the `UpdateTransactionUseCase`. Otherwise, it returns a custom error.
- **Get Transaction Controller by User ID**: Verifies if the user ID is valid and passes it to the `GetTransactionByIdUseCase`. Otherwise, it returns a custom error.
- **Delete Transaction Controller**: Verifies if the passed transaction ID is valid and passes it to the `DeleteUseCase`. Otherwise, it returns a custom error.

### Use Case
#### User
- **Create User Use Case**: Verifies if the email is already registered in the database, creates the user’s UUID, and encrypts the password. It then passes it to the `CreateUserUseCase`. Otherwise, it returns a custom error.
- **Update User Use Case**: Verifies if the email is already registered in the database, creates the user’s UUID, and encrypts the password. It then passes it to the `UpdateUserUseCase`. Otherwise, it returns a custom error.
- **Get User by Id Use Case**: Passes the user ID to the `GetUserByIdUseCase`. Otherwise, it returns a custom error.
- **Get User Balance Use Case**: Verifies if the passed ID belongs to a user in the database and passes it to the `GetUserBalanceUseCase`. Otherwise, it returns a custom error.
- **Delete User Use Case**: Verifies if the passed ID belongs to a user in the database and passes it to the `DeleteUserUseCase`. Otherwise, it returns a custom error.

#### Transaction
- **Create Transaction Use Case**: Verifies if the passed ID belongs to a user in the database, creates a UUID, and passes it to the `CreateTransactionUseCase`. Otherwise, it returns a custom error.
- **Update Transaction Use Case**: Passes the transaction parameters to the `UpdateTransactionUseCase`. Otherwise, it returns a custom error.
- **Get Transaction Use Case by User ID**: Verifies if the ID belongs to a user in the database and passes it to the `GetTransactionByIdUseCase`. Otherwise, it returns a custom error.
- **Delete Transaction Use Case**: Verifies if the passed transaction ID belongs to a transaction and passes it to the `DeleteTransactionUseCase`. Otherwise, it returns a custom error.

### Repositories
#### User and Transaction
- They work directly with the database using Prisma ORM, following the parameters validated by the Controllers and the business rules defined in the Use Case.

## Day Log

- Currently, I am building the Back-End in Node and Express to create the Create, Read, Update, and Delete (CRUD) routes, implementing the MVC architecture and parameter validation tests.
- Implementing the CRUD routes for user transactions.
- Integrated Prisma ORM in the Repositories layer to improve communication with the database.
- Created Jest tests for the user controller layer.
