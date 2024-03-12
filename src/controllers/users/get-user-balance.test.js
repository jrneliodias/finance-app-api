import { faker } from '@faker-js/faker'
import { GetUserBalanceController } from './get-user-balance.js'
import { UserNotFoundError } from '../../errors/user.js'

describe('GetUserBalanceController', () => {
    class GetUserBalanceUseCaseStub {
        async execute() {
            return faker.number.int()
        }
    }

    const makeSut = () => {
        const getUserBalanceUseCase = new GetUserBalanceUseCaseStub()
        const sut = new GetUserBalanceController(getUserBalanceUseCase)
        return { getUserBalanceUseCase, sut }
    }

    const httpRequest = {
        params: {
            userId: faker.string.uuid(),
        },
    }

    it('should return 200 when getting user balance', async () => {
        const { sut } = makeSut()

        // act
        const httpResponse = await sut.execute(httpRequest)

        // assert
        expect(httpResponse.statusCode).toBe(200)
    })

    it('should return 400 if id is invalid', async () => {
        const { sut } = makeSut()

        // act
        const httpResponse = await sut.execute({
            params: { userId: 'invalid_id' },
        })

        // assert
        expect(httpResponse.statusCode).toBe(400)
    })

    it('should return 404 if user is not found', async () => {
        const { sut, getUserBalanceUseCase } = makeSut()

        jest.spyOn(getUserBalanceUseCase, 'execute').mockReturnValueOnce(null)
        // act
        const result = await sut.execute(httpRequest)

        // assert
        expect(result.statusCode).toBe(404)
    })
    it('should return 500 if CreateUserBalanceUseCase throws', async () => {
        const { sut, getUserBalanceUseCase } = makeSut()

        // act

        jest.spyOn(getUserBalanceUseCase, 'execute').mockRejectedValueOnce(
            new Error(),
        )

        const result = await sut.execute(httpRequest)

        // assert
        expect(result.statusCode).toBe(500)
    })
    it('should call GetUserBalanceUserUseCase with correct params', async () => {
        //arrange
        const { sut, getUserBalanceUseCase } = makeSut()
        const executeSpy = jest.spyOn(getUserBalanceUseCase, 'execute')

        // act
        await sut.execute(httpRequest)

        // assert
        expect(executeSpy).toHaveBeenCalledWith(httpRequest.params.userId)
        expect(executeSpy).toHaveBeenCalledTimes(1)
    })
    it('should return 404 if GetUserbalanceUseCase throws UserNotFoundError', async () => {
        const { sut, getUserBalanceUseCase } = makeSut()

        // act

        jest.spyOn(getUserBalanceUseCase, 'execute').mockRejectedValueOnce(
            new UserNotFoundError(),
        )

        const result = await sut.execute(httpRequest)

        // assert
        expect(result.statusCode).toBe(404)
    })
})
