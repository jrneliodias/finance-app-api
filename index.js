import 'dotenv/config.js'
import express from 'express'
import {
    makeCreateUserController,
    makeDeleteUserController,
    makeGetUserByIdController,
    makeUpdateUserController,
} from './src/factories/controllers/user.js'
import {
    makeCreateTransactionController,
    makeDeleteTransactionController,
    makeGetTransactioByUserIdController,
    makeUpdateTransactionController,
} from './src/factories/controllers/transaction.js'

const app = express()

app.use(express.json())

app.get('/api/users/:userId', async (request, response) => {
    const getUserByIdController = makeGetUserByIdController()

    const { statusCode, body } = await getUserByIdController.execute(request)
    response.status(statusCode).send(body)
})

app.post('/api/users', async (request, response) => {
    const createUserController = makeCreateUserController()

    const { statusCode, body } = await createUserController.execute(request)
    response.status(statusCode).send(body)
})

app.patch('/api/users/:userId', async (request, response) => {
    const updateUserController = makeUpdateUserController()

    const { statusCode, body } = await updateUserController.execute(request)
    response.status(statusCode).send(body)
})

app.delete('/api/users/:userId', async (request, response) => {
    const deleteUserController = makeDeleteUserController()

    const { statusCode, body } = await deleteUserController.execute(request)
    response.status(statusCode).send(body)
})

app.get('/api/transactions', async (request, response) => {
    const getTransactioByUserIdController =
        makeGetTransactioByUserIdController()

    const { statusCode, body } =
        await getTransactioByUserIdController.execute(request)
    response.status(statusCode).send(body)
})

app.post('/api/transactions', async (request, response) => {
    const createTransactionController = makeCreateTransactionController()

    const { statusCode, body } =
        await createTransactionController.execute(request)
    response.status(statusCode).send(body)
})
app.patch('/api/transactions/:transactionId', async (request, response) => {
    const updateUserController = makeUpdateTransactionController()

    const { statusCode, body } = await updateUserController.execute(request)
    response.status(statusCode).send(body)
})

app.delete('/api/transactions/:transactionId', async (request, response) => {
    const deleteTransactionController = makeDeleteTransactionController()

    const { statusCode, body } =
        await deleteTransactionController.execute(request)
    response.status(statusCode).send(body)
})

app.listen(process.env.BACKEND_PORT, () =>
    console.log(`listening on port ${process.env.BACKEND_PORT}`),
)
