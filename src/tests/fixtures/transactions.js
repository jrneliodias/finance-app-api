import { faker } from '@faker-js/faker'

export const transaction = {
    id: faker.string.uuid(),
    user_id: faker.string.uuid(),
    name: faker.finance.transactionType(),
    date: faker.date.anytime().toISOString(),
    amount: Number(faker.finance.amount()),
    type: faker.helpers.arrayElement(['EXPENSE', 'INVESTMENT', 'EARNING']),
}
