import { faker } from '@faker-js/faker'
import { prisma } from '../../../../prisma/prisma'
import { user as fakeUser } from '../../../tests'
import { PostgresGetUserBalanceRepository } from './get-user-balance'

describe('GetUserBalanceRepository', () => {
    const makeSut = () => {
        const sut = new PostgresGetUserBalanceRepository()

        return { sut }
    }
    const testeTransactionData = [
        {
            user_id: fakeUser.id,
            amount: 100,
            date: faker.date.anytime().toISOString(),
            name: faker.finance.transactionType(),
            type: 'EARNING',
        },
        {
            user_id: fakeUser.id,
            date: faker.date.anytime().toISOString(),
            name: faker.finance.transactionType(),
            amount: 300,
            type: 'EARNING',
        },
        {
            user_id: fakeUser.id,
            date: faker.date.anytime().toISOString(),
            name: faker.finance.transactionType(),
            amount: 300,
            type: 'EXPENSE',
        },
        {
            user_id: fakeUser.id,
            date: faker.date.anytime().toISOString(),
            name: faker.finance.transactionType(),
            amount: 1000,
            type: 'INVESTMENT',
        },

        {
            user_id: fakeUser.id,
            date: faker.date.anytime().toISOString(),
            name: faker.finance.transactionType(),
            amount: 100,
            type: 'EARNING',
        },
    ]
    const testTotalEarning = testeTransactionData.reduce(
        (total, transaction) => {
            if (transaction.type === 'EARNING') {
                return total + transaction.amount
            }
            return total
        },
        0,
    )

    const testTotalExpense = testeTransactionData.reduce(
        (total, transaction) => {
            if (transaction.type === 'EXPENSE') {
                return total + transaction.amount
            }
            return total
        },
        0,
    )

    const testTotalInvestment = testeTransactionData.reduce(
        (total, transaction) => {
            if (transaction.type === 'INVESTMENT') {
                return total + transaction.amount
            }
            return total
        },
        0,
    )

    const testBalance =
        testTotalEarning - testTotalExpense - testTotalInvestment

    it('should sucessfully get user balance', async () => {
        const { sut } = makeSut()
        const user = await prisma.user.create({
            data: fakeUser,
        })

        await prisma.transaction.createMany({
            data: testeTransactionData,
        })

        const result = await sut.execute(user.id)

        expect(Number(result.earnings)).toStrictEqual(testTotalEarning)
        expect(Number(result.expenses)).toStrictEqual(testTotalExpense)
        expect(Number(result.investments)).toStrictEqual(testTotalInvestment)
        expect(Number(result.investments)).toStrictEqual(testTotalInvestment)
        expect(Number(result.balance)).toStrictEqual(testBalance)
    })

    it('should call Prisma aggregate 3 times', async () => {
        const { sut } = makeSut()
        const prismaSpy = jest.spyOn(prisma.transaction, 'aggregate')
        await sut.execute(fakeUser.id)
        expect(prismaSpy).toHaveBeenCalledTimes(3)
        expect(prismaSpy).toHaveBeenCalledWith({
            where: {
                user_id: fakeUser.id,
                type: 'EARNING',
            },
            _sum: {
                amount: true,
            },
        })
        expect(prismaSpy).toHaveBeenCalledWith({
            where: {
                user_id: fakeUser.id,
                type: 'EXPENSE',
            },
            _sum: {
                amount: true,
            },
        })
        expect(prismaSpy).toHaveBeenCalledWith({
            where: {
                user_id: fakeUser.id,
                type: 'INVESTMENT',
            },
            _sum: {
                amount: true,
            },
        })
    })
})
