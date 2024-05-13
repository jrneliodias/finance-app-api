import { prisma } from '../../../../prisma/prisma'
import { user as fakeUser } from '../../../tests'
import { PostgresGetUserByIdRepository } from './get-user-by-id'
describe('GetUserByIdRepository', () => {
    it('should get user by id', async () => {
        const user = await prisma.user.create({
            data: fakeUser,
        })

        const sut = new PostgresGetUserByIdRepository()

        const result = await sut.execute(user.id)
        expect(result).toStrictEqual(fakeUser)
    })

    it('should call Prisma with correct params', async () => {
        const sut = new PostgresGetUserByIdRepository()
        const prismaSpy = jest.spyOn(prisma.user, 'findUnique')
        await sut.execute(fakeUser.id)

        expect(prismaSpy).toHaveBeenCalledWith({
            where: {
                id: fakeUser.id,
            },
        })
    })
})
