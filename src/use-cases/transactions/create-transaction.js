import { UserNotFoundError } from '../../errors/user.js'

export class CreateTransactionUseCase {
    constructor(
        createTransactionRepository,
        getUseByIdRepository,
        idGeneratorAdapter,
    ) {
        this.createTransactionRepository = createTransactionRepository
        this.getUseByIdRepository = getUseByIdRepository
        this.idGeneratorAdapter = idGeneratorAdapter
    }

    async execute(createTransactionParams) {
        const userId = createTransactionParams.user_id
        const user = await this.getUseByIdRepository.execute(userId)

        if (!user) {
            throw new UserNotFoundError(userId)
        }

        const transactionId = this.idGeneratorAdapter.execute()

        const createdTransaction =
            await this.createTransactionRepository.execute({
                ...createTransactionParams,
                id: transactionId,
            })

        return createdTransaction
    }
}
