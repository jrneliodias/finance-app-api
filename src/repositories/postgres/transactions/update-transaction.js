import { prisma } from '../../../../prisma/prisma.js'

export class PostgresUpdateTransactionRepository {
    async execute(transactionId, updateTransactionParams) {
        try {
            const updatedTransaction = await prisma.transaction.update({
                where: {
                    id: transactionId,
                },
                data: updateTransactionParams,
            })

            return updatedTransaction
        } catch (error) {
            console.error(error)
        }
    }
}
