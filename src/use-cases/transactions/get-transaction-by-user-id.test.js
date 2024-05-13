import { faker } from '@faker-js/faker'
import { GetTransactionByUserIdUseCase } from './get-transaction-by-user-id'
import { user } from '../../tests'

describe('GetTransactionByUserIdUseCase', () => {
    class GetTransactionByUserIdRepositoryStub {
        async execute() {
            return []
        }
    }
    class GetUserByIdRepositoryStub {
        async execute() {
            return user
        }
    }

    const makeSut = () => {
        const getTransactionByUserIdRepositoryStub =
            new GetTransactionByUserIdRepositoryStub()
        const getUserByIdRepositoryStub = new GetUserByIdRepositoryStub()
        const sut = new GetTransactionByUserIdUseCase(
            getTransactionByUserIdRepositoryStub,
            getUserByIdRepositoryStub,
        )
        return {
            sut,
            getTransactionByUserIdRepositoryStub,
            getUserByIdRepositoryStub,
        }
    }
    it('should return an array of transactions', async () => {
        const { sut } = makeSut()

        const result = await sut.execute(user.id)

        expect(result).toEqual([])
    })

    it("should throw UserNotFoundError if user doesn't exists", async () => {
        const { sut, getUserByIdRepositoryStub } = makeSut()
        jest.spyOn(getUserByIdRepositoryStub, 'execute').mockResolvedValueOnce(
            null,
        )
        const promise = sut.execute(faker.string.uuid())
        await expect(promise).rejects.toThrow()
    })
    it('should throw if GetTransactionByUserIdRepository throws', async () => {
        const { sut, getTransactionByUserIdRepositoryStub } = makeSut()
        jest.spyOn(
            getTransactionByUserIdRepositoryStub,
            'execute',
        ).mockImplementationOnce(() => {
            throw new Error()
        })
        const promise = sut.execute(user.id)
        await expect(promise).rejects.toThrow()
    })

    it('should call GetTransactionByUserIdRepository with correct params', async () => {
        const { sut, getTransactionByUserIdRepositoryStub } = makeSut()
        const getTransactionByUserIdRepositorySpy = jest.spyOn(
            getTransactionByUserIdRepositoryStub,
            'execute',
        )
        await sut.execute(user.id)
        expect(getTransactionByUserIdRepositorySpy).toHaveBeenCalledWith(
            user.id,
        )
    })

    it('should throw if GetUserByIdRepository throws', async () => {
        const { sut, getUserByIdRepositoryStub } = makeSut()
        jest.spyOn(getUserByIdRepositoryStub, 'execute').mockImplementationOnce(
            () => {
                throw new Error()
            },
        )
        const promise = sut.execute(user.id)
        await expect(promise).rejects.toThrow()
    })
})
