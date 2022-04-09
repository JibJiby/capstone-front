import Image from 'next/image'
import { useRouter } from 'next/router'

function Header() {
    const router = useRouter()

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
                    >
                        베스트셀러
                    </div>
                    <div
                        style={{
                            cursor: 'pointer',
                        }}
                    >
                        <Image src="/user-icon.png" width={32} height={32} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header
