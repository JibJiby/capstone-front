import Image from 'next/image'
import { useRouter } from 'next/router'
import { useState } from 'react'
import useInput from '@hooks/useInput'
import styled from '@emotion/styled'

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
    curosr: pointer;

    border: none;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
`

function Login() {
    const router = useRouter()

    const [id, onChangeId] = useInput('')
    const [pw, onChangePw] = useInput('')

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
                </div>

                <div style={{ marginTop: '25px' }}>
                    <Input placeholder="비밀번호" onChange={onChangePw} value={pw} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '40px' }}>
                    <Button>로그인</Button>
                </div>
            </div>
        </div>
    )
}

export default Login
