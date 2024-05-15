import { prisma } from '../../../../prisma/prisma'
import { user as fakeUser, transaction } from '../../../tests'
import { PostgresUpdateTransactionRepository } from './update-transaction'

describe('UpdateTransactionRepository', () => {
    it('should update transaction', async () => {
        const user = await prisma.user.create({ data: fakeUser })
        const createTransaction = await prisma.transaction.create({
            data: { ...transaction, user_id: user.id },
        })

        const sut = new PostgresUpdateTransactionRepository()

        const updatedTransaction = await sut.execute(
            createTransaction.id,
            createTransaction,
        )

        expect(updatedTransaction).toStrictEqual(createTransaction)
    })

    it('should call Prisma with correct params', async () => {
        const user = await prisma.user.create({ data: fakeUser })
        const createTransaction = await prisma.transaction.create({
            data: { ...transaction, user_id: user.id },
        })

        const sut = new PostgresUpdateTransactionRepository()

        const prismaSpy = jest.spyOn(prisma.transaction, 'update')

        await sut.execute(createTransaction.id, createTransaction)

        expect(prismaSpy).toHaveBeenCalledWith({
            where: { id: createTransaction.id },
            data: createTransaction,
        })
    })
})
