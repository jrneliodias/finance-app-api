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
})
