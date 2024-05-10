import { faker } from '@faker-js/faker'
import { DeleteUserUseCase } from './delete-user'

describe('DeleteUserUseCase', () => {
    const user = {
        id: faker.string.uuid(),
        first_name: faker.person.firstName(),
        last_name: faker.person.lastName(),
        email: faker.internet.email(),
        password: faker.internet.password({ length: 7 }),
    }
    class DeleteUserrepositoryStub {
        async execute(userId) {
            return { ...user, id: userId }
        }
    }
    const makeSut = () => {
        const deleteUserRepositoryStub = new DeleteUserrepositoryStub()
        const sut = new DeleteUserUseCase(deleteUserRepositoryStub)

        return {
            sut,
            deleteUserRepositoryStub,
        }
    }

    it('should sucessfully delete an user', async () => {
        // arrange
        const { sut } = makeSut()

        // act
        const deletedUser = await sut.execute(user.id)

        // assert
        expect(deletedUser).toBeTruthy()
        expect(deletedUser).toEqual(user)
    })
    it('should call DeleteUserRepository with correct params', async () => {
        // arrange
        const { sut, deleteUserRepositoryStub } = makeSut()
        const executeSpy = jest.spyOn(deleteUserRepositoryStub, 'execute')
        const userId = faker.string.uuid()

        // act
        await sut.execute(userId)

        // assert
        expect(executeSpy).toHaveBeenCalledWith(userId)
    })
})
