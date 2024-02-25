export class DeleteUserUseCase {
    constructor(PostgresDeleteUserRepository) {
        this.postgresDeleteUserRepository = PostgresDeleteUserRepository
    }
    async execute(userId) {
        const deletedUser =
            await this.postgresDeleteUserRepository.execute(userId)
        return deletedUser
    }
}
