import { CreateUserController } from './create-user.js'

describe('Create User Controller', () => {
    class CreateUserCaseStub {
        execute(user) {
            return user
        }
    }
    it('should create an user', async () => {
        const createUserController = new CreateUserController(
            new CreateUserCaseStub(),
        )

        // act
        const httpRequest = {
            body: {
                first_name: 'Nelio',
                last_name: 'Dias',
                email: 'nelio@mail.com',
                password: '123456',
            },
        }

        const result = await createUserController.execute(httpRequest)

        // assert
        expect(result.statusCode).toBe(201)
        expect(result.body).not.toBeUndefined()
    })
    it('should return 400 if first_name is not provided', async () => {
        const createUserUseCase = new CreateUserCaseStub()
        const createUserController = new CreateUserController(createUserUseCase)

        // act
        const httpRequest = {
            body: {
                last_name: 'Dias',
                email: 'nelio@mail.com',
                password: '123456',
            },
        }

        const result = await createUserController.execute(httpRequest)

        // assert
        expect(result.statusCode).toBe(400)
        expect(result.body).not.toBeUndefined()
    })

    it('should return 400 if password is less tha chacteres', async () => {
        const createUserUseCase = new CreateUserCaseStub()
        const createUserController = new CreateUserController(createUserUseCase)

        // act
        const httpRequest = {
            body: {
                last_name: 'Dias',
                email: 'nelio@mail.com',
                password: '123',
            },
        }

        const result = await createUserController.execute(httpRequest)

        // assert
        expect(result.statusCode).toBe(400)
        expect(result.body).not.toBeUndefined()
    })
})
