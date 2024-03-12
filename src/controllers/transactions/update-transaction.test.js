import { faker } from '@faker-js/faker'
import { UpdateTransactionController } from './update-transaction.js'

describe('Update Transaction Controller', () => {
    class UpdateTransactionUseCaseStub {
        async execute() {
            return {
                id: faker.string.uuid(),
                user_id: faker.string.uuid(),
                name: faker.finance.transactionType(),
                date: faker.date.anytime().toISOString(),
                amount: Number(faker.finance.amount()),
                type: faker.helpers.arrayElement([
                    'EXPENSE',
                    'INVESTMENT',
                    'EARNING',
                ]),
            }
        }
    }

    const makeSut = () => {
        const updateTransactionUseCase = new UpdateTransactionUseCaseStub()
        const sut = new UpdateTransactionController(updateTransactionUseCase)
        return { updateTransactionUseCase, sut }
    }

    const httpRequest = {
        params: {
            transactionId: faker.string.uuid(),
        },
        body: {
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

    it('should return 200 if transaction is update successfully', async () => {
        const { sut } = makeSut()

        // act
        const result = await sut.execute(httpRequest)

        // assert
        expect(result.statusCode).toBe(200)
    })
    it('should return 400 when transaction id is invalid', async () => {
        const { sut } = makeSut()

        // act
        const result = await sut.execute({
            params: { transactionId: 'invalid_id' },
            body: { ...httpRequest.body },
        })

        // assert
        expect(result.statusCode).toBe(400)
    })
    it('should return 400 when unallowed field is provided', async () => {
        const { sut } = makeSut()

        // act
        const result = await sut.execute({
            ...httpRequest,
            body: { ...httpRequest.body, unallowed_field: 'some_value' },
        })

        // assert
        expect(result.statusCode).toBe(400)
    })
    it('should return 400 when invalid amount is provided', async () => {
        const { sut } = makeSut()

        // act
        const result = await sut.execute({
            ...httpRequest,
            body: {
                ...httpRequest.body,
                amount: 'invalid_amount',
            },
        })

        // assert
        expect(result.statusCode).toBe(400)
    })
    it('should return 400 when invalid type is provided', async () => {
        const { sut } = makeSut()

        // act
        const result = await sut.execute({
            ...httpRequest,
            body: {
                ...httpRequest.body,
                type: 'invalid_type',
            },
        })

        // assert
        expect(result.statusCode).toBe(400)
    })

    it('should call UpdateTransactionUseCase with correct params', async () => {
        const { sut, updateTransactionUseCase } = makeSut()
        const executeSpy = jest.spyOn(updateTransactionUseCase, 'execute')

        // act

        await sut.execute(httpRequest)

        // assert
        expect(executeSpy).toHaveBeenCalledWith(
            httpRequest.params.transactionId,
            httpRequest.body,
        )
    })
})
