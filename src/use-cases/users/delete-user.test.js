import { faker } from '@faker-js/faker'
import { DeleteUserUseCase } from './delete-user'
import { user } from '../../tests'

describe('DeleteUserUseCase', () => {
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

    it('should throw if DeleteUserRepository throws', async () => {
        // arrange
        const { sut, deleteUserRepositoryStub } = makeSut()
        jest.spyOn(deleteUserRepositoryStub, 'execute').mockRejectedValueOnce(
            new Error(),
        )
        const userId = faker.string.uuid()

        // act
        const promise = sut.execute(userId)
        // assert
        await expect(promise).rejects.toThrow()
    })
})
