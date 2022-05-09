import axios from 'axios'
import { backendUrl } from '../config/config'

axios.defaults.baseURL = backendUrl
axios.defaults.withCredentials = true

export function loadBookList() {
    return axios.get('/book').then((response) => response.data)
}

export function loadOneBookInfo(bookId: number) {
    return axios.get(`/book/${bookId}`).then((response) => response.data)
}
