import axios from 'axios'
import { backendUrl } from '../config/config'

axios.defaults.baseURL = backendUrl
axios.defaults.withCredentials = true

/**
 * 유저 (UPDATE, DELETE)
 *      이메일, 닉네임, 패스워드 UPDATE
 *          + DELETE  ??
 *
 */

export function uploadBestSellerAPI() {
    // TODO: 먼저 csv 파일을 받고 이를 백엔드에 보내기
    return axios.post('/admin/best').then((response) => response.data)
}

export function refreshMLearningAPI() {
    return axios.post('/admin/ml').then((response) => response.data)
}
