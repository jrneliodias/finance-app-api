import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import { prisma } from '../../../../prisma/prisma.js'
import { TransactionNotFoundError } from '../../../errors/index.js'

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
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code === 'P2025') {
                    //"An operation failed because it depends on one or more records that were required but not found. {cause}"
                    throw new TransactionNotFoundError(transactionId)
                }
            }
            throw error
        }
    }
}
