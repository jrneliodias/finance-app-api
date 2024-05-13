import { EmailAlreadyInUseError } from '../../errors/user'
import { CreateUserUseCase } from './create-user'
import { user as fixtureUser } from '../../tests'
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
    ...fixtureUser,
    id: undefined,
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
    it('should call PasswordHasherAdpater to  hash the password', async () => {
        const { sut, passwordHasherAdpater, createUserRepository } = makeSut()
        const passwordHasherAdpaterSpy = jest.spyOn(
            passwordHasherAdpater,
            'hash',
        )
        const createUserRepositorySpy = jest.spyOn(
            createUserRepository,
            'execute',
        )

        await sut.execute(user)

        expect(passwordHasherAdpaterSpy).toHaveBeenCalledWith(user.password)
        expect(createUserRepositorySpy).toHaveBeenCalledWith({
            ...user,
            id: 'generated_id',
            password: 'hashed_password',
        })
    })

    it('should throw if GetUserByEmailRepository throws', async () => {
        const { sut, getUserByEmailRepository } = makeSut()
        jest.spyOn(getUserByEmailRepository, 'execute').mockRejectedValueOnce(
            new Error(),
        )

        const promise = sut.execute(user)

        await expect(promise).rejects.toThrow()
    })

    it('should throw if IdGeneratorAdapter throws', async () => {
        const { sut, idGeneratorAdapter } = makeSut()
        jest.spyOn(idGeneratorAdapter, 'execute').mockImplementationOnce(() => {
            throw new Error()
        })

        const promise = sut.execute(user)

        await expect(promise).rejects.toThrow()
    })
    it('should throw if PasswordHasherAdpater throws', async () => {
        const { sut, passwordHasherAdpater } = makeSut()
        jest.spyOn(passwordHasherAdpater, 'hash').mockImplementationOnce(() => {
            throw new Error()
        })

        const promise = sut.execute(user)

        await expect(promise).rejects.toThrow()
    })
    it('should throw if CreateUserRepository throws', async () => {
        const { sut, createUserRepository } = makeSut()
        jest.spyOn(createUserRepository, 'execute').mockImplementationOnce(
            () => {
                throw new Error()
            },
        )

        const promise = sut.execute(user)

        await expect(promise).rejects.toThrow()
    })
})
