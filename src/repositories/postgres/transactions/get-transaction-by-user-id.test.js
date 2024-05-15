import { prisma } from '../../../../prisma/prisma'
import { user as fakeUser, transaction } from '../../../tests'
import { PostgresGetTransactionByUserId } from './get-transaction-by-user-id'

describe('GetTransactionByUserIdRepository', () => {
    it('should get transaction by user id', async () => {
        const user = await prisma.user.create({ data: fakeUser })
        const createTransaction = await prisma.transaction.create({
            data: { ...transaction, user_id: user.id },
        })

        const sut = new PostgresGetTransactionByUserId()

        const result = await sut.execute(user.id)

        expect(result).toStrictEqual([createTransaction])
    })

    it('should call Prisma with correct params', async () => {
        const user = await prisma.user.create({ data: fakeUser })

        const sut = new PostgresGetTransactionByUserId()

        const prismaSpy = jest.spyOn(prisma.transaction, 'findMany')

        await sut.execute(user.id)

        expect(prismaSpy).toHaveBeenCalledWith({
            where: { user_id: user.id },
        })
    })

    it('should throws if Prisma throws', async () => {
        const user = await prisma.user.create({ data: fakeUser })
        const sut = new PostgresGetTransactionByUserId()
        jest.spyOn(prisma.transaction, 'findMany').mockRejectedValueOnce(
            new Error(),
        )
        const promise = sut.execute(user.id)
        await expect(promise).rejects.toThrow()
    })
})
