import { CreateUserUseCase } from '../use-cases/create-users.js'
import validator from 'validator'
import { badRequest, created, serveError } from './helpers.js'

export class CreateUserController {
    async execute(httpRequest) {
        try {
            const params = httpRequest.body
            const requiredFields = [
                'first_name',
                'last_name',
                'email',
                'password',
            ]

            for (const field of requiredFields) {
                if (!params[field] || params[field].trim().length === 0) {
                    return badRequest({ message: `Missing param: ${field}` })
                }
            }

            const passwordNotValid = params.password.length < 6

            if (passwordNotValid) {
                return badRequest({
                    message: 'Password must be at least 6 characters',
                })
            }

            const emailIsValid = validator.isEmail(params.email)

            if (!emailIsValid) {
                return badRequest({
                    message: 'Invalid Email. Please provide a valid one.',
                })
            }

            const createUserCase = new CreateUserUseCase()
            const createdUser = await createUserCase.execute(params)

            return created(createdUser)
        } catch (error) {
            console.log(error)

            return serveError()
        }
    }
}
