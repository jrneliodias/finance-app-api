import { prisma } from '../../../../prisma/prisma.js'

export class PostgresCreateTransactionRepository {
    async execute(createTransactionParams) {
        const createdTransaction = await prisma.transaction.create({
            data: createTransactionParams,
        })
        return createdTransaction
    }
}
