import validator from 'validator'
import { GetUserByIdUseCase } from '../use-cases/get-user-by-id.js'
import { badRequest, ok, serverError } from './helpers.js'

export class GetUserByIdController {
    async execute(httpRequest) {
        const userId = httpRequest.params.userId
        try {
            const isIdValid = validator.isUUID(userId)

            if (!isIdValid) {
                return badRequest({
                    message: 'The provided id is not valid.',
                })
            }

            const getUserByIdUseCase = new GetUserByIdUseCase()
            const user = await getUserByIdUseCase.execute(userId)

            return ok(user)
        } catch (error) {
            console.error(error)
            return serverError()
        }
    }
}
