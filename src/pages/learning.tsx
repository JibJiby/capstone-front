import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import ClipLoader from 'react-spinners/ClipLoader'
import { setTimeout } from 'timers'

const Learning = () => {
    const router = useRouter()

    useEffect(() => {
        setTimeout(() => {
            router.push('/')
        }, 6 * 1000)
    }, [])

    return (
        <section
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
            <header>추천할 만한 도서를 고르는 중입니다...</header>
            <section style={{ fontWeight: 'bold' }}>
                고장나지 않았어요^^ 조금만 기다려주세요!!!
            </section>
        </section>
    )
}

export default Learning
