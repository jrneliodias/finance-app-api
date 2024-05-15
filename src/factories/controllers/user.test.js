import {
    CreateUserController,
    DeleteUserController,
    GetUserBalanceController,
    GetUserByIdController,
    UpdateUserController,
} from '../../controllers/users'
import {
    makeCreateUserController,
    makeDeleteUserController,
    makeGetUserBalanceController,
    makeGetUserByIdController,
    makeUpdateUserController,
} from './user'

describe('Users Factories Controller', () => {
    it('should return an instance of CreateUserController', () => {
        const factoryCreateUserController = makeCreateUserController()
        expect(factoryCreateUserController).toBeInstanceOf(CreateUserController)
    })

    it('should return an instance of GetUserByUserIdController', () => {
        const factoryGetUserController = makeGetUserByIdController()
        expect(factoryGetUserController).toBeInstanceOf(GetUserByIdController)
    })

    it('should return an instance of UpdateUserController', () => {
        const factoryUpdateUserController = makeUpdateUserController()
        expect(factoryUpdateUserController).toBeInstanceOf(UpdateUserController)
    })

    it('should return a instance of DeleteUserController', () => {
        const factoryDeleteUserController = makeDeleteUserController()
        expect(factoryDeleteUserController).toBeInstanceOf(DeleteUserController)
    })

    it('should return a instance of GetUserBalanceController', () => {
        const factoryGetUserBalanceController = makeGetUserBalanceController()
        expect(factoryGetUserBalanceController).toBeInstanceOf(
            GetUserBalanceController,
        )
    })
})
