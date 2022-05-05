import { useCallback, useEffect, useState } from 'react'
import Router, { useRouter } from 'next/router'
import Image from 'next/image'

import styled from '@emotion/styled'
import { css } from '@emotion/react'
import { useMutation, useQuery, useQueryClient } from 'react-query'

import { loadMyInfoAPI } from '@apis/user'
import useInput from '@hooks/useInput'
import { AxiosError } from 'axios'
import { signUpAPI } from '@apis/auth'

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
    const { data: me } = useQuery('user', loadMyInfoAPI)
    const mutation = useMutation<{ email: string; nickname: string; password: string }, AxiosError>(signUpAPI, {
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
            setIdError(false)
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
            router.push('/login')
        }
    }, [id, pw, pwConfirm, nickname])

    console.log('me', me)
    useEffect(() => {
        if (me) {
            console.log('redirects to /')
            Router.replace('/')
        } else {
            console.log('me 없음')
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
                <div style={{ marginTop: '25px', position: 'relative' }}>
                    <Input placeholder="아이디" onChange={onChangeId} value={id} />
                    {idError && <div css={errorMessageStyle}>아이디를 입력해주세요</div>}
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
                    {pwError && <div css={errorMessageStyle}>비밀번호를 입력해주세요</div>}
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
                    {nicknameError && <div css={errorMessageStyle}>닉네임을 입력해주세요</div>}
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
            </div>
        </div>
    )
}

export default Signup
