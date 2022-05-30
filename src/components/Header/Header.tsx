import { logOutAPI } from '@apis/auth'
import { loadMyInfoAPI } from '@apis/user'
import { AxiosError } from 'axios'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useCallback, useState } from 'react'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { LogInOutButton } from './styles'

function Header() {
    const router = useRouter()
    const queryClient = useQueryClient()
    const { data: me } = useQuery('user', loadMyInfoAPI)

    const [loading, setLoading] = useState(false)

    const mutation = useMutation<void, AxiosError>(logOutAPI, {
        onMutate: () => {
            setLoading(true)
        },
        onError: (error) => {
            alert(error.response?.data)
        },
        onSuccess: () => {
            queryClient.setQueryData('user', null)
            router.push('/')
        },
        onSettled: () => {
            setLoading(false)
        },
    })

    const onLogOut = useCallback(() => {
        mutation.mutate()
    }, [mutation])

    return (
        <div
            style={{
                position: 'fixed',
                width: '100%',
                height: '60px',
                backgroundColor: '#e9ecef',

                display: 'flex',
                justifyContent: 'center',

                userSelect: 'none',
                zIndex: 100, // brightness가 위로 올라가기 때문에
            }}
        >
            <div
                style={{
                    width: '80%',
                    height: '100%',

                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
            >
                <div
                    style={{
                        cursor: 'pointer',
                    }}
                    onClick={() => {
                        router.push('/')
                    }}
                >
                    <Image src="/logo.svg" width={100} height={50} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                    {/* <div
                        style={{
                            // marginRight: '40px',
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            fontWeight: 'bold',

                            cursor: 'pointer',
                        }}
                        onClick={() => {
                            router.push('/best')
                        }}
                    >
                        베스트셀러
                    </div> */}
                    {!me ? (
                        <LogInOutButton
                            onClick={() => {
                                router.push('/login')
                            }}
                            style={{ fontWeight: 'bold', cursor: 'pointer', marginLeft: '20px' }}
                        >
                            로그인
                        </LogInOutButton>
                    ) : (
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            {/* <div
                                style={{
                                    cursor: 'pointer',
                                    marginLeft: '15px',
                                    marginRight: '15px',
                                }}
                            >
                                <Image src="/user-icon.png" width={32} height={32} />
                            </div> */}
                            <LogInOutButton onClick={onLogOut}>로그아웃</LogInOutButton>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Header
