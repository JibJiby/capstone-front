import type { GetServerSidePropsContext, NextPage } from 'next'
import AppLayout from '@components/AppLayout'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { bookImage } from '@data/fake-book'
import BackTop from '@components/BackTop'
import BooksContainer from '@components/BooksContainer'
import axios from 'axios'
import { loadMyInfoAPI } from '@apis/user'

// { isCompleted }: { isCompleted: boolean }
const Home = () => {
    const router = useRouter()

    const [myBooks, setMyBooks] = useState([...bookImage])

    // console.log('isCompleted')
    // console.log(isCompleted)

    // useEffect(() => {
    //     if (!isCompleted) {
    //         router.push('/first')
    //     }
    // }, [])

    // Infinite Scroll
    useEffect(() => {
        function onScroll() {
            // scrollY는 현재 포인트(상단 기준)
            // clientHeight (간단히 브라우저 높이. 고정값)
            // scrollHeight (페이지 가장 아래. 고정값. 하단 기준)
            if (window.scrollY + document.documentElement.clientHeight > document.documentElement.scrollHeight - 300) {
                // TODO: 더 불러오기 API (throttling)
                console.log('더 불러왔음')
            }
        }
        window.addEventListener('scroll', onScroll)
        return () => {
            window.removeEventListener('scroll', onScroll)
        }
    }, [])

    return (
        <>
            <AppLayout>
                <div>
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            marginTop: '30px',
                            marginBottom: '45px',

                            userSelect: 'none',
                        }}
                    >
                        <h1 style={{ fontWeight: 'bold' }}>유저님이 좋아하실 책들을 추천합니다.</h1>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <BooksContainer style={{ margin: '0 15px' }}>
                            {myBooks.map((v, i) => (
                                <>
                                    <div
                                        key={i}
                                        style={{
                                            marginBottom: '50px',
                                            display: 'flex',
                                            justifyContent: 'center',

                                            userSelect: 'none',
                                            position: 'relative',
                                        }}
                                    >
                                        <img
                                            key={i}
                                            src={v}
                                            width={600}
                                            style={{ cursor: 'pointer' }}
                                            onClick={() => {
                                                router.push(`/book/${bookImage.findIndex((w) => w === v)}`)
                                            }}
                                        />
                                        <div
                                            key={i}
                                            style={{
                                                position: 'absolute',
                                                top: 0,
                                                right: 0,

                                                width: '20px',
                                                height: '20px',

                                                backgroundColor: '#e9ecef',
                                                textAlign: 'center',
                                            }}
                                            onClick={() => setMyBooks([...myBooks.filter((v, j) => j !== i)])}
                                        >
                                            x
                                        </div>
                                    </div>
                                </>
                            ))}
                        </BooksContainer>
                    </div>
                </div>
            </AppLayout>
            <BackTop limit={500} />
        </>
    )
}

export default Home

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
    const cookie = context.req ? context.req.headers.cookie : ''
    axios.defaults.headers.common.cookie = ''
    if (context.req && cookie) {
        axios.defaults.headers.common.cookie = cookie
    }

    try {
        const data = await loadMyInfoAPI()
        if (!data) {
            return {
                redirect: {
                    destination: '/about',
                    permanent: false,
                },
            }
        }
        return {
            props: {},
        }
    } catch (err) {
        return {
            redirect: {
                destination: '/about',
                permanent: false,
            },
        }
    }
}
