import { UserNotFoundError } from '../../errors/user.js'
import { ok, serverError } from '../helpers/http.js'
import { userNotFoundResponse } from '../helpers/users.js'
import {
    checkIfIdIsValid,
    invalidIdResponse,
    requiredFieldIsMissingResponse,
} from '../helpers/validations.js'

export class GetTransactionByUserIdController {
    constructor(getTransactionByUserIdUseCase) {
        this.getTransactionByUserIdUseCase = getTransactionByUserIdUseCase
    }
    async execute(httpRequest) {
        try {
            const user_id = httpRequest.query.user_id
            if (!user_id) {
                return requiredFieldIsMissingResponse(user_id)
            }

            const userIdisValid = checkIfIdIsValid(user_id)

            if (!userIdisValid) {
                return invalidIdResponse()
            }

            const transactions =
                await this.getTransactionByUserIdUseCase.execute({
                    user_id,
                })

            return ok(transactions)
        } catch (error) {
            if (error instanceof UserNotFoundError) {
                return userNotFoundResponse()
            }

            console.log(error)
            return serverError()
        }
    }
}
