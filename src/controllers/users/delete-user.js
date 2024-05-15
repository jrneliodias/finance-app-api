import validator from 'validator'
import {
    ok,
    serverError,
    invalidIdResponse,
    userNotFoundResponse,
} from '../helpers/index.js'
import { UserNotFoundError } from '../../errors/user.js'

export class DeleteUserController {
    constructor(DeleteUserUseCase) {
        this.deleteUserUseCase = DeleteUserUseCase
    }
    async execute(httpRequest) {
        try {
            const userId = httpRequest.params.userId
            const isIdValid = validator.isUUID(userId)

            if (!isIdValid) {
                return invalidIdResponse()
            }

            const deleteduser = await this.deleteUserUseCase.execute(userId)

            return ok(deleteduser)
        } catch (error) {
            if (error instanceof UserNotFoundError) {
                return userNotFoundResponse(httpRequest.params.userId)
            }
            console.error(error)
            return serverError()
        }
    }
}
