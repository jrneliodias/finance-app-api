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
            const userId = httpRequest.query.user_id

            if (!userId) {
                return requiredFieldIsMissingResponse(userId)
            }

            const userIdisValid = checkIfIdIsValid(userId)

            if (!userIdisValid) {
                return invalidIdResponse()
            }

            const transactions =
                await this.getTransactionByUserIdUseCase.execute({
                    userId,
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
