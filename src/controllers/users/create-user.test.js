import { EmailAlreadyInUseError } from '../../errors/user.js'
import { CreateUserController } from './create-user.js'
import { faker } from '@faker-js/faker'

describe('Create User Controller', () => {
    class CreateUserCaseStub {
        execute(user) {
            return user
        }
    }

    const makeSut = () => {
        const createUserUseCase = new CreateUserCaseStub()
        const sut = new CreateUserController(createUserUseCase)
        return { createUserUseCase, sut }
    }
    const httpRequest = {
        body: {
            first_name: faker.person.firstName(),
            last_name: faker.person.lastName(),
            email: faker.internet.email(),
            password: faker.internet.password({ length: 10 }),
        },
    }

    it('should return 201 when creating an user successfully', async () => {
        const { sut } = makeSut()
        // act

        const result = await sut.execute(httpRequest)

        // assert
        expect(result.statusCode).toBe(201)
        expect(result.body).not.toBeUndefined()
    })
    it('should return 400 if first_name is not provided', async () => {
        const { sut } = makeSut()
        // act

        const result = await sut.execute({
            body: {
                ...httpRequest,
                first_name: undefined,
            },
        })

        // assert
        expect(result.statusCode).toBe(400)
        expect(result.body).not.toBeUndefined()
    })
    it('should return 400 if email is not provided', async () => {
        const { sut } = makeSut()
        // act

        const result = await sut.execute({
            body: {
                ...httpRequest,
                email: undefined,
            },
        })

        // assert
        expect(result.statusCode).toBe(400)
        expect(result.body).not.toBeUndefined()
    })
    it('should return 400 if email is not valid', async () => {
        const { sut } = makeSut()
        // act

        const result = await sut.execute({
            body: {
                ...httpRequest,
                email: 'invalid_email',
            },
        })

        // assert
        expect(result.statusCode).toBe(400)
        expect(result.body).not.toBeUndefined()
    })

    it('should return 400 if password is not provided', async () => {
        const { sut } = makeSut()
        // act

        const result = await sut.execute({
            body: {
                ...httpRequest,
                password: undefined,
            },
        })

        // assert
        expect(result.statusCode).toBe(400)
        expect(result.body).not.toBeUndefined()
    })
    it('should return 400 if password is less than 6 chacteres', async () => {
        const { sut } = makeSut()
        // act

        const result = await sut.execute({
            body: {
                ...httpRequest,
                password: faker.internet.password({ length: 1 }),
            },
        })

        // assert
        expect(result.statusCode).toBe(400)
        expect(result.body).not.toBeUndefined()
    })

    it('should call CreateUserUseCase with correct params', async () => {
        //arrange
        const { sut, createUserUseCase } = makeSut()
        const executeSpy = jest.spyOn(createUserUseCase, 'execute')

        // act
        await sut.execute(httpRequest)

        // assert
        expect(executeSpy).toHaveBeenCalledWith(httpRequest.body)
        expect(executeSpy).toHaveBeenCalledTimes(1)
    })

    it('should return 500 if CreateUseCase throws', async () => {
        const { sut, createUserUseCase } = makeSut()
        // act

        jest.spyOn(createUserUseCase, 'execute').mockImplementationOnce(() => {
            throw new Error()
        })

        const result = await sut.execute(httpRequest)

        // assert
        expect(result.statusCode).toBe(500)
    })

    it('should return 300 if CreateUseCase throws EmailAlreadyUseError', async () => {
        const { sut, createUserUseCase } = makeSut()

        // act

        jest.spyOn(createUserUseCase, 'execute').mockImplementationOnce(() => {
            throw new EmailAlreadyInUseError(httpRequest.body.email)
        })

        const result = await sut.execute(httpRequest)

        // assert
        expect(result.statusCode).toBe(400)
    })
})
