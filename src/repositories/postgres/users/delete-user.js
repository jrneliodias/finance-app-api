import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import { prisma } from '../../../../prisma/prisma.js'
import { UserNotFoundError } from '../../../errors/user.js'

export class PostgresDeleteUserRepository {
    async execute(userId) {
        try {
            const deletedUser = await prisma.user.delete({
                where: {
                    id: userId,
                },
            })
            return deletedUser
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code === 'P2025') {
                    //"An operation failed because it depends on one or more records that were required but not found. {cause}"
                    throw new UserNotFoundError(userId)
                }
            }
            throw error
        }
    }
}
