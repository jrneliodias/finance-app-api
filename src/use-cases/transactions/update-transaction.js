export class UpdateTransactionUseCase {
    constructor(updateTransactionRepository) {
        this.updateTransactionRepository = updateTransactionRepository
    }

    async execute(transationId, params) {
        const transaction = await this.updateTransactionRepository.execute(
            transationId,
            params,
        )

        return transaction
    }
}
