import validator from 'validator'
import { badRequest, ok, serverError } from '../helpers/http.js'
import { invalidIdResponse } from '../helpers/validations.js'
import { updateTransactionSchema } from '../../schemas/transaction.js'
import { ZodError } from 'zod'

export class UpdateTransactionController {
    constructor(updateTransactionUseCase) {
        this.updateTransactionUseCase = updateTransactionUseCase
    }

    async execute(httpRequest) {
        try {
            const transactionId = httpRequest.params.transactionId

            const isIdValid = validator.isUUID(transactionId)

            if (!isIdValid) {
                return invalidIdResponse()
            }
            const params = httpRequest.body

            await updateTransactionSchema.parseAsync(params)

            const transaction = await this.updateTransactionUseCase.execute(
                transactionId,
                params,
            )

            return ok(transaction)
        } catch (error) {
            if (error instanceof ZodError) {
                return badRequest({
                    message: error.errors[0].message,
                })
            }
            console.error(error)
            return serverError()
        }
    }
}
