import axios from 'axios'
import { backendUrl } from '../config/config'

axios.defaults.baseURL = backendUrl
axios.defaults.withCredentials = true

export function loadUserAPI(data: number) {
    return axios.get(`/user/${data}`).then((response) => response.data)
}

export function loadMyInfoAPI() {
    return axios.get('/user').then((response) => response.data)
}

/*
 * 아이디, 닉네임, 비밀번호 수정
 */
export function changeEmailAPI(data: string) {
    return axios.patch('/user/email', { nickname: data }).then((response) => response.data)
}

export function changeNicknameAPI(data: string) {
    return axios.patch('/user/nickname', { nickname: data }).then((response) => response.data)
}

export function changePasswordAPI(data: string) {
    return axios.patch('/user/password', { nickname: data }).then((response) => response.data)
}
