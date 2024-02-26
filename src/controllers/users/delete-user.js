import validator from 'validator'
import {
    notFound,
    ok,
    serverError,
    invalidIdResponse,
} from '../helpers/index.js'

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

            if (!deleteduser) {
                return notFound()
            }
            return ok(deleteduser)
        } catch (error) {
            console.error(error)
            return serverError()
        }
    }
}
