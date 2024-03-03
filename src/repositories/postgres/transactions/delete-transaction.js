import { prisma } from '../../../../prisma/prisma.js'

export class PostgresDeleteTransactionRepository {
    async execute(transactionId) {
        try {
            const deletedTransaction = await prisma.transaction.delete({
                where: {
                    id: transactionId,
                },
            })
            return deletedTransaction
        } catch (error) {
            return null
        }
    }
}
