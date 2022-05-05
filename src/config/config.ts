const prod = process.env.NODE_ENV === 'production'

export const backendUrl = prod ? '~~' : 'http://localhost:5000'
