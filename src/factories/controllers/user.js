import { PasswordHasherAdpater } from '../../adapters/index.js'
import {
    CreateUserController,
    DeleteUserController,
    GetUserBalanceController,
    GetUserByIdController,
    UpdateUserController,
} from '../../controllers/users/index.js'
import {
    PostgresCreateUserRepository,
    PostgresGetUserByEmailRepository,
    PostgresGetUserByIdRepository,
    PostgresUpdateUserRepository,
    PostgresDeleteUserRepository,
    PostgresGetUserBalanceRepository,
} from '../../repositories/postgres/users/index.js'
import {
    CreateUserUseCase,
    DeleteUserUseCase,
    GetUserBalanceUseCase,
    GetUserByIdUseCase,
    UpdateUserUseCase,
} from '../../use-cases/users/index.js'

export const makeGetUserByIdController = () => {
    const getUserByIdRepository = new PostgresGetUserByIdRepository()
    const getUserByIdUseCase = new GetUserByIdUseCase(getUserByIdRepository)
    const getUserByIdController = new GetUserByIdController(getUserByIdUseCase)
    return getUserByIdController
}
export const makeCreateUserController = () => {
    const getUserByEmailUseRepository = new PostgresGetUserByEmailRepository()
    const createUserRepository = new PostgresCreateUserRepository()
    const passwordHasherAdpater = new PasswordHasherAdpater()
    const createUserUseCase = new CreateUserUseCase(
        getUserByEmailUseRepository,
        createUserRepository,
        passwordHasherAdpater,
    )

    const createUserController = new CreateUserController(createUserUseCase)
    return createUserController
}

export const makeUpdateUserController = () => {
    const getUserByEmailUseRepository = new PostgresGetUserByEmailRepository()
    const updateUserUseRepository = new PostgresUpdateUserRepository()
    const updateUserUseCase = new UpdateUserUseCase(
        getUserByEmailUseRepository,
        updateUserUseRepository,
    )
    const updateUserController = new UpdateUserController(updateUserUseCase)
    return updateUserController
}

export const makeDeleteUserController = () => {
    const postgresDeleteUserRepository = new PostgresDeleteUserRepository()

    const deleteUserUseCase = new DeleteUserUseCase(
        postgresDeleteUserRepository,
    )
    const deleteUserController = new DeleteUserController(deleteUserUseCase)
    return deleteUserController
}

export const makeGetUserBalanceController = () => {
    const getUserBalanceRepository = new PostgresGetUserBalanceRepository()
    const getUserByIdRepository = new PostgresGetUserByIdRepository()
    const getUserBalanceUseCase = new GetUserBalanceUseCase(
        getUserBalanceRepository,
        getUserByIdRepository,
    )
    const getUserBalanceController = new GetUserBalanceController(
        getUserBalanceUseCase,
    )

    return getUserBalanceController
}
