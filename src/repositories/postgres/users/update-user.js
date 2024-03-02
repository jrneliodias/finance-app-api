import { prisma } from '../../../../prisma/prisma.js'

export class PostgresUpdateUserRepository {
    async execute(userId, updateUserParams) {
        try {
            const updateUser = await prisma.user.update({
                where: {
                    id: userId,
                },
                data: updateUserParams,
            })
            return updateUser
        } catch (error) {
            console.error(error)
        }
    }
}
