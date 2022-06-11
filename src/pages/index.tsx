import type { GetServerSidePropsContext, NextPage } from 'next'
import AppLayout from '@components/AppLayout'
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'
import BackTop from '@components/BackTop'
import BooksContainer from '@components/BooksContainer'
import axios, { AxiosError } from 'axios'
import { loadMyInfoAPI } from '@apis/user'
import { loadRandomBookList } from '@apis/book'
import { QueryClient, useInfiniteQuery, useQuery } from 'react-query'
import styled from '@emotion/styled'
import { isFirstAPI } from '@apis/likeslog'
import ClipLoader from 'react-spinners/ClipLoader'

const Home = () => {
    const router = useRouter()

    let tmpSeed = Math.ceil(Math.random() * 100)

    const { data: randomBooks, fetchNextPage } = useInfiniteQuery(
        ['ramdomBook'],
        ({ pageParam = 0 }) => {
            if (pageParam > 0) {
                tmpSeed = Number(JSON.parse(sessionStorage.getItem('seed')!))
            }
            return loadRandomBookList(tmpSeed, 30 * pageParam, 30 * (pageParam + 1) - 1)
        },
        {
            staleTime: 10 * 60 * 1000, // 단위 ms
            refetchOnWindowFocus: false,

            //infinite
            getNextPageParam: (lastPage, pages) => 1,
        },
    )
    const { data: isFirst } = useQuery('isfirst', isFirstAPI, {
        // staleTime: 30 * 60 * 1000, // 단위 ms
        // refetchOnWindowFocus: false,
    })

    useEffect(() => {
        function onScroll() {
            if (window.scrollY + document.documentElement.clientHeight > document.documentElement.scrollHeight - 400) {
                fetchNextPage().then((res) => {
                    console.log(res.data)
                })
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

        sessionStorage.setItem('seed', JSON.stringify(tmpSeed))
    }, [])

    useEffect(() => {
        console.log('][][][][][][]][][]isFirst][]][][][][][][][][]][]')
        console.log(isFirst)
        if (isFirst === true) {
            router.push('/first')
        }
    }, [isFirst])

    return (
        <>
            {/* <div
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
                </div> */}

            <AppLayout>
                <div>
                    <ContainerHeader>
                        <h1>유저님이 좋아하실 책들을 추천합니다.</h1>
                    </ContainerHeader>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <BooksContainer style={{ margin: '0 15px' }}>
                            {randomBooks?.pages?.map((page) =>
                                page
                                    ?.sort((a: any, b: any) => a.tmpOrder - b.tmpOrder)
                                    ?.map((v: any, i: any) => (
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
                                    )),
                            )}
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

    console.log('cookie')
    // console.log(cookie)
    const sessionCookie = cookie
        ?.split(';')
        .map((v) => v.trim())
        .filter((v) => v.split('=')[0] === 'session')

    try {
        console.log('~~~~~~~~~~DATA~~~~~~~~~~')
        const data = await loadMyInfoAPI()
        console.log(data)

        if (data) {
            return {
                props: {},
            }
        }
        return {
            redirect: {
                destination: '/about',
                permanent: false,
            },
        }
    } catch (err: any) {
        // 비로그인 상태라면 이대로.
        // let statusCode = err?.response?.status
        // console.log('=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-')
        // console.log(err?.response)
        // console.log('=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-')
        // console.error(err)

        if (sessionCookie) {
            console.log('session 쿠키 있으니까 그대로.')
            return {
                props: {},
            }
        } else {
            console.log('없어서 about 페이지로 이동.')
            return {
                redirect: {
                    destination: '/about',
                    permanent: false,
                },
            }
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
