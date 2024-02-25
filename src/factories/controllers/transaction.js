import { CreateTransactionController } from '../../controllers/transactions/index.js'
import { PostgresCreateTransactionRepository } from '../../repositories/postgres/transactions/index.js'
import { PostgresGetUserByIdRepository } from '../../repositories/postgres/users/index.js'
import { CreateTransactionUseCase } from '../../use-cases/transactions/index.js'

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
