import { EmailAlreadyInUseError } from '../../errors/user.js'

export class UpdateUserUseCase {
    constructor(
        getUserByEmailRepository,
        updateUserRepository,
        passwordHasherAdpater,
    ) {
        this.postgresGetUserByEmailRepository = getUserByEmailRepository
        this.postgresUpdateUserRepository = updateUserRepository
        this.passwordHasherAdpater = passwordHasherAdpater
    }
    async execute(userId, updateUserParams) {
        if (updateUserParams.email) {
            const userWithProvidedEmail =
                await this.postgresGetUserByEmailRepository.execute(
                    updateUserParams.email,
                )

            if (userWithProvidedEmail && userWithProvidedEmail.id !== userId) {
                throw new EmailAlreadyInUseError(updateUserParams.email)
            }
        }

        const userDataToUpdate = {
            ...updateUserParams,
        }

        if (updateUserParams.password) {
            // criptografar a senha
            const hashedPassword = await this.passwordHasherAdpater.hash(
                updateUserParams.password,
            )
            userDataToUpdate.password = hashedPassword
        }

        const updateUser = await this.postgresUpdateUserRepository.execute(
            userId,
            userDataToUpdate,
        )

        return updateUser
    }
}
