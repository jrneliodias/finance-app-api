import { prisma } from '../../../../prisma/prisma'
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
        expect(newUser.id).toBe(user.id)
        expect(newUser.email).toBe(user.email)
        expect(newUser.first_name).toBe(user.first_name)
        expect(newUser.last_name).toBe(user.last_name)
    })

    it('should call Prisma with correct params', async () => {
        const { sut } = makeSut()
        const prismaSpy = jest.spyOn(prisma.user, 'create')
        await sut.execute(user)

        expect(prismaSpy).toHaveBeenCalledWith({ data: user })
    })
})
