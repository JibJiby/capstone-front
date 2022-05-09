const prod = process.env.NODE_ENV === 'production'

export const backendUrl = prod ? 'https://api.bookcommend.net' : 'http://localhost:5000'
