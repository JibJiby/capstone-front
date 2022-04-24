import styled from '@emotion/styled'
import Image from 'next/image'
import { useRouter } from 'next/router'

const SignupButton = styled.button`
    border: none;
    border-radius: 12px;

    width: 300px;
    height: 50px;

    font-size: 26px;
    font-weight: bold;

    cursor: pointer;
    transition: all 0.3s;

    background-color: white;

    &:hover {
        background-color: #868e96;
        color: white;
    }
`

const About = () => {
    const router = useRouter()

    return (
        <div
            style={{
                width: '100%',
                height: '100%',
                backgroundImage:
                    'linear-gradient( rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3) ), url("https://cdn.pixabay.com/photo/2015/09/05/21/51/reading-925589_960_720.jpg")',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',

                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            <div style={{ userSelect: 'none', marginTop: '100px', marginBottom: '100px' }}>
                <Image src="/logo.svg" width={250} height={80} />
            </div>
            <div style={{ color: 'white', fontSize: '28px', userSelect: 'none', marginBottom: '64px' }}>
                저희 서비스는 &nbsp;
                <span style={{ fontWeight: 'bold' }}>도서 추천 서비스</span>
                &nbsp; 입니다.
            </div>
            <div
                style={{
                    fontSize: '48px',
                    color: 'white',
                    wordBreak: 'break-word',
                    userSelect: 'none',
                    marginBottom: '58px',
                }}
            >
                {/* TODO: media css 추가 */}이 책을 좋아하면 저 책도 좋아할 거 같아요.
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', userSelect: 'none' }}>
                <SignupButton
                    onClick={() => {
                        router.push('/signup')
                    }}
                >
                    회원 가입 하러 가기
                </SignupButton>
            </div>
        </div>
    )
}

export default About
