import bcrypt from 'bcrypt'

export class PasswordHasherAdpater {
    async hash(password) {
        await bcrypt.hash(password, 10)
    }
}
