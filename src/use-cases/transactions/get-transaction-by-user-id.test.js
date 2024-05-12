import { faker } from '@faker-js/faker'
import { GetTransactionByUserIdUseCase } from './get-transaction-by-user-id'

describe('GetTransactionByUserIdUseCase', () => {
    const user = {
        id: faker.string.uuid(),
        first_name: faker.person.firstName(),
        last_name: faker.person.lastName(),
        email: faker.internet.email(),
        password: faker.internet.password({ length: 7 }),
    }
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
})
