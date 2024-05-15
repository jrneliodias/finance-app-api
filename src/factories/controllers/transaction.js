import {
    CreateTransactionController,
    DeleteTransactionController,
    GetTransactionByUserIdController,
    UpdateTransactionController,
} from '../../controllers/transactions/index.js'
import {
    PostgresCreateTransactionRepository,
    PostgresDeleteTransactionRepository,
    PostgresGetTransactionByUserId,
    PostgresUpdateTransactionRepository,
} from '../../repositories/postgres/transactions/index.js'
import { PostgresGetUserByIdRepository } from '../../repositories/postgres/users/get-user-by-id.js'
import {
    CreateTransactionUseCase,
    DeleteTransactionUseCase,
    GetTransactionByUserIdUseCase,
    UpdateTransactionUseCase,
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

export const makeGetTransactionByUserIdController = () => {
    const getTransactionByUserIdRepository =
        new PostgresGetTransactionByUserId()
    const getUserByIdRepository = new PostgresGetUserByIdRepository()
    const getTransactionByUserIdUseCase = new GetTransactionByUserIdUseCase(
        getTransactionByUserIdRepository,
        getUserByIdRepository,
    )
    const getTransactionController = new GetTransactionByUserIdController(
        getTransactionByUserIdUseCase,
    )

    return getTransactionController
}

export const makeUpdateTransactionController = () => {
    const updateTransactionRepository =
        new PostgresUpdateTransactionRepository()
    const updateTransactionUseCase = new UpdateTransactionUseCase(
        updateTransactionRepository,
    )
    const updateTransactionController = new UpdateTransactionController(
        updateTransactionUseCase,
    )

    return updateTransactionController
}

export const makeDeleteTransactionController = () => {
    const deleteTransactionRepository =
        new PostgresDeleteTransactionRepository()
    const deleteTransactionUseCase = new DeleteTransactionUseCase(
        deleteTransactionRepository,
    )
    const deleteTransactionController = new DeleteTransactionController(
        deleteTransactionUseCase,
    )

    return deleteTransactionController
}
