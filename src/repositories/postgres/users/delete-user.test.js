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

    it('should call Prisma with correct params', async () => {
        const { sut } = makeSut()
        const prismaSpy = jest.spyOn(prisma.user, 'delete')
        await sut.execute(user.id)

        expect(prismaSpy).toHaveBeenCalledWith({
            where: { id: user.id },
        })
    })
})
