import styled from '@emotion/styled'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { AboutPageLoginButton as LoginButton, AboutPageContainer as Container } from './style'
import { useCallback } from 'react'

const About = () => {
    const router = useRouter()

    const onClickLoginButton = useCallback(() => {
        router.push('/login')
    }, [])

    return (
        <Container>
            <section className="logo">
                <Image src="/logo.svg" width={250} height={80} />
            </section>
            <header>
                저희 서비스는 &nbsp;
                <strong>도서 추천 서비스</strong>
                &nbsp; 입니다.
            </header>
            <section className="main-sentance">
                <h1>이 책을 좋아하면 저 책도 좋아할 거 같아요.</h1>
            </section>
            <section className="button-container">
                <LoginButton onClick={onClickLoginButton}>이용하러 가기</LoginButton>
            </section>
        </Container>
    )
}

export default About
