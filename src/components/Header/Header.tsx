import Image from 'next/image'
import { useRouter } from 'next/router'
import { useState } from 'react'

function Header() {
    const router = useRouter()
    const [isLogin, setLogin] = useState(false)

    return (
        <div
            style={{
                position: 'fixed',
                width: '100%',
                height: '60px',
                backgroundColor: '#e9ecef',

                display: 'flex',
                justifyContent: 'center',

                userSelect: 'none',
                zIndex: 100, // brightness가 위로 올라가기 때문에
            }}
        >
            <div
                style={{
                    width: '80%',
                    height: '100%',

                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
            >
                <div
                    style={{
                        cursor: 'pointer',
                    }}
                    onClick={() => {
                        router.push('/')
                    }}
                >
                    <Image src="/logo.svg" width={100} height={50} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <div
                        style={{
                            marginRight: '40px',
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            fontWeight: 'bold',

                            cursor: 'pointer',
                        }}
                        onClick={() => {
                            router.push('/best')
                        }}
                    >
                        베스트셀러
                    </div>
                    {isLogin ? (
                        <div
                            onClick={() => {
                                setLogin(!isLogin)
                                router.push('/login')
                            }}
                            style={{ fontWeight: 'bold', cursor: 'pointer' }}
                        >
                            로그인
                        </div>
                    ) : (
                        <div
                            style={{
                                cursor: 'pointer',
                            }}
                            onClick={() => {
                                setLogin(!isLogin)
                                router.push('/about')
                            }}
                        >
                            <Image src="/user-icon.png" width={32} height={32} />
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Header
