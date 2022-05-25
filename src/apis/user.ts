import axios from 'axios'
import { backendUrl } from '../config/config'

axios.defaults.baseURL = backendUrl
axios.defaults.withCredentials = true

/**
 * 유저 관련
 */
export function getAllUserAPI() {
    // 엔드포인트를 바꿔야 하나?
    return axios.get('/user/all').then((response) => response.data)
}

export function loadUserAPI(data: number) {
    return axios.get(`/user/${data}`).then((response) => response.data)
}

export function loadMyInfoAPI() {
    return axios.get('/user/').then((response) => response.data)
}

/*
 * 아이디, 닉네임, 비밀번호 수정
 */
export function changeEmailAPI(userId: string, newEmail: string) {
    return axios.patch(`/user/${userId}/email`, { email: newEmail }).then((response) => response.data)
}

export function changeNicknameAPI(userId: string, newNickname: string) {
    return axios.patch(`/user/${userId}/nickname`, { nickname: newNickname }).then((response) => response.data)
}

export function changePasswordAPI(userId: string, newPassword: string) {
    return axios.patch(`/user/${userId}/password`, { password: newPassword }).then((response) => response.data)
}

export function deleteUserAPI(userId: string) {
    return axios.delete(`/user/${userId}`).then((response) => response.data)
}

/**
 * 찜하기 ?? 넣어야 하나?
 */
