import validator from 'validator'
import { EmailAlreadyInUseError } from '../../errors/user.js'
import {
    badRequest,
    ok,
    serverError,
    invalidIdResponse,
} from '../helpers/index.js'
import { updateUserSchema } from '../../../schemas/user.js'
import { ZodError } from 'zod'

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

            await updateUserSchema.parseAsync(params)

            const updateUser = await this.updateUserUserCase.execute(
                userId,
                params,
            )

            return ok(updateUser)
        } catch (error) {
            console.error(error)
            if (error instanceof ZodError) {
                return badRequest({ message: error.errors[0].message })
            }
            if (error instanceof EmailAlreadyInUseError) {
                return badRequest({ message: error.message })
            }
            return serverError()
        }
    }
}
