import { faker } from '@faker-js/faker'
import { CreateTransactionController } from './create-transaction.js'

describe('Create Transaction Controller', () => {
    class CreateTransactionUseCaseStub {
        async execute(trasansaction) {
            return trasansaction.body
        }
    }
    const makeSut = () => {
        const createTransactionUseCase = new CreateTransactionUseCaseStub()
        const sut = new CreateTransactionController(createTransactionUseCase)
        return { createTransactionUseCase, sut }
    }

    const httpRequest = {
        body: {
            user_id: faker.string.uuid(),
            name: faker.finance.transactionType(),
            date: faker.date.anytime().toISOString(),
            amount: Number(faker.finance.amount()),
            type: faker.helpers.arrayElement([
                'EXPENSE',
                'INVESTMENT',
                'EARNING',
            ]),
        },
    }

    it('should return 201 when creating an transaction successfully', async () => {
        // arrange
        const { sut } = makeSut()
        // act
        const httpResponse = await sut.execute(httpRequest)

        // assert
        expect(httpResponse.statusCode).toBe(201)
    })
    it('should return 400 if user_id is not valid', async () => {
        const { sut } = makeSut()
        // act

        const result = await sut.execute({
            body: {
                ...httpRequest.body,
                user_id: 'invalid_id',
            },
        })

        // assert
        expect(result.statusCode).toBe(400)
    })
})
