import { prisma } from '../../../../prisma/prisma'
import { user as fakeUser, transaction } from '../../../tests'
import { PostgresCreateTransactionRepository } from './create-transaction'

describe('CreateTransactionRepository', () => {
    it('should return created transaction', async () => {
        const user = await prisma.user.create({ data: fakeUser })
        const sut = new PostgresCreateTransactionRepository()
        const result = await sut.execute({ ...transaction, user_id: user.id })

        // change the result.amount to number and result.date to date
        result.amount = Number(result.amount)
        result.date = result.date.toISOString()

        expect(result).toStrictEqual({ ...transaction, user_id: user.id })
    })

    it('should call Prisma with correct params', async () => {
        const user = await prisma.user.create({ data: fakeUser })
        const sut = new PostgresCreateTransactionRepository()
        const prismaSpy = jest.spyOn(prisma.transaction, 'create')
        await sut.execute({ ...transaction, user_id: user.id })

        expect(prismaSpy).toHaveBeenCalledWith({
            data: {
                ...transaction,
                user_id: user.id,
            },
        })
    })

    it('should throw if Prisma throws', async () => {
        const user = await prisma.user.create({ data: fakeUser })
        const sut = new PostgresCreateTransactionRepository()
        jest.spyOn(prisma.transaction, 'create').mockRejectedValueOnce(
            new Error(),
        )
        const promise = sut.execute({ ...transaction, user_id: user.id })
        await expect(promise).rejects.toThrow()
    })
})
