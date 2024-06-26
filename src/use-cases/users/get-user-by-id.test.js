import { faker } from '@faker-js/faker'
import { GetUserByIdUseCase } from './get-user-by-id'
import { user as fixtureUser } from '../../tests'

describe('GetUserByIdUseCase', () => {
    const user = {
        ...fixtureUser,
        id: undefined,
    }
    class GetUserByIdRepositoryStub {
        async execute() {
            return user
        }
    }

    const makeSut = () => {
        const getUserByIdRepositoryStub = new GetUserByIdRepositoryStub()
        const sut = new GetUserByIdUseCase(getUserByIdRepositoryStub)
        return { sut, getUserByIdRepositoryStub }
    }

    it('should GetUserByIdUseCase return user', async () => {
        const { sut } = makeSut()
        const user = await sut.execute(faker.string.uuid())
        expect(user).toEqual(user)
    })

    it('should call GetUserByIdRepository with correct params', async () => {
        const { sut, getUserByIdRepositoryStub } = makeSut()
        const executeSpy = jest.spyOn(getUserByIdRepositoryStub, 'execute')
        const userId = faker.string.uuid()

        await sut.execute(userId)

        expect(executeSpy).toHaveBeenCalledWith(userId)
    })

    it('should GetUserByIdUseCase throw if GetUserByIdRepository throws', async () => {
        const { sut, getUserByIdRepositoryStub } = makeSut()
        jest.spyOn(getUserByIdRepositoryStub, 'execute').mockImplementationOnce(
            () => {
                throw new Error()
            },
        )
        const promise = sut.execute(faker.string.uuid())

        await expect(promise).rejects.toThrow()
    })
})
