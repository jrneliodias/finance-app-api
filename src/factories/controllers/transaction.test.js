import {
    CreateTransactionController,
    DeleteTransactionController,
    GetTransactionByUserIdController,
    UpdateTransactionController,
} from '../../controllers/transactions'
import {
    makeCreateTransactionController,
    makeDeleteTransactionController,
    makeGetTransactionByUserIdController,
    makeUpdateTransactionController,
} from './transaction'

describe('Transactions Factories Controller', () => {
    it('should return an instance of CreateTransactionController', () => {
        const factoryCreateTransactionController =
            makeCreateTransactionController()
        expect(factoryCreateTransactionController).toBeInstanceOf(
            CreateTransactionController,
        )
    })

    it('should return an instance of GetTransactionByUserIdController', () => {
        const factoryGetTransactionController =
            makeGetTransactionByUserIdController()
        expect(factoryGetTransactionController).toBeInstanceOf(
            GetTransactionByUserIdController,
        )
    })

    it('should return an instance of UpdateTransactionController', () => {
        const factoryUpdateTransactionController =
            makeUpdateTransactionController()
        expect(factoryUpdateTransactionController).toBeInstanceOf(
            UpdateTransactionController,
        )
    })

    it('should return a instance of DeleteTransactionController', () => {
        const factoryDeleteTransactionController =
            makeDeleteTransactionController()
        expect(factoryDeleteTransactionController).toBeInstanceOf(
            DeleteTransactionController,
        )
    })
})
