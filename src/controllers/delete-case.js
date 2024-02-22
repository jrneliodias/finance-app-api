import validator from 'validator'
import { notFound, ok, serverError } from './helpers/http.js'
import { invalidIdResponse } from './helpers/users.js'
import { DeleteUserUseCase } from '../use-cases/delete-user.js'

export class DeleteUserController {
    async execute(httpRequest) {
        try {
            const userId = httpRequest.params.userId
            const isIdValid = validator.isUUID(userId)

            if (!isIdValid) {
                return invalidIdResponse()
            }

            const deleteUserUseCase = new DeleteUserUseCase()
            const deleteduser = await deleteUserUseCase.execute(userId)

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
