import { faker } from '@faker-js/faker'
import { GetUserBalanceUseCase } from './get-user-balance'
import { UserNotFoundError } from '../../errors/user'

describe('GetUserBalanceUseCase', () => {
    const userBalance = {
        earnings: faker.finance.amount(),
        expenses: faker.finance.amount(),
        investments: faker.finance.amount(),
        balance: faker.finance.amount(),
    }
    const user = {
        first_name: faker.person.firstName(),
        last_name: faker.person.lastName(),
        email: faker.internet.email(),
        password: faker.internet.password({ length: 7 }),
    }

    class GetUserBalanceRepositoryStub {
        async execute(userId) {
            return { ...user, id: userId }
        }
    }

    class GetUserByIdRepositoryStub {
        async execute() {
            return userBalance
        }
    }

    const makeSut = () => {
        const getUserBalanceRepositoryStub = new GetUserBalanceRepositoryStub()
        const getUserByIdRepositoryStub = new GetUserByIdRepositoryStub()
        const sut = new GetUserBalanceUseCase(
            getUserBalanceRepositoryStub,
            getUserByIdRepositoryStub,
        )
        return {
            sut,
            getUserBalanceRepositoryStub,
            getUserByIdRepositoryStub,
        }
    }

    it('should return user balance', async () => {
        const { sut } = makeSut()
        const balance = await sut.execute(faker.string.uuid())
        expect(balance).toBeTruthy()
    })

    it('should throws UserNotFoundError if GetUserByIdRepository throws', async () => {
        const { sut, getUserByIdRepositoryStub } = makeSut()
        jest.spyOn(getUserByIdRepositoryStub, 'execute').mockImplementationOnce(
            () => {
                new UserNotFoundError(faker.string.uuid())
            },
        )
        const promise = sut.execute(faker.string.uuid())

        await expect(promise).rejects.toThrow()
    })
    it('should throws Error if GetUserBalanceRepository throws', async () => {
        const { sut, getUserBalanceRepositoryStub } = makeSut()
        jest.spyOn(
            getUserBalanceRepositoryStub,
            'execute',
        ).mockImplementationOnce(() => {
            throw new Error()
        })
        const promise = sut.execute(faker.string.uuid())

        await expect(promise).rejects.toThrow()
    })

    it('should call GetuserBalanceRepository with correct params', async () => {
        const { sut, getUserBalanceRepositoryStub } = makeSut()
        const executeSpy = jest.spyOn(getUserBalanceRepositoryStub, 'execute')
        const userId = faker.string.uuid()

        await sut.execute(userId)

        expect(executeSpy).toHaveBeenCalledWith(userId)
    })
})
