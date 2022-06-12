import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import ClipLoader from 'react-spinners/ClipLoader'
import { setTimeout } from 'timers'

const Learning = () => {
    const router = useRouter()

    useEffect(() => {

        setTimeout(() => {
            router.push('/')
        }, 15 * 1000)
    }, [])

    return (
        <div
            style={{
                backgroundColor: '#e9ecef',
                width: '100%',
                height: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <ClipLoader loading />
            {'  '}모델 학습중입니다...
        </div>
    )
}

export default Learning
