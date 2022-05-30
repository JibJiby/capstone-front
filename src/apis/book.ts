import axios from 'axios'
import { backendUrl } from '../config/config'

axios.defaults.baseURL = backendUrl
axios.defaults.withCredentials = true

export function loadBookList() {
    return axios.get('/book').then((response) => response.data)
}

export function loadOneBookInfo(bookId: string) {
    return axios.get(`/book/${bookId}`).then((response) => response.data)
}

export function loadRandomBookList(seed: number, numStart: number, numEnd: number) {
    return axios
        .get(`/book/random?seed=${seed}&numStart=${numStart}&numEnd=${numEnd}`)
        .then((response) => response.data)
}

export function confirmCheckedBookAPI(isbn: string) {
    return axios.get(`/book/checked?isbn=${isbn}`).then((response) => response.data)
}
