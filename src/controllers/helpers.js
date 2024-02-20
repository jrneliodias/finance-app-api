export const badRequest = (body) => {
    return {
        statusCode: 400,
        body,
    }
}

export const created = (body) => {
    return {
        statusCode: 201,
        body,
    }
}
export const serverError = () => {
    return {
        statusCode: 500,
        body: {
            errorMessage: 'Internal server error.',
        },
    }
}
export const ok = (body) => {
    return {
        statusCode: 200,
        body,
    }
}
