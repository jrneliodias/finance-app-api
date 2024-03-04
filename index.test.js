const sum = (a, b) => {
    return a + b
}

describe('sum function', () => {
    it('should sum two numbers correcty', () => {
        const a = 2
        const b = 2

        // act
        const result = sum(a, b)

        //assert
        expect(result).toBe(6)
    })
})
