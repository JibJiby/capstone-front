import { useCallback, useEffect, useState } from 'react'
import Router, { useRouter } from 'next/router'
import Image from 'next/image'

import styled from '@emotion/styled'
import { css } from '@emotion/react'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import axios from 'axios'

import { loadMyInfoAPI } from '@apis/user'
import useInput from '@hooks/useInput'
import { AxiosError } from 'axios'
import { signUpAPI } from '@apis/auth'
import { GetServerSidePropsContext } from 'next'
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

function Signup() {
    const queryClient = useQueryClient()
    const [loading, setLoading] = useState(false)
    // const { data: me } = useQuery('user', loadMyInfoAPI)
    const mutation = useMutation<Promise<any>, AxiosError, { email: string; nickname: string; password: string }>(
        signUpAPI,
        {
            onMutate: () => {
                setLoading(true)
            },
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
                setLoading(false)
            },
        },
    )

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

        if (id !== '' && pw !== '' && pwConfirm !== '' && pw === pwConfirm && nickname !== '') {
            // 로그인 페이지로 이동
            // TODO: 로그인 중복 확인, 비밀번호 조건 충족 여부, 닉네임 중복 확인 API
            mutation.mutate({ email: id, password: pw, nickname })
        }
    }, [id, pw, pwConfirm, nickname])

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
                <div style={{ marginTop: '25px', position: 'relative' }}>
                    <Input placeholder="아이디" onChange={onChangeId} value={id} />
                    {idError && <div css={errorMessageStyle}>아이디를 제대로 입력해주세요</div>}
                    {id && (
                        <div
                            style={{
                                position: 'absolute',
                                top: '16px',
                                right: '11px',
                                userSelect: 'none',
                                cursor: 'pointer',
                            }}
                            onClick={() => setId('')}
                        >
                            {/* TODO: 이미지로 x 클리어 버튼 바꾸기 */}x
                        </div>
                    )}
                </div>

                <div style={{ marginTop: '25px', position: 'relative' }}>
                    <Input placeholder="비밀번호" onChange={onChangePw} value={pw} type="password" />
                    {pwError && <div css={errorMessageStyle}>비밀번호를 제대로 입력해주세요</div>}
                    {pw && (
                        <div
                            style={{
                                position: 'absolute',
                                top: '16px',
                                right: '11px',
                                userSelect: 'none',
                                cursor: 'pointer',
                            }}
                            onClick={() => setPw('')}
                        >
                            x
                        </div>
                    )}
                </div>

                <div style={{ marginTop: '25px', position: 'relative' }}>
                    <Input placeholder="비밀번호 확인" onChange={onChangePwConfirm} value={pwConfirm} type="password" />
                    {pwConfirmError && <div css={errorMessageStyle}>동일한 비밀번호을 입력해주세요</div>}
                    {pwConfirm && (
                        <div
                            style={{
                                position: 'absolute',
                                top: '16px',
                                right: '11px',
                                userSelect: 'none',
                                cursor: 'pointer',
                            }}
                            onClick={() => setPwConfirm('')}
                        >
                            x
                        </div>
                    )}
                </div>

                <div style={{ marginTop: '25px', position: 'relative' }}>
                    <Input placeholder="닉네임" onChange={onChangeNickname} value={nickname} />
                    {nicknameError && <div css={errorMessageStyle}>닉네임을 제대로 입력해주세요</div>}
                    {nickname && (
                        <div
                            style={{
                                position: 'absolute',
                                top: '16px',
                                right: '11px',
                                userSelect: 'none',
                                cursor: 'pointer',
                            }}
                            onClick={() => setNickname('')}
                        >
                            x
                        </div>
                    )}
                </div>

                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '40px' }}>
                    <Button onClick={onSubmit}>회원가입</Button>
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
                        onClick={() => router.push('/login')}
                    >
                        이미 회원가입 했어요!
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
