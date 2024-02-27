import {
    CreateTransactionController,
    GetTransactionByUserIdController,
} from '../../controllers/transactions/index.js'
import {
    PostgresCreateTransactionRepository,
    PostgresGetTransactionByUserId,
} from '../../repositories/postgres/transactions/index.js'
import { PostgresGetUserByIdRepository } from '../../repositories/postgres/users/index.js'
import {
    CreateTransactionUseCase,
    GetTransactionByUserIdUseCase,
} from '../../use-cases/transactions/index.js'

export const makeCreateTransactionController = () => {
    const createTransactionRepository =
        new PostgresCreateTransactionRepository()
    const getUserByIdRepository = new PostgresGetUserByIdRepository()
    const createTransactionUseCase = new CreateTransactionUseCase(
        createTransactionRepository,
        getUserByIdRepository,
    )
    const createTransactionController = new CreateTransactionController(
        createTransactionUseCase,
    )

    return createTransactionController
}

export const makeGetTransactioByUserIdController = () => {
    const getTransactionByUserIdRepository =
        new PostgresGetTransactionByUserId()
    const getUserByIdRepository = new PostgresGetUserByIdRepository()
    const getTransactionByUserIdUseCase = new GetTransactionByUserIdUseCase(
        getTransactionByUserIdRepository,
        getUserByIdRepository,
    )
    const createTransactionController = new GetTransactionByUserIdController(
        getTransactionByUserIdUseCase,
    )

    return createTransactionController
}
