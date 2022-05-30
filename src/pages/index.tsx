import type { GetServerSidePropsContext, NextPage } from 'next'
import AppLayout from '@components/AppLayout'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { bookImage } from '@data/fake-book'
import BackTop from '@components/BackTop'
import BooksContainer from '@components/BooksContainer'
import axios from 'axios'
import { loadMyInfoAPI } from '@apis/user'
import { loadRandomBookList } from '@apis/book'
import { useQuery } from 'react-query'
import styled from '@emotion/styled'

// { isCompleted }: { isCompleted: boolean }
const Home = () => {
    const router = useRouter()

    // FIXME: seed 값을 일정한 규칙으로 가져오기 & localStorage에 임시 저장
    // let tmpSeed: number
    // if (sessionStorage.getItem('seed')) {
    //     tmpSeed = Number(JSON.stringify(sessionStorage.getItem('seed')))
    // } else {
    //     tmpSeed = Number(sessionStorage.setItem('seed', JSON.stringify(Math.ceil(Math.random() * 100))))
    // }

    const tmpSeed = Math.ceil(Math.random() * 100)
    const { data: randomBooks } = useQuery(['ramdomBook'], () => loadRandomBookList(tmpSeed, 0, 99), {
        staleTime: 30 * 60 * 1000, // 단위 ms
        refetchOnWindowFocus: false,
    })

    const [myBooks, setMyBooks] = useState([...bookImage])

    console.log('-----------------------')
    console.log(randomBooks)

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

    useEffect(() => {
        // 상단 이동
        window.onbeforeunload = function pushRefresh() {
            window.scrollTo(0, 0)
        }
    }, [])

    return (
        <>
            <AppLayout>
                <div>
                    <ContainerHeader>
                        <h1>유저님이 좋아하실 책들을 추천합니다.</h1>
                    </ContainerHeader>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <BooksContainer style={{ margin: '0 15px' }}>
                            {randomBooks?.map((v, i) => (
                                <>
                                    <div
                                        key={v.imgUrl}
                                        style={{
                                            marginBottom: '50px',
                                            display: 'flex',
                                            justifyContent: 'center',

                                            userSelect: 'none',
                                            position: 'relative',
                                        }}
                                    >
                                        <img
                                            src={v.imgUrl}
                                            width="150px"
                                            key={v.imgUrl}
                                            style={{ cursor: 'pointer' }}
                                            onClick={() => {
                                                console.log(v)
                                                router.push(`/book/${v.isbn}`)
                                            }}
                                        />
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
                // redirect: {
                //     destination: '/about',
                //     permanent: false,
                // },

                // FIXME:
                props: {},
            }
        }

        // FIXME: 무한 루프 문제 해결 필요.
        // const isFirst = await isFirstAPI()
        // if (isFirst) {
        //     console.log('처음 --', isFirst)
        //     return {
        //         redirect: {
        //             destination: '/first',
        //             permanent: false,
        //         },
        //     }
        // } else {
        // }
        return {
            props: {},
        }
    } catch (err) {
        return {
            // redirect: {
            //     destination: '/about',
            //     permanent: false,
            // },

            // FIXME:
            props: {},
        }
    }
}

const ContainerHeader = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 30px;
    margin-bottom: 45px;

    h1 {
        /* fontWeight: 'bold' */
        font-weight: bold;

        user-select: none;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
    }
`
