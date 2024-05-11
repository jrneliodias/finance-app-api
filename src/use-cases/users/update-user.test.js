import { faker } from '@faker-js/faker'
import { UpdateUserUseCase } from './update-user'

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

    it('should update user sucessfully (with password and email)', async () => {
        const { sut } = makeSut()
        const updatedEmail = faker.internet.email()

        const updatedUser = await sut.execute(user.id, {
            email: updatedEmail,
        })

        expect(updatedUser).toEqual({ ...user, email: updatedEmail })
    })
})
