import { v4 as uuidv4 } from 'uuid'
import { EmailAlreadyInUseError } from '../../errors/user.js'

export class CreateUserUseCase {
    constructor(getUserByEmail, createUserRepository, passwordHasherAdpater) {
        this.createUserRepository = createUserRepository
        this.getUserByEmail = getUserByEmail
        this.passwordHasherAdpater = passwordHasherAdpater
    }
    async execute(createUserParams) {
        // TODO: verificar se o e-mail já está em uso

        const userWithProvidedEmail = await this.getUserByEmail.execute(
            createUserParams.email,
        )

        if (userWithProvidedEmail) {
            throw new EmailAlreadyInUseError(createUserParams.email)
        }
        // gerar ID do usuário
        const userId = uuidv4()

        // criptografar a senha
        const hashedPassword = await this.passwordHasherAdpater.hash(
            createUserParams.password,
        )

        // inserir o usuário o banco de dados
        const user = {
            ...createUserParams,
            id: userId,
            password: hashedPassword,
        }

        // chamar o repositório
        const createdUser = await this.createUserRepository.execute(user)
        return createdUser
    }
}
