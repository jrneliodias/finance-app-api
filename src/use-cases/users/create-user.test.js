import { CreateUserUseCase } from './create-user'
import { faker } from '@faker-js/faker'

class GetUserByEmailRepositoryStub {
    async execute() {
        return null
    }
}

class CreateUserRepositoryStub {
    async execute(user) {
        return user
    }
}
class PasswordHasherAdpaterStub {
    async hash() {
        return 'hashed_password'
    }
}
class IdGeneratorAdapterStub {
    async execute() {
        return 'generated_id'
    }
}

describe('Create User Use Case', () => {
    const getUserByEmailRepository = new GetUserByEmailRepositoryStub()
    const createUserRepository = new CreateUserRepositoryStub()
    const passwordHasherAdpater = new PasswordHasherAdpaterStub()
    const idGeneratorAdapter = new IdGeneratorAdapterStub()

    const makeSut = () => {
        const sut = new CreateUserUseCase(
            getUserByEmailRepository,
            createUserRepository,
            passwordHasherAdpater,
            idGeneratorAdapter,
        )

        return {
            sut,
            getUserByEmailRepository,
            createUserRepository,
            passwordHasherAdpater,
            idGeneratorAdapter,
        }
    }

    it('should sucessfully create a user', async () => {
        const { sut } = makeSut()

        const createdUser = await sut.execute({
            first_name: faker.person.firstName(),
            last_name: faker.person.lastName(),
            email: faker.internet.email(),
            password: faker.internet.password({ length: 7 }),
        })

        //assert
        expect(createdUser).toBeTruthy()
    })
})
