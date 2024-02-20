import { GetUserByIdUseCase } from '../use-cases/get-user-by-id.js'
import { serverError } from './helpers.js'

export class GetUserByIdController {
    async execute(httpRequest) {
        try {
            const getUserByIdUseCase = new GetUserByIdUseCase()
            const user = await getUserByIdUseCase.execute(
                httpRequest.params.userId,
            )

            return {
                statusCode: 200,
                body: user,
            }
        } catch (error) {
            console.error(error)
            return serverError()
        }
    }
}
