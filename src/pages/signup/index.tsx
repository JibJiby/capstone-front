import { useCallback, useEffect, useState } from 'react'
import Router, { useRouter } from 'next/router'
import { GetServerSidePropsContext } from 'next'
import Image from 'next/image'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import axios, { AxiosError } from 'axios'
import { message } from 'antd'

import { loadMyInfoAPI } from '@apis/user'
import useInput from '@hooks/useInput'
import { signUpAPI } from '@apis/auth'

import {
    SignupPageButton as Button,
    SignupPageInput as Input,
    errorMessageStyle,
    ClearButtonContainer,
    SignupPageContainer as Container,
} from './style'

import 'antd/lib/notification/style/index.css'

function Signup() {
    const mutation = useMutation<
        Promise<any>,
        AxiosError,
        { email: string; nickname: string; password: string }
    >(signUpAPI, {
        onMutate: () => {},
        onError: (error) => {
            // 이메일 중복 확인 등 에러 마다 처리
            message.warn('회원가입에 실패하였습니다.')
            console.error(error.response?.data)
        },
        onSuccess: () => {
            message.info('회원가입에 성공하셨습니다!')
            router.push('/login')
        },
        onSettled: () => {
        },
    })

    const router = useRouter()

    const [id, onChangeId, setId] = useInput('')
    const [pw, onChangePw, setPw] = useInput('')
    const [pwConfirm, onChangePwConfirm, setPwConfirm] = useInput('')
    const [nickname, onChangeNickname, setNickname] = useInput('')

    const [idError, setIdError] = useState(false)
    const [pwError, setPwError] = useState(false)
    const [pwConfirmError, setPwConfirmError] = useState(false)
    const [nicknameError, setNicknameError] = useState(false)

    const onSubmit = useCallback(() => {
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

        if (pwConfirm === '') {
            setPwConfirmError(true)
        } else {
            setPwConfirmError(false)
        }

        if (nickname === '') {
            setNicknameError(true)
        } else {
            setNicknameError(false)
        }

        // 비밀번호와 비밀번호 확인 값 둘 비교
        if (pw !== '' && pwConfirm !== '' && pw !== pwConfirm) {
            setPwConfirmError(true)
        }

        if (
            id !== '' &&
            pw !== '' &&
            pwConfirm !== '' &&
            pw === pwConfirm &&
            nickname !== ''
        ) {
            // 로그인 페이지로 이동
            mutation.mutate({ email: id, password: pw, nickname })
        }
    }, [id, pw, pwConfirm, nickname])

    return (
        <Container>
            <section
                id="logo"
                onClick={() => {
                    router.push('/')
                }}
            >
                <Image src="/logo.svg" width={250} height={80} />
            </section>
            <section id="signup-form">
                <div style={{ marginTop: '25px', position: 'relative' }}>
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
                    {id && (
                        <ClearButtonContainer onClick={() => setId('')}>
                            x
                        </ClearButtonContainer>
                    )}
                </div>

                <div style={{ marginTop: '25px', position: 'relative' }}>
                    <Input
                        placeholder="비밀번호"
                        onChange={onChangePw}
                        value={pw}
                        type="password"
                    />
                    {pwError && (
                        <div css={errorMessageStyle}>
                            비밀번호를 제대로 입력해주세요
                        </div>
                    )}
                    {pw && (
                        <ClearButtonContainer onClick={() => setPw('')}>
                            x
                        </ClearButtonContainer>
                    )}
                </div>

                <div style={{ marginTop: '25px', position: 'relative' }}>
                    <Input
                        placeholder="비밀번호 확인"
                        onChange={onChangePwConfirm}
                        value={pwConfirm}
                        type="password"
                    />
                    {pwConfirmError && (
                        <div css={errorMessageStyle}>
                            동일한 비밀번호을 입력해주세요
                        </div>
                    )}
                    {pwConfirm && (
                        <ClearButtonContainer onClick={() => setPwConfirm('')}>
                            x
                        </ClearButtonContainer>
                    )}
                </div>

                <div style={{ marginTop: '25px', position: 'relative' }}>
                    <Input
                        placeholder="닉네임"
                        onChange={onChangeNickname}
                        value={nickname}
                    />
                    {nicknameError && (
                        <section css={errorMessageStyle}>
                            닉네임을 제대로 입력해주세요
                        </section>
                    )}
                    {nickname && (
                        <ClearButtonContainer onClick={() => setNickname('')}>
                            x
                        </ClearButtonContainer>
                    )}
                </div>

                <section id="signup-btn-container">
                    <Button onClick={onSubmit}>회원가입</Button>
                </section>

                <section id="back-login">
                    <u onClick={() => router.push('/login')}>
                        이미 회원가입 했어요!
                    </u>
                </section>
            </section>
        </Container>
    )
}

export const getServerSideProps = async (
    context: GetServerSidePropsContext,
) => {
    const cookie = context.req ? context.req.headers.cookie : ''
    axios.defaults.headers.common.cookie = ''
    if (context.req && cookie) {
        axios.defaults.headers.common.cookie = cookie
    }

    try {
        const data = await loadMyInfoAPI()
        console.log('load my info  :  ', data)
        if (!data) {
            return {
                redirect: {
                    // 이미 회원가입한 사람은 접근하지 못함.
                    destination: '/',
                    permanent: false,
                },
            }
        }
    } catch (err) {
        return {
            props: {},
        }
    }
}

export default Signup
