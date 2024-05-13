import { prisma } from '../../../../prisma/prisma'
import { user } from '../../../tests'
import { PostgresDeleteUserRepository } from './delete-user'

describe('DeleteUserRepository', () => {
    const makeSut = () => {
        const sut = new PostgresDeleteUserRepository()
        return { sut }
    }

    it('should sucessfully delete an user', async () => {
        // arrange

        await prisma.user.create({
            data: user,
        })

        const { sut } = makeSut()

        const result = await sut.execute(user.id)

        expect(result).toStrictEqual(user)
    })
})
