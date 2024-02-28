import validator from 'validator'
import { badRequest, notFound } from './http.js'

export const checkIfAmountIsValid = (amount) => {
    if (typeof amount !== 'number') {
        return false
    }
    return validator.isCurrency(amount.toFixed(2).toString(), {
        digits_after_decimal: [2],
        allow_negatives: false,
        decimal_separator: '.',
    })
}

export const invalidAmountResponse = () =>
    badRequest({
        message: 'The amount must be a valid currency.',
    })

export const invalidTypeResponse = () =>
    badRequest({
        message: 'The type must be EARNING, EXPENSE or INVESTMENT.',
    })

export const checkIfTypeIsValid = (type) =>
    ['EARNING', 'EXPENSE', 'INVESTMENT'].includes(type)

export const transactionNotFoundResponse = () => {
    return notFound({ message: 'Transaction not found.' })
}
