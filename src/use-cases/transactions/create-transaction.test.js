import { CreateTransactionUseCase } from './create-transaction'
import { transaction, user } from '../../tests'

describe('CreateTransactionUseCase', () => {
    const createTransactionParams = {
        ...transaction,
        id: undefined,
    }

    class CreateTransactionRepositoryStub {
        async execute(transaction) {
            return transaction
        }
    }

    class GetUserByIdRepositoryStub {
        async execute() {
            return user
        }
    }
    class IdGeneratorAdapterStub {
        execute() {
            return 'generated_id'
        }
    }

    const makeSut = () => {
        const createTransactionRepositoryStub =
            new CreateTransactionRepositoryStub()
        const getUserByIdRepositoryStub = new GetUserByIdRepositoryStub()
        const idGeneratorAdapterStub = new IdGeneratorAdapterStub()
        const sut = new CreateTransactionUseCase(
            createTransactionRepositoryStub,
            getUserByIdRepositoryStub,
            idGeneratorAdapterStub,
        )
        return {
            sut,
            createTransactionRepositoryStub,
            getUserByIdRepositoryStub,
            idGeneratorAdapterStub,
        }
    }

    it('should create a transaction', async () => {
        const { sut } = makeSut()

        const result = await sut.execute(createTransactionParams)

        expect(result).toEqual({ ...transaction, id: 'generated_id' })
    })

    it('should throw if CreateTransactionRepository throws', async () => {
        const { sut, createTransactionRepositoryStub } = makeSut()
        jest.spyOn(
            createTransactionRepositoryStub,
            'execute',
        ).mockRejectedValueOnce(new Error())
        const promise = sut.execute(transaction)
        await expect(promise).rejects.toThrow()
    })

    it("should throw UserNotFoundError if user doesn't exists", async () => {
        const { sut, getUserByIdRepositoryStub } = makeSut()
        jest.spyOn(getUserByIdRepositoryStub, 'execute').mockResolvedValueOnce(
            null,
        )
        const promise = sut.execute(createTransactionParams)
        await expect(promise).rejects.toThrow()
    })

    it('should call GetUserByIdRepository with correct params', async () => {
        const { sut, getUserByIdRepositoryStub } = makeSut()
        const getUserByIdRepositorySpy = jest.spyOn(
            getUserByIdRepositoryStub,
            'execute',
        )
        await sut.execute(createTransactionParams)
        expect(getUserByIdRepositorySpy).toHaveBeenCalledWith(
            createTransactionParams.user_id,
        )
    })

    it('should call IdGeneratorAdapter with correct params', async () => {
        const { sut, idGeneratorAdapterStub } = makeSut()
        const idGeneratorAdapterSpy = jest.spyOn(
            idGeneratorAdapterStub,
            'execute',
        )
        await sut.execute(createTransactionParams)
        expect(idGeneratorAdapterSpy).toHaveBeenCalled()
    })

    it('should call CreateTransactionRepository with correct params', async () => {
        const { sut, createTransactionRepositoryStub } = makeSut()
        const createTransactionRepositorySpy = jest.spyOn(
            createTransactionRepositoryStub,
            'execute',
        )
        await sut.execute(createTransactionParams)
        expect(createTransactionRepositorySpy).toHaveBeenCalledWith({
            ...createTransactionParams,
            id: 'generated_id',
        })
    })
})
