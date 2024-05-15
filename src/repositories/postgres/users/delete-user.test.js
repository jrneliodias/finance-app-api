import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import { prisma } from '../../../../prisma/prisma'
import { user } from '../../../tests'
import { PostgresDeleteUserRepository } from './delete-user'
import { UserNotFoundError } from '../../../errors'

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
        await prisma.user.create({
            data: user,
        })
        const prismaSpy = jest.spyOn(prisma.user, 'delete')
        await sut.execute(user.id)

        expect(prismaSpy).toHaveBeenCalledWith({
            where: { id: user.id },
        })
    })

    it('should throws if Prisma throws PrismaClientKnownRequestError', async () => {
        const { sut } = makeSut()
        await prisma.user.create({
            data: user,
        })
        jest.spyOn(prisma.user, 'delete').mockRejectedValueOnce(
            new PrismaClientKnownRequestError('', {
                code: 'P2025',
            }),
        )
        const promise = sut.execute(user.id)
        await expect(promise).rejects.toThrow(new UserNotFoundError(user.id))
    })

    it('should throws if Prisma throws  a generic error ', async () => {
        const { sut } = makeSut()
        await prisma.user.create({
            data: user,
        })
        jest.spyOn(prisma.user, 'delete').mockRejectedValueOnce(new Error())
        const promise = sut.execute(user.id)
        await expect(promise).rejects.toThrow()
    })
})
