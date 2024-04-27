import { EmailAlreadyInUseError } from '../../errors/user.js'

export class CreateUserUseCase {
    constructor(
        getUserByEmail,
        createUserRepository,
        passwordHasherAdpater,
        idGeneratorAdapter,
    ) {
        this.createUserRepository = createUserRepository
        this.getUserByEmail = getUserByEmail
        this.passwordHasherAdpater = passwordHasherAdpater
        this.idGeneratorAdapter = idGeneratorAdapter
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
        const userId = this.idGeneratorAdapter.execute()

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
