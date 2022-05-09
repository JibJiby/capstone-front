import { logInAPI, logOutAPI } from '@apis/auth'
import { loadMyInfoAPI } from '@apis/user'
import { AxiosError } from 'axios'
import { useState } from 'react'
import { useMutation, useQuery, useQueryClient } from 'react-query'

const TestPage = () => {
    const queryClient = useQueryClient()
    const [loading, setLoading] = useState(false)
    const { data: me } = useQuery('user', loadMyInfoAPI)

    const mutation = useMutation<Promise<any>, AxiosError, { email: string; password: string }>(logInAPI, {
        onMutate: () => {
            setLoading(true)
        },
        onError: (error) => {
            console.error(error.response?.data)
        },
        onSuccess: () => {
            // queryClient.setQueryData('user', null)
        },
        onSettled: () => {
            setLoading(false)
        },
    })

    const logoutMutation = useMutation(logOutAPI, {})

    return (
        <div>
            테스트 페이지
            {me ? (
                <button
                    onClick={() => {
                        mutation.mutate
                    }}
                >
                    로그아웃
                </button>
            ) : (
                <button
                    onClick={() => {
                        mutation.mutate({ email: 'aaa@aaa.com', password: 'aaa' })
                    }}
                >
                    로그인
                </button>
            )}
        </div>
    )
}

export default TestPage
