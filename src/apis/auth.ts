import axios from 'axios'
import { backendUrl } from '../config/config'

axios.defaults.baseURL = backendUrl
axios.defaults.withCredentials = true

/*
 *  로그인, 로그아웃, 회원가입
 */
export function logInAPI(data: { email: string; password: string }) {
    return axios.post('/auth/login', data).then((response) => response.data)
}

export function logOutAPI() {
    return axios.post('/auth/logout').then((response) => response.data)
}

export function signUpAPI(data: { email: string; nickname: string; password: string }) {
    return axios.post('/auth/signup', data).then((response) => response.data)
}
