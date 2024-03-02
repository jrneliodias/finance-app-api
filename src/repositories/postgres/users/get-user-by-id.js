import { prisma } from '../../../../prisma/prisma.js'

export class PostgresGetUserByIdRepository {
    async execute(userId) {
        try {
            const user = await prisma.user.findUnique({
                where: {
                    id: userId,
                },
            })
            return user
        } catch (error) {
            return null
        }
    }
}
