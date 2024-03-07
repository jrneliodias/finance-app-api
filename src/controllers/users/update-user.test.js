import { faker } from '@faker-js/faker'
import { UpdateUserController } from './update-user.js'

describe('UpdateUserController', () => {
    class UpdateUserUseCaseStub {
        async execute() {
            return {
                id: faker.string.uuid(),
                first_name: faker.person.firstName(),
                last_name: faker.person.lastName(),
                email: faker.internet.email(),
                password: faker.internet.password({ length: 7 }),
            }
        }
    }

    const makeSut = () => {
        const updateUserUseCase = new UpdateUserUseCaseStub()
        const sut = new UpdateUserController(updateUserUseCase)
        return { updateUserUseCase, sut }
    }

    const httpRequest = {
        params: {
            userId: faker.string.uuid(),
        },
        body: {
            first_name: faker.person.firstName(),
            last_name: faker.person.lastName(),
            email: faker.internet.email(),
            password: faker.internet.password({ length: 7 }),
        },
    }

    it('should return 200 when update an user successfully', async () => {
        // arrange
        const { sut } = makeSut()

        // act
        const httpResponse = await sut.execute(httpRequest)

        // assert
        expect(httpResponse.statusCode).toBe(200)
    })
    // it('should return 400 when a invalid id is provided', async () => {
    //     // arrange
    //     const { sut } = makeSut()

    //     // act
    //     const httpResponse = await sut.execute({
    //         params: { userId: 'invalid_id' },
    //     })

    //     // assert
    //     expect(httpResponse.statusCode).toBe(400)
    // })
    // it('should return 404 when the user is not found', async () => {
    //     const { sut, getUserByIdUseCase } = makeSut()
    //     jest.spyOn(getUserByIdUseCase, 'execute').mockResolvedValue(null)

    //     // act
    //     const httpResponse = await sut.execute(httpRequest)

    //     // assert
    //     expect(httpResponse.statusCode).toBe(404)
    // })

    // it('should return 500 when GetUserUseCase throws a Error', async () => {
    //     const { sut, getUserByIdUseCase } = makeSut()
    //     jest.spyOn(getUserByIdUseCase, 'execute').mockRejectedValue(new Error())

    //     // act
    //     const httpResponse = await sut.execute(httpRequest)

    //     // assert
    //     expect(httpResponse.statusCode).toBe(500)
    // })
})
