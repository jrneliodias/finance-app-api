import { EmailAlreadyInUseError } from '../../errors/user'
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

const user = {
    first_name: faker.person.firstName(),
    last_name: faker.person.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password({ length: 7 }),
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

        const createdUser = await sut.execute(user)

        //assert
        expect(createdUser).toBeTruthy()
    })

    it('should throw  an EmailAlreadyInUseError if getUserByEmailRepository return a user', async () => {
        const { sut, getUserByEmailRepository } = makeSut()

        jest.spyOn(getUserByEmailRepository, 'execute').mockReturnValueOnce(
            user,
        )

        const promise = sut.execute(user)

        await expect(promise).rejects.toThrow(
            new EmailAlreadyInUseError(user.email),
        )
    })

    it('should call IdGeneratorAdapter to generate a random id', async () => {
        const { sut, idGeneratorAdapter, createUserRepository } = makeSut()
        const idGeneratorAdapterSpy = jest.spyOn(idGeneratorAdapter, 'execute')
        const createUserRepositorySpy = jest.spyOn(
            createUserRepository,
            'execute',
        )

        await sut.execute(user)

        expect(idGeneratorAdapterSpy).toHaveBeenCalled()
        expect(createUserRepositorySpy).toHaveBeenCalledWith({
            ...user,
            id: 'generated_id',
            password: 'hashed_password',
        })
    })
})
