import { prisma } from '../../../../prisma/prisma'
import { user as fakeUser, transaction } from '../../../tests'
import { PostgresDeleteTransactionRepository } from './delete-transaction'

describe('DeleteTransactionRepository', () => {
    it('should return null if deleted transaction', async () => {
        const user = await prisma.user.create({ data: fakeUser })
        const createTransaction = await prisma.transaction.create({
            data: { ...transaction, user_id: user.id },
        })

        const sut = new PostgresDeleteTransactionRepository()

        const result = await sut.execute(createTransaction.id)

        expect(result).toStrictEqual(createTransaction)
    })

    it('should call Prisma with correct params', async () => {
        const user = await prisma.user.create({ data: fakeUser })
        const createTransaction = await prisma.transaction.create({
            data: { ...transaction, user_id: user.id },
        })

        const sut = new PostgresDeleteTransactionRepository()

        const prismaSpy = jest.spyOn(prisma.transaction, 'delete')

        await sut.execute(createTransaction.id)

        expect(prismaSpy).toHaveBeenCalledWith({
            where: { id: createTransaction.id },
        })
    })

    it('should throwsif Prisma throws  a generic error ', async () => {
        const user = await prisma.user.create({ data: fakeUser })
        const createTransaction = await prisma.transaction.create({
            data: { ...transaction, user_id: user.id },
        })

        const sut = new PostgresDeleteTransactionRepository()

        jest.spyOn(prisma.transaction, 'delete').mockRejectedValueOnce(
            new Error(),
        )
        const promise = sut.execute(createTransaction.id)

        await expect(promise).rejects.toThrow()
    })
})
