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

    it('should return 400 if name is not valid', async () => {
        const { sut } = makeSut()
        // act

        const result = await sut.execute({
            body: {
                ...httpRequest.body,
                name: '',
            },
        })

        // assert
        expect(result.statusCode).toBe(400)
    })
    it('should return 400 if date is not valid', async () => {
        const { sut } = makeSut()
        // act

        const result = await sut.execute({
            body: {
                ...httpRequest.body,
                date: 'invalid_Date',
            },
        })

        // assert
        expect(result.statusCode).toBe(400)
    })
    it('should return 400 if amount is not valid', async () => {
        const { sut } = makeSut()
        // act

        const result = await sut.execute({
            body: {
                ...httpRequest.body,
                amount: 'invalid_amount',
            },
        })

        // assert
        expect(result.statusCode).toBe(400)
    })
    it('should return 400 if type is not valid', async () => {
        const { sut } = makeSut()
        // act

        const result = await sut.execute({
            body: {
                ...httpRequest.body,
                type: 'invalid_type',
            },
        })

        // assert
        expect(result.statusCode).toBe(400)
    })
    it('should return 500 if CreateTransactionUseCase throws Error', async () => {
        const { createTransactionUseCase, sut } = makeSut()
        // act
        jest.spyOn(createTransactionUseCase, 'execute').mockRejectedValueOnce(
            new Error(),
        )
        const result = await sut.execute(httpRequest)

        // assert
        expect(result.statusCode).toBe(500)
    })
    it('should call CreateTransactionUseCase with correct params', async () => {
        //arrange
        const { sut, createTransactionUseCase } = makeSut()
        const executeSpy = jest.spyOn(createTransactionUseCase, 'execute')

        // act
        await sut.execute(httpRequest)

        // assert
        expect(executeSpy).toHaveBeenCalledWith(httpRequest.body)
        expect(executeSpy).toHaveBeenCalledTimes(1)
    })
})
