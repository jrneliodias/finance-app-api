import { PostgresCreateUserRepository } from '../repositories/postgres/create-user'

export class GetUserByIdUseCase {
    async execute(userId) {
        const getUserByIdRepository = new PostgresCreateUserRepository()
        const user = await getUserByIdRepository.execute(userId)
        return user
    }
}
