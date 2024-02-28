import validator from 'validator'
import {
    notFound,
    ok,
    serverError,
    invalidIdResponse,
} from '../helpers/index.js'

export class DeleteTransactionController {
    constructor(DeleteTransactionUseCase) {
        this.deleteTransactionUseCase = DeleteTransactionUseCase
    }
    async execute(httpRequest) {
        try {
            const transactionId = httpRequest.params.transactionId
            const isIdValid = validator.isUUID(transactionId)

            if (!isIdValid) {
                return invalidIdResponse()
            }

            const deletedTransaction =
                await this.deleteTransactionUseCase.execute(transactionId)

            if (!deletedTransaction) {
                return notFound()
            }
            return ok(deletedTransaction)
        } catch (error) {
            console.error(error)
            return serverError()
        }
    }
}
