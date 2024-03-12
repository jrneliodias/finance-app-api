import { UserNotFoundError } from '../../errors/user.js'

export class GetTransactionByUserIdUseCase {
    constructor(getTransactionByUserIdRepository, getUserByIdRepository) {
        this.getTransactionByUserIdRepository = getTransactionByUserIdRepository
        this.getUserByIdRepository = getUserByIdRepository
    }

    async execute(user_id) {
        const user = await this.getUserByIdRepository.execute(user_id)

        if (!user) {
            throw new UserNotFoundError(user_id)
        }

        const transaction =
            await this.getTransactionByUserIdRepository.execute(user_id)

        return transaction
    }
}
