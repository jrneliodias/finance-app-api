export class DeleteTransactionUseCase {
    constructor(PostgresDeleteTransactionRepository) {
        this.postgresDeleteTransactionRepository =
            PostgresDeleteTransactionRepository
    }
    async execute(transactionId) {
        const deletedTransaction =
            await this.postgresDeleteTransactionRepository.execute(
                transactionId,
            )
        return deletedTransaction
    }
}
