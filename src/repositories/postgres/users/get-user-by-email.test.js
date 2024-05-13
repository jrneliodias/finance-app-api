import { prisma } from '../../../../prisma/prisma'
import { user as fakeUser } from '../../../tests'
import { PostgresGetUserByEmailRepository } from './get-user-by-email'

describe('GetUserByEmailRepository', () => {
    it('should get user by email', async () => {
        const sut = new PostgresGetUserByEmailRepository()
        await prisma.user.create({
            data: fakeUser,
        })
        const user = await sut.execute(fakeUser.email)

        expect(user).toEqual(fakeUser)
    })
})
