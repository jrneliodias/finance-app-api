import { faker } from '@faker-js/faker'
import { UpdateUserUseCase } from './update-user'
import { EmailAlreadyInUseError } from '../../errors/user'

describe('UpdateUserUseCase', () => {
    const user = {
        id: faker.string.uuid(),
        first_name: faker.person.firstName(),
        last_name: faker.person.lastName(),
        email: faker.internet.email(),
        password: faker.internet.password({ length: 7 }),
    }
    class PostgresGetUserByEmailStub {
        async execute() {
            return null
        }
    }

    class PostgresUpdateUserRepositoryStub {
        async execute(userId, updateUserParams) {
            return { ...user, ...updateUserParams }
        }
    }

    class PasswordHasherAdpaterStub {
        async hash() {
            return 'hashed_password'
        }
    }

    const makeSut = () => {
        const getUserByEmailRepositoryStub = new PostgresGetUserByEmailStub()
        const updateUserRepositoryStub = new PostgresUpdateUserRepositoryStub()
        const passwordHasherAdpaterStub = new PasswordHasherAdpaterStub()
        const sut = new UpdateUserUseCase(
            getUserByEmailRepositoryStub,
            updateUserRepositoryStub,
            passwordHasherAdpaterStub,
        )
        return {
            sut,
            getUserByEmailRepositoryStub,
            updateUserRepositoryStub,
            passwordHasherAdpaterStub,
        }
    }
    it('should update user sucessfully (without password and email)', async () => {
        const { sut } = makeSut()

        const updatedUser = await sut.execute(user.id, {
            first_name: user.first_name,
            last_name: user.last_name,
        })

        expect(updatedUser).toEqual(user)
    })

    it('should update user sucessfully with email', async () => {
        const { sut } = makeSut()
        const updatedEmail = faker.internet.email()

        const updatedUser = await sut.execute(user.id, {
            email: updatedEmail,
        })

        expect(updatedUser).toEqual({ ...user, email: updatedEmail })
    })

    it('should call PostgresGetUserByEmailRepository with correct params', async () => {
        const { sut, getUserByEmailRepositoryStub } = makeSut()
        const updatedEmail = faker.internet.email()
        const getUserByEmailRepositorySpy = jest.spyOn(
            getUserByEmailRepositoryStub,
            'execute',
        )

        await sut.execute(user.id, {
            email: updatedEmail,
        })

        expect(getUserByEmailRepositorySpy).toHaveBeenCalledWith(updatedEmail)
    })

    it('should update user sucessfully with password', async () => {
        const { sut, passwordHasherAdpaterStub } = makeSut()
        const updatedPassword = await passwordHasherAdpaterStub.hash()

        const updatedUser = await sut.execute(user.id, {
            password: updatedPassword,
        })

        expect(updatedUser).toEqual({ ...user, password: updatedPassword })
    })

    it('should call PasswordHasherAdapter with correct params', async () => {
        const { sut, passwordHasherAdpaterStub } = makeSut()
        const updatedPassword = faker.internet.password()
        const getUserByEmailRepositorySpy = jest.spyOn(
            passwordHasherAdpaterStub,
            'hash',
        )

        await sut.execute(user.id, {
            password: updatedPassword,
        })

        expect(getUserByEmailRepositorySpy).toHaveBeenCalledWith(
            updatedPassword,
        )
    })

    it('should throw if PostgresGetUserByEmailRepository throws', async () => {
        const { sut, getUserByEmailRepositoryStub } = makeSut()
        jest.spyOn(getUserByEmailRepositoryStub, 'execute').mockResolvedValue(
            user,
        )
        const promise = sut.execute(faker.string.uuid(), {
            email: user.email,
        })

        await expect(promise).rejects.toThrow(
            new EmailAlreadyInUseError(user.email),
        )
    })

    it('should call PostgresUpdateUserRepository with correct params', async () => {
        const { sut, updateUserRepositoryStub } = makeSut()
        const updateUserRepositorySpy = jest.spyOn(
            updateUserRepositoryStub,
            'execute',
        )

        await sut.execute(user.id, user)

        expect(updateUserRepositorySpy).toHaveBeenCalledWith(user.id, {
            ...user,
            password: 'hashed_password',
        })
    })

    it('should throw if PasswordHasherAdpater throws', async () => {
        const { sut, passwordHasherAdpaterStub } = makeSut()
        jest.spyOn(passwordHasherAdpaterStub, 'hash').mockRejectedValue(
            new Error(),
        )

        const promise = sut.execute(user.id, {
            password: user.password,
        })

        await expect(promise).rejects.toThrow()
    })
})
