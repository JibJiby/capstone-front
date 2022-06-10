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

import 'antd/lib/notification/style/index.css'

const Input = styled.input`
    width: 400px;
    border-radius: 4px;
    font-size: 17px;
    color: #202124;
    margin: 1px 1px 0 1px;
    padding: 13px 15px;
    line-height: 24px;
    border: 1px solid #ced4da;
    outline: none;
`

const Button = styled.button`
    width: 180px;
    height: 50px;
    border-radius: 8px;
    font-size: 20px;
    font-weight: bold;
    user-select: none;
    cursor: pointer;

    border: none;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
    background-color: #495057;
    color: white;
    letter-spacing: 3px;

    &:hover {
        opacity: 0.85;
        transition: opacity 0.3s ease;
    }
`

const errorMessageStyle = css`
    color: red;
    font-size: 14px;
`

function Login({ err }: { err: any }) {
    const router = useRouter()

    const [id, onChangeId] = useInput('')
    const [pw, onChangePw] = useInput('')

    const [idError, setIdError] = useState(false)
    const [pwError, setPwError] = useState(false)
    const [loading, setLoading] = useState(false)

    const { data: me, refetch } = useQuery('user', loadMyInfoAPI, {
        // staleTime: 30 * 60 * 1000, // ms
    })

    console.log('=-=-=-=-=-===-err=-=-=-=-=-=')
    console.log(me)
    console.log(err)

    const onPressPw = useCallback(
        (e) => {
            if (e.key === 'Enter') {
                onLoginClick()
            }
        },
        [pw],
    )

    const mutation = useMutation<Promise<any>, AxiosError, { email: string; password: string }>(logInAPI, {
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

    useEffect(() => {
        if (me !== undefined) {
            router.push('/')
        }
    }, [me])

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
            <div style={{ display: 'flex', flexDirection: 'column', marginTop: '48px' }}>
                <div style={{ marginTop: '25px' }}>
                    <Input placeholder="아이디" onChange={onChangeId} value={id} />
                    {idError && <div css={errorMessageStyle}>아이디를 제대로 입력해주세요</div>}
                </div>

                <div style={{ marginTop: '25px' }}>
                    <Input
                        placeholder="비밀번호"
                        onChange={onChangePw}
                        onKeyPress={onPressPw}
                        value={pw}
                        type="password"
                    />
                    {pwError && <div css={errorMessageStyle}>비밀번호를 제대로 입력해주세요</div>}
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '40px' }}>
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
                        style={{ cursor: 'pointer', color: '#ff8787', fontWeight: 'bold' }}
                        onClick={() => router.push('/signup')}
                    >
                        회원가입 하러 가기
                    </u>
                </div>
            </div>
        </div>
    )
}

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
    const cookie = context.req ? context.req.headers.cookie : ''
    axios.defaults.headers.common.cookie = ''
    if (context.req && cookie) {
        axios.defaults.headers.common.cookie = cookie
    }

    try {
        const data = await loadMyInfoAPI()
        if (data) {
            return {
                redirect: {
                    destination: '/',
                    permanent: false,
                },
            }
        }
        return {
            props: {},
        }
    } catch (err) {
        // 비로그인 상태라면 이대로.
        return {
            props: { err },
        }
    }
}

export default Login
