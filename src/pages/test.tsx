import { logInAPI, logOutAPI } from '@apis/auth'
import { loadMyInfoAPI } from '@apis/user'
import { AxiosError } from 'axios'
import { useCallback, useState } from 'react'
import { useMutation, useQuery, useQueryClient } from 'react-query'

const TestPage = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const queryClient = useQueryClient()
    const { data: me, isLoading: isLoadingMyInfo } = useQuery('user', loadMyInfoAPI, {
        // 유효 기한
        staleTime: 1000 * 60 * 3, // 3분
    })

    // 아마 loading state가 onMutate와 onSettled 때 2번 바뀌어서 여러번 console 찍힘.
    console.log('me')
    console.log(me)

    const loginMutation = useMutation<Promise<any>, AxiosError, { email: string; password: string }>('user', logInAPI, {
        onError: (error) => {
            console.error(error.response?.data)
        },
        onSuccess: (user) => {
            queryClient.setQueryData('user', user)
        },
    })

    const logoutMutation = useMutation<void, AxiosError>(logOutAPI, {
        onError: (error) => {
            alert(error.response?.data)
        },
        onSuccess: () => {
            queryClient.setQueryData('user', null)
        },
    })

    const onLoginCb = useCallback(() => {
        loginMutation.mutate({ email, password })
    }, [loginMutation])

    const onLogoutCb = useCallback(() => {
        logoutMutation.mutate()
    }, [logoutMutation])

    return (
        <div>{me ? <button onClick={onLogoutCb}>로그아웃</button> : <button onClick={onLoginCb}>로그인</button>}</div>
    )
}

export default TestPage
