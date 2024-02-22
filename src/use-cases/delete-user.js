import { PostgresDeleteUserRepository } from '../repositories/postgres/delete-user.js'

export class DeleteUserUseCase {
    async execute(userId) {
        const deleteUserUseCase = new PostgresDeleteUserRepository()
        const deletedUser = await deleteUserUseCase.execute(userId)
        return deletedUser
    }
}
