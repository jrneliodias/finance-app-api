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
    it('should return 400 when a invalid id is provided', async () => {
        // arrange
        const { sut } = makeSut()

        // act
        const httpResponse = await sut.execute({
            ...httpRequest,
            params: {
                userId: 'invalid_id',
            },
        })

        // assert
        expect(httpResponse.statusCode).toBe(400)
    })
    it('should return 400 when a invalid field is provided', async () => {
        // arrange
        const { sut } = makeSut()

        // act
        const httpResponse = await sut.execute({
            ...httpRequest,
            body: { invalid_field: 'invalid_field' },
        })

        // assert
        expect(httpResponse.statusCode).toBe(400)
    })
    it('should return 400 when a invalid password is provided', async () => {
        // arrange
        const { sut } = makeSut()

        // act
        const httpResponse = await sut.execute({
            ...httpRequest,
            body: {
                ...httpRequest.body,
                email: 'invalid_email',
            },
        })

        // assert
        expect(httpResponse.statusCode).toBe(400)
    })
    it('should return 400 when a invalid email is provided', async () => {
        // arrange
        const { sut } = makeSut()

        // act
        const httpResponse = await sut.execute({
            ...httpRequest,
            body: {
                ...httpRequest.body,
                password: faker.internet.password({ length: 3 }),
            },
        })

        // assert
        expect(httpResponse.statusCode).toBe(400)
    })

    it('should return 500 when GetUserUseCase throws a generic Error', async () => {
        const { sut, updateUserUseCase } = makeSut()
        jest.spyOn(updateUserUseCase, 'execute').mockRejectedValue(new Error())

        // act
        const httpResponse = await sut.execute(httpRequest)

        // assert
        expect(httpResponse.statusCode).toBe(500)
    })
})
