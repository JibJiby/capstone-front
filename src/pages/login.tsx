import Image from 'next/image'
import { useRouter } from 'next/router'
import useInput from '@hooks/useInput'
import styled from '@emotion/styled'
import { useCallback, useState } from 'react'
import { css } from '@emotion/react'

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

function Login() {
    const router = useRouter()

    const [id, onChangeId] = useInput('')
    const [pw, onChangePw] = useInput('')

    const [idError, setIdError] = useState(false)
    const [pwError, setPwError] = useState(false)

    const onLoginClick = useCallback(() => {
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

        if (id !== '' && pw !== '') {
            // TODO: 로그인 API
            router.push('/')
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
            <div style={{ display: 'flex', flexDirection: 'column', marginTop: '48px' }}>
                <div style={{ marginTop: '25px' }}>
                    <Input placeholder="아이디" onChange={onChangeId} value={id} />
                    {idError && <div css={errorMessageStyle}>아이디를 입력해주세요</div>}
                </div>

                <div style={{ marginTop: '25px' }}>
                    <Input placeholder="비밀번호" onChange={onChangePw} value={pw} />
                    {pwError && <div css={errorMessageStyle}>비밀번호를 입력해주세요</div>}
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

export default Login
