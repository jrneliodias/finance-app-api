import { faker } from '@faker-js/faker'
import { GetTransactionByUserIdController } from './get-transaction-by-user-id.js'
import { UserNotFoundError } from '../../errors/user.js'

describe('GetTransactionByUserIdController', () => {
    class GetTransactionByUserIdUseCaseStub {
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
        const getTransactionByUserIdUseCase =
            new GetTransactionByUserIdUseCaseStub()
        const sut = new GetTransactionByUserIdController(
            getTransactionByUserIdUseCase,
        )
        return { getTransactionByUserIdUseCase, sut }
    }

    const httpRequest = {
        query: {
            user_id: faker.string.uuid(),
        },
    }

    it('should return 200 when find a transaction by user is successfully', async () => {
        const { sut } = makeSut()

        // act
        const result = await sut.execute(httpRequest)

        // assert
        expect(result.statusCode).toBe(200)
    })
    it('should return 400 if user id is invalid', async () => {
        const { sut } = makeSut()

        // act
        const result = await sut.execute({
            query: { transactionId: 'invalid_id' },
        })

        // assert
        expect(result.statusCode).toBe(400)
    })
    it('should return 400 if user id is missing', async () => {
        const { sut } = makeSut()

        // act
        const result = await sut.execute({
            query: { transactionId: undefined },
        })

        // assert
        expect(result.statusCode).toBe(400)
    })
    it('should return 404 if user transaction is not found', async () => {
        const { sut, getTransactionByUserIdUseCase } = makeSut()

        jest.spyOn(getTransactionByUserIdUseCase, 'execute').mockResolvedValue(
            null,
        )
        // act
        const result = await sut.execute(httpRequest)

        // assert
        expect(result.statusCode).toBe(200)
    })

    it('should return 404 if getUserIdUseCase throws UserNotFoundError', async () => {
        const { sut, getTransactionByUserIdUseCase } = makeSut()

        // act

        jest.spyOn(
            getTransactionByUserIdUseCase,
            'execute',
        ).mockRejectedValueOnce(new UserNotFoundError())

        const result = await sut.execute(httpRequest)

        // assert
        expect(result.statusCode).toBe(404)
    })
    it('should return 500 if DeleteTransactionUseCase throws', async () => {
        const { sut, getTransactionByUserIdUseCase } = makeSut()

        // act

        jest.spyOn(
            getTransactionByUserIdUseCase,
            'execute',
        ).mockRejectedValueOnce(new Error())

        const result = await sut.execute(httpRequest)

        // assert
        expect(result.statusCode).toBe(500)
    })
})
