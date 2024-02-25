import {
    CreateUserController,
    DeleteUserController,
    GetUserByIdController,
    UpdateUserController,
} from '../../controllers/index.js'
import {
    PostgresCreateUserRepository,
    PostgresGetUserByEmailRepository,
    PostgresGetUserByIdRepository,
    PostgresUpdateUserRepository,
    PostgresDeleteUserRepository,
} from '../../repositories/postgres/users/index.js'
import {
    CreateUserUseCase,
    DeleteUserUseCase,
    GetUserByIdUseCase,
    UpdateUserUseCase,
} from '../../use-cases/index.js'

export const makeGetUserByIdController = () => {
    const getUserByIdRepository = new PostgresGetUserByIdRepository()
    const getUserByIdUseCase = new GetUserByIdUseCase(getUserByIdRepository)
    const getUserByIdController = new GetUserByIdController(getUserByIdUseCase)
    return getUserByIdController
}
export const makeCreateUserController = () => {
    const getUserByEmailUseRepository = new PostgresGetUserByEmailRepository()
    const createUserRepository = new PostgresCreateUserRepository()
    const createUserUseCase = new CreateUserUseCase(
        getUserByEmailUseRepository,
        createUserRepository,
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
