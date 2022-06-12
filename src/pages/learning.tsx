import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import ClipLoader from 'react-spinners/ClipLoader'

function loadSpinner() {
    let curTime = Date.now()
    console.log('시작!')
    while (true) {
        if (Date.now() > curTime + 10 * 1000) {
            break
        }
    }
    console.log('끝')
}

const Learning = () => {
    const router = useRouter()

    const [tmpLoadedContent, setTmpLoadedContent] = useState(false)

    useEffect(() => {
        setTmpLoadedContent(true)
    }, [])

    useEffect(() => {
        if (tmpLoadedContent) {
            loadSpinner()
            router.push('/')
        }
    }, [tmpLoadedContent])

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