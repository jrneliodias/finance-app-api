import { faker } from '@faker-js/faker'
import { GetUserBalanceController } from './get-user-balance'

describe('GetUserByIdController', () => {
    class GetUserByIdUseCaseStub {
        async execute(id) {
            return id
        }
    }

    const makeSut = () => {
        const getUserByIdUseCase = new GetUserByIdUseCaseStub()
        const sut = new GetUserBalanceController(getUserByIdUseCase)
        return { getUserByIdUseCase, sut }
    }

    const httpRequest = {
        params: {
            userId: faker.string.uuid(),
        },
    }

    it('should return 200 when get an user by id successfully', async () => {
        const { sut } = makeSut()

        // act
        const httpResponse = await sut.execute(httpRequest)

        // assert
        expect(httpResponse.statusCode).toBe(200)
    })
})
