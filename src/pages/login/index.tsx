import Image from 'next/image'
import { useRouter } from 'next/router'
import useInput from '@hooks/useInput'
import styled from '@emotion/styled'
import { useCallback, useEffect, useState } from 'react'
import { css } from '@emotion/react'
import { logInAPI } from '@apis/auth'
import { useMutation, useQuery } from 'react-query'
import axios, { AxiosError } from 'axios'
import { GetServerSidePropsContext } from 'next'
import { loadMyInfoAPI } from '@apis/user'
import { message } from 'antd'

import { LoginPageInput as Input, LoginPageButton as Button } from './style'

import 'antd/lib/notification/style/index.css'
import { errorMessageStyle } from '@pages/signup/style'

function Login() {
    const router = useRouter()

    const [id, onChangeId] = useInput('')
    const [pw, onChangePw] = useInput('')

    const [idError, setIdError] = useState(false)
    const [pwError, setPwError] = useState(false)
    const [loading, setLoading] = useState(false)

    const { data: me, refetch } = useQuery('user', loadMyInfoAPI)

    const onPressPw = useCallback(
        (e) => {
            if (e.key === 'Enter') {
                onLoginClick()
            }
        },
        [pw],
    )

    const mutation = useMutation<
        Promise<any>,
        AxiosError,
        { email: string; password: string }
    >(logInAPI, {
        onMutate: () => {
            setLoading(true)
        },
        onError: (error) => {
            // 이메일 중복 확인 등 에러 마다 처리
            console.error(error.response?.data)
            message.warn('로그인을 실패하였습니다.')
        },
        onSuccess: () => {
            router.push('/')
            message.info('로그인 성공하셨습니다!')
        },
        onSettled: () => {
            setLoading(false)
        },
    })

    const onLoginClick = useCallback(() => {
        if (id === '') {
            setIdError(true)
        } else {
            const emailRegex =
                /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/
            if (!emailRegex.test(id)) {
                setIdError(true)
            } else {
                setIdError(false)
            }
        }

        if (pw === '') {
            setPwError(true)
        } else {
            setPwError(false)
        }

        if (id !== '' && pw !== '') {
            // TODO: 로그인 API
            mutation.mutate({ email: id, password: pw })
        }
    }, [id, pw])

    return (
        <div
            style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                paddingTop: '50px',
            }}
        >
            <div
                style={{ userSelect: 'none', cursor: 'pointer' }}
                onClick={() => {
                    router.push('/')
                }}
            >
                <Image src="/logo.svg" width={250} height={80} />
            </div>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    marginTop: '48px',
                }}
            >
                <div style={{ marginTop: '25px' }}>
                    <Input
                        placeholder="아이디"
                        onChange={onChangeId}
                        value={id}
                    />
                    {idError && (
                        <div css={errorMessageStyle}>
                            아이디를 제대로 입력해주세요
                        </div>
                    )}
                </div>

                <div style={{ marginTop: '25px' }}>
                    <Input
                        placeholder="비밀번호"
                        onChange={onChangePw}
                        onKeyPress={onPressPw}
                        value={pw}
                        type="password"
                    />
                    {pwError && (
                        <div css={errorMessageStyle}>
                            비밀번호를 제대로 입력해주세요
                        </div>
                    )}
                </div>
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        marginTop: '40px',
                    }}
                >
                    <Button onClick={onLoginClick}>로그인</Button>
                </div>
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        marginTop: '15px',
                        userSelect: 'none',
                    }}
                >
                    <u
                        style={{
                            cursor: 'pointer',
                            color: '#ff8787',
                            fontWeight: 'bold',
                        }}
                        onClick={() => router.push('/signup')}
                    >
                        회원가입 하러 가기
                    </u>
                </div>
            </div>
        </div>
    )
}

export const getServerSideProps = async (
    context: GetServerSidePropsContext,
) => {
    const cookie = context.req ? context.req.headers.cookie : ''
    axios.defaults.headers.common.cookie = ''
    if (context.req && cookie) {
        console.log('쿠키 장착...') // o
        axios.defaults.headers.common.cookie = cookie
    }

    try {
        console.log('서버 사이드 user 정보 가져오기')
        const data = await loadMyInfoAPI()
        // const { data } = await axios.get('/user', { withCredentials: true })  // 이것도 에러. 여기서 문제. 왜 401에러가 뜨는가...
        console.log(data)
        console.log('------------------------------------')

        if (data) {
            return {
                redirect: {
                    destination: '/',
                    permanent: false,
                },
            }
        }
        return {
            redirect: {
                destination: '/about',
                permanent: false,
            },
        }
    } catch (error) {
        console.log('login 에러 상태')

        console.log('===============================')

        return {
            props: {},
        }
    }
}

export default Login
