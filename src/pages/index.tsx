import type { GetServerSidePropsContext, NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useInfiniteQuery, useQuery } from 'react-query'
import ClipLoader from 'react-spinners/ClipLoader'

import AppLayout from '@components/AppLayout'
import BackTop from '@components/BackTop'
import BooksContainer from '@components/BooksContainer'
import axios, { AxiosError } from 'axios'
import { loadMyInfoAPI } from '@apis/user'
import { loadRandomBookList } from '@apis/book'
import { isFirstAPI } from '@apis/likeslog'
import {
    bookImageContainerStyle,
    bookImageStyle,
    ContainerHeader,
    FullLoadingBackground,
} from '../styles/indexPageStyle'

const Home = ({ me }: { me?: any }) => {
    let tmpSeed = Math.ceil(Math.random() * 100)
    const router = useRouter()
    const { data: isFirst } = useQuery('isfirst', isFirstAPI)
    const { data: headerMe } = useQuery('user', loadMyInfoAPI)
    const { data: randomBooks, fetchNextPage } = useInfiniteQuery(
        ['ramdomBook'],
        ({ pageParam = 0 }) => {
            if (pageParam > 0) {
                tmpSeed = Number(JSON.parse(sessionStorage.getItem('seed')!))
            }
            return loadRandomBookList(
                tmpSeed,
                30 * pageParam,
                30 * (pageParam + 1) - 1,
            )
        },
        {
            cacheTime: 10 * 60 * 1000, // 단위 ms
            refetchOnWindowFocus: false,

            //infinite
            getNextPageParam: (lastPage, pages) => pages.length,
        },
    )

    useEffect(() => {
        function onScroll() {
            if (
                window.scrollY + document.documentElement.clientHeight >
                document.documentElement.scrollHeight - 400
            ) {
                fetchNextPage()
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
        console.log('isFirst  :: ', isFirst) // (처음)undefined -> (두번째)true
        if (isFirst === true) {
            router.push('/first')
        }
    }, [isFirst])

    return (
        <>
            {isFirst !== false || !headerMe ? (
                <FullLoadingBackground>
                    <ClipLoader loading />
                </FullLoadingBackground>
            ) : (
                <AppLayout me={me}>
                    <section>
                        <ContainerHeader>
                            <h1>유저님이 좋아하실 책들을 추천합니다.</h1>
                        </ContainerHeader>
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                            }}
                        >
                            <BooksContainer style={{ margin: '0 15px' }}>
                                {randomBooks?.pages &&
                                randomBooks?.pages instanceof Array
                                    ? randomBooks?.pages?.map((page) =>
                                          page
                                              ?.sort(sortByOrder)
                                              ?.map((v: any) => (
                                                  <div
                                                      key={v.imgUrl}
                                                      css={
                                                          bookImageContainerStyle
                                                      }
                                                  >
                                                      <img
                                                          src={v.imgUrl}
                                                          width="150px"
                                                          key={v.imgUrl}
                                                          css={bookImageStyle}
                                                          onClick={() => {
                                                              console.log(v)
                                                              router.push(
                                                                  `/book/${v.isbn}`,
                                                              )
                                                          }}
                                                      />
                                                  </div>
                                              )),
                                      )
                                    : null}
                            </BooksContainer>
                        </div>
                    </section>
                </AppLayout>
            )}

            <BackTop limit={500} />
        </>
    )
}

export default Home

export const getServerSideProps = async (
    context: GetServerSidePropsContext,
) => {
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
        .at(0)

    try {
        console.log('~~~~~~~~~~DATA~~~~~~~~~~')
        const data = await loadMyInfoAPI()
        console.log(data)

        if (data) {
            return {
                props: { me: data },
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
            console.log(sessionCookie)
            return {
                props: {},
            }
        } else {
            console.log('없어서 about 페이지로 이동.')
            console.log(sessionCookie)
            return {
                redirect: {
                    destination: '/about',
                    permanent: false,
                },
            }
        }
    }
}

function sortByOrder(a: any, b: any) {
    return a.tmpOrder - b.tmpOrder
}
