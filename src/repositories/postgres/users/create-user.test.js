import { user } from '../../../tests'
import { PostgresCreateUserRepository } from './create-user'

describe('CreateUserRepository', () => {
    const makeSut = () => {
        const sut = new PostgresCreateUserRepository()
        return { sut }
    }
    it('should sucessfully create a user', async () => {
        const { sut } = makeSut()

        const newUser = await sut.execute(user)

        expect(newUser).toBeTruthy()
    })
})
