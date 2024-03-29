import validator from 'validator'

import {
    notFound,
    ok,
    serverError,
    invalidIdResponse,
} from '../helpers/index.js'

export class GetUserByIdController {
    constructor(getUserByIdUseCase) {
        this.getUserByIdUseCase = getUserByIdUseCase
    }

    async execute(httpRequest) {
        const userId = httpRequest.params.userId
        try {
            const isIdValid = validator.isUUID(userId)

            if (!isIdValid) {
                return invalidIdResponse()
            }

            const user = await this.getUserByIdUseCase.execute(userId)

            if (!user) {
                return notFound({ message: 'User not found.' })
            }

            return ok(user)
        } catch (error) {
            console.error(error)
            return serverError()
        }
    }
}
