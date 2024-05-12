import { faker } from '@faker-js/faker'
import { CreateTransactionUseCase } from './create-transaction'

describe('CreateTransactionUseCase', () => {
    const transaction = {
        id: faker.string.uuid(),
        user_id: faker.string.uuid(),
        name: faker.finance.transactionType(),
        date: faker.date.anytime().toISOString(),
        amount: Number(faker.finance.amount()),
        type: faker.helpers.arrayElement(['EXPENSE', 'INVESTMENT', 'EARNING']),
    }

    const user = {
        id: faker.string.uuid(),
        first_name: faker.person.firstName(),
        last_name: faker.person.lastName(),
        email: faker.internet.email(),
        password: faker.internet.password({ length: 7 }),
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
            return transaction.id
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

        const result = await sut.execute(transaction)

        expect(result).toEqual(transaction)
    })
})
