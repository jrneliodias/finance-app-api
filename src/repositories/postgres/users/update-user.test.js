import { faker } from '@faker-js/faker'
import { prisma } from '../../../../prisma/prisma'
import { user as fakeUser } from '../../../tests'
import { PostgresUpdateUserRepository } from './update-user'

describe('PostgresUpdateUserRepository', () => {
    const updateUser = {
        id: faker.string.uuid(),
        first_name: faker.person.firstName(),
        last_name: faker.person.lastName(),
        email: faker.internet.email(),
        password: faker.internet.password({ length: 7 }),
    }

    it('should update user sucessfully', async () => {
        const user = await prisma.user.create({ data: fakeUser })

        const sut = new PostgresUpdateUserRepository()

        const updatedUser = await sut.execute(user.id, updateUser)

        expect(updatedUser).toStrictEqual(updateUser)
    })

    it('should call Prisma with correct params', async () => {
        const user = await prisma.user.create({ data: fakeUser })

        const sut = new PostgresUpdateUserRepository()

        const prismaSpy = jest.spyOn(prisma.user, 'update')

        await sut.execute(user.id, updateUser)

        expect(prismaSpy).toHaveBeenCalledWith({
            where: {
                id: user.id,
            },
            data: {
                ...updateUser,
            },
        })
    })
})
