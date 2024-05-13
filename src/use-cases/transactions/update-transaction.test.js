import { faker } from '@faker-js/faker'
import { UpdateTransactionUseCase } from './update-transaction'

describe('UpdateTransactionUseCase', () => {
    const transaction = {
        id: faker.string.uuid(),
        user_id: faker.string.uuid(),
        name: faker.finance.transactionType(),
        date: faker.date.anytime().toISOString(),
        amount: Number(faker.finance.amount()),
        type: faker.helpers.arrayElement(['EXPENSE', 'INVESTMENT', 'EARNING']),
    }

    class UpdateTransactionRepositoryStub {
        async execute(transactionId, params) {
            return {
                id: transactionId,
                ...transaction,
                ...params,
            }
        }
    }

    const makeSut = () => {
        const updateTransactionRepositoryStub =
            new UpdateTransactionRepositoryStub()
        const sut = new UpdateTransactionUseCase(
            updateTransactionRepositoryStub,
        )
        return { sut, updateTransactionRepositoryStub }
    }

    it("should return an transaction if it's updated successfully", async () => {
        const { sut } = makeSut()

        const result = await sut.execute(transaction.id, {})

        expect(result).toEqual(transaction)
    })
    it('should throw if UpdateTransactionRepository throws', async () => {
        const { sut, updateTransactionRepositoryStub } = makeSut()
        jest.spyOn(
            updateTransactionRepositoryStub,
            'execute',
        ).mockRejectedValueOnce(new Error())
        const promise = sut.execute(transaction.id, {})
        await expect(promise).rejects.toThrow()
    })
})
