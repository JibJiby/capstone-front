import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import ClipLoader from 'react-spinners/ClipLoader'
import { setTimeout } from 'timers'

const Learning = () => {
    const router = useRouter()

    useEffect(() => {
        setTimeout(() => {
            router.push('/')
        }, 30 * 1000)
    }, [])

    return (
        <div
            style={{
                backgroundColor: '#e9ecef',
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <ClipLoader loading />
            <div>추천할 만한 도서를 고르는 중입니다...</div>
            <div style={{fontWeight: 'bold'}}>조금만 기다려주세요!!!</div>
        </div>
    )
}

export default Learning
