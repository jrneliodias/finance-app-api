import { userNotFoundResponse } from '../../controllers/helpers/users.js'

export class GetTransactionByUserIdUseCase {
    constructor(getTransactionByUserIdRepository, getUserByIdRepository) {
        this.getTransactionByUserIdRepository = getTransactionByUserIdRepository
        this.getUserByIdRepository = getUserByIdRepository
    }

    async execute(params) {
        const user = await this.getUserByIdRepository.execute(params.user_id)

        if (!user) {
            return userNotFoundResponse(params.userId)
        }

        const transaction = await this.getTransactionByUserIdRepository.execute(
            params.user_id,
        )

        return transaction
    }
}
