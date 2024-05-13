import { transaction } from '../../tests'
import { DeleteTransactionUseCase } from './delete-transaction'

describe('DeleteTransactionUseCase', () => {
    class PostgresDeleteTransactionRepositoryStub {
        async execute(transactionId) {
            return { ...transaction, id: transactionId }
        }
    }

    const makeSut = () => {
        const deleteTransactionRepositoryStub =
            new PostgresDeleteTransactionRepositoryStub()
        const sut = new DeleteTransactionUseCase(
            deleteTransactionRepositoryStub,
        )
        return { sut, deleteTransactionRepositoryStub }
    }
    it('should DeleteTransactionUseCase return deleted transaction', async () => {
        const transactionId = transaction.id

        const { sut } = makeSut()

        const result = await sut.execute(transactionId)

        expect(result).toEqual(transaction)
    })

    it('should throw if DeleteTransactionUseCase throws', async () => {
        const { sut, deleteTransactionRepositoryStub } = makeSut()
        jest.spyOn(
            deleteTransactionRepositoryStub,
            'execute',
        ).mockImplementationOnce(() => {
            throw new Error()
        })

        const promise = sut.execute(transaction.id)

        await expect(promise).rejects.toThrow()
    })

    it('should call DeleteTransactionUseCase with correct params', async () => {
        const { sut, deleteTransactionRepositoryStub } = makeSut()
        const deleteTransactionRepositorySpy = jest.spyOn(
            deleteTransactionRepositoryStub,
            'execute',
        )

        await sut.execute(transaction.id)

        expect(deleteTransactionRepositorySpy).toHaveBeenCalledWith(
            transaction.id,
        )
    })
})
