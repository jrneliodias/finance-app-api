import { faker } from '@faker-js/faker'
import { DeleteUserController } from './delete-user.js'

describe('DeleteUserController', () => {
    class DeleteUserUseCaseStub {
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
        const deleteUserUseCase = new DeleteUserUseCaseStub()
        const sut = new DeleteUserController(deleteUserUseCase)
        return { deleteUserUseCase, sut }
    }

    const httpRequest = {
        params: {
            userId: faker.string.uuid(),
        },
    }

    it('should return 200 if user is deleted', async () => {
        const { sut } = makeSut()

        // act
        const result = await sut.execute(httpRequest)

        // assert
        expect(result.statusCode).toBe(200)
    })

    it('should return 400 if id is invalid', async () => {
        const { sut } = makeSut()

        // act
        const result = await sut.execute({ params: { userId: 'invalid_id' } })

        // assert
        expect(result.statusCode).toBe(400)
    })

    it('should return 404 if user is not found', async () => {
        const { sut, deleteUserUseCase } = makeSut()

        jest.spyOn(deleteUserUseCase, 'execute').mockResolvedValue(null)
        // act
        const result = await sut.execute(httpRequest)

        // assert
        expect(result.statusCode).toBe(404)
    })
    it('should return 500 if DeleteUseCase throws', async () => {
        const { sut, deleteUserUseCase } = makeSut()

        // act

        jest.spyOn(deleteUserUseCase, 'execute').mockRejectedValueOnce(
            new Error(),
        )

        const result = await sut.execute(httpRequest)

        // assert
        expect(result.statusCode).toBe(500)
    })
    it('should call DeleteUserUseCase with correct params', async () => {
        //arrange
        const { sut, deleteUserUseCase } = makeSut()
        const executeSpy = jest.spyOn(deleteUserUseCase, 'execute')

        // act
        await sut.execute(httpRequest)

        // assert
        expect(executeSpy).toHaveBeenCalledWith(httpRequest.params.userId)
        expect(executeSpy).toHaveBeenCalledTimes(1)
    })
})
