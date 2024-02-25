import 'dotenv/config.js'
import express from 'express'
import { CreateUserController } from './src/controllers/create-user.js'
import { GetUserByIdController } from './src/controllers/get-user-by-id.js'
import { UpdateUserController } from './src/controllers/update-user.js'
import { DeleteUserController } from './src/controllers/delete-case.js'
import { GetUserByIdUseCase } from './src/use-cases/get-user-by-id.js'
import { PostgresGetUserByIdRepository } from './src/repositories/postgres/get-user-by-id.js'
import { DeleteUserUseCase } from './src/use-cases/delete-user.js'
import { PostgresDeleteUserRepository } from './src/repositories/postgres/delete-user.js'
import { UpdateUserUseCase } from './src/use-cases/update-user.js'
import { PostgresUpdateUserRepository } from './src/repositories/postgres/update-user.js'
import { PostgresGetUserByEmailRepository } from './src/repositories/postgres/get-user-by-email.js'

const app = express()

app.use(express.json())

app.get('/api/users/:userId', async (request, response) => {
    const getUserByIdRepository = new PostgresGetUserByIdRepository()
    const getUserByIdUseCase = new GetUserByIdUseCase(getUserByIdRepository)
    const getUserByIdController = new GetUserByIdController(getUserByIdUseCase)

    const { statusCode, body } = await getUserByIdController.execute(request)
    response.status(statusCode).send(body)
})

app.post('/api/users', async (request, response) => {
    const createUserController = new CreateUserController()

    const { statusCode, body } = await createUserController.execute(request)
    response.status(statusCode).send(body)
})

app.patch('/api/users/:userId', async (request, response) => {
    const getUserByEmailUseRepository = new PostgresGetUserByEmailRepository()
    const updateUserUseRepository = new PostgresUpdateUserRepository()
    const updateUserUseCase = new UpdateUserUseCase(
        getUserByEmailUseRepository,
        updateUserUseRepository,
    )
    const updateUserController = new UpdateUserController(updateUserUseCase)

    const { statusCode, body } = await updateUserController.execute(request)
    response.status(statusCode).send(body)
})

app.delete('/api/users/:userId', async (request, response) => {
    const postgresDeleteUserRepository = new PostgresDeleteUserRepository()
    const deleteUserUseCase = new DeleteUserUseCase(
        postgresDeleteUserRepository,
    )
    const deleteUserController = new DeleteUserController(deleteUserUseCase)

    const { statusCode, body } = await deleteUserController.execute(request)
    response.status(statusCode).send(body)
})

app.listen(process.env.BACKEND_PORT, () =>
    console.log(`listening on port ${process.env.BACKEND_PORT}`),
)
