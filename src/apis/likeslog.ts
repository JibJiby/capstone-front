import axios from 'axios'
import { backendUrl } from '../config/config'

axios.defaults.baseURL = backendUrl
axios.defaults.withCredentials = true

export function isFirstAPI() {
    // 엔드포인트를 바꿔야 하나?
    return axios.get('/likeslog/isfirst').then((response) => response.data)
}

//
export function toggleLikesAPI(isbn: string) {
    return axios.post('/likeslog/', { isbn }).then((response) => response.data)
}

export function checkFirstBooks(isbnList: Array<{ isbn: string }>) {
    return axios.post('/likeslog/first', isbnList).then((response) => response.data)
}
