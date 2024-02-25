import validator from 'validator'
import { badRequest, ok, serverError } from './helpers/http.js'
import { EmailAlreadyInUseError } from '../errors/user.js'
import {
    emailIsAlreadyInUseResponse,
    invalidPasswordResponse,
    invalidIdResponse,
    checkIfPasswordIsValid,
    checkIfEmailIsValid,
} from './helpers/users.js'

export class UpdateUserController {
    constructor(UpdateUserUseCase) {
        this.updateUserUserCase = UpdateUserUseCase
    }
    async execute(httpRequest) {
        try {
            const userId = httpRequest.params.userId

            const isIdValid = validator.isUUID(userId)

            if (!isIdValid) {
                return invalidIdResponse()
            }
            const params = httpRequest.body

            const allowedFields = [
                'first_name',
                'last_name',
                'email',
                'password',
            ]

            const someFieldIsNotAllowed = Object.keys(params).some(
                (field) => !allowedFields.includes(field),
            )

            if (someFieldIsNotAllowed) {
                return badRequest({
                    message: 'Some provided field is not allowed.',
                })
            }

            if (params.password) {
                const passwordIsValid = checkIfPasswordIsValid(params.password)

                if (!passwordIsValid) {
                    return invalidPasswordResponse()
                }
            }

            if (params.email) {
                const emailIsValid = checkIfEmailIsValid(params.email)

                if (!emailIsValid) {
                    return emailIsAlreadyInUseResponse()
                }
            }

            const updateUser = await this.updateUserUserCase.execute(
                userId,
                params,
            )

            return ok(updateUser)
        } catch (error) {
            console.error(error)
            if (error instanceof EmailAlreadyInUseError) {
                return badRequest({ message: error.message })
            }
            return serverError()
        }
    }
}
