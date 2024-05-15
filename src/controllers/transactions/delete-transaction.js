import validator from 'validator'
import {
    ok,
    serverError,
    invalidIdResponse,
    transactionNotFoundResponse,
} from '../helpers/index.js'
import { TransactionNotFoundError } from '../../errors/transaction.js'

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

            return ok(deletedTransaction)
        } catch (error) {
            if (error instanceof TransactionNotFoundError) {
                return transactionNotFoundResponse()
            }
            console.error(error)
            return serverError()
        }
    }
}
