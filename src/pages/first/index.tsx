import { message, Progress } from 'antd'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { GetServerSidePropsContext } from 'next'
import axios, { AxiosError } from 'axios'
import { useInfiniteQuery, useMutation, useQuery } from 'react-query'
import { ClipLoader } from 'react-spinners'

import BooksContainer from '@components/BooksContainer'
import AppLayout from '@components/AppLayout'
import { loadMyInfoAPI } from '@apis/user'
import { checkFirstBooks, isFirstAPI } from '@apis/likeslog'
import { loadRandomBookList } from '@apis/book'
import {
    bookImageContainerStyle,
    FirstPageMainContainer as MainContainer,
    FullLoadingBackground,
    instructionHeaderStyle,
    NextButton,
    ProgressContainer,
} from './style'

import 'antd/lib/progress/style/index.css'

const maxCheckedValue = 10

const First = ({ me }: { me?: any }) => {
    const router = useRouter()

    const { data: headerMe } = useQuery('user', loadMyInfoAPI)
    const { data: isFirst } = useQuery('isfirst', isFirstAPI)

    let tmpSeed = Math.ceil(Math.random() * 100)

    const {
        data: randomBooks,
        fetchNextPage,
        isLoading,
    } = useInfiniteQuery(
        ['first', 'ramdomBook'],
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

    const mutation = useMutation<
        Promise<any>,
        AxiosError,
        Array<{ isbn: string }>
    >(checkFirstBooks, {
        onMutate: () => {},
        onSuccess: () => {
            router.push('/learning')
            message.info('선호 도서을 충분히 선택하셨습니다!')
        },
    })

    const [count, setCount] = useState(0)
    const [checked, setChecked] = useState<Array<number>>([])
    const [btnDisabled, setBtnDisabled] = useState(false)

    useEffect(() => {
        // 상단 이동
        window.onbeforeunload = function pushRefresh() {
            window.scrollTo(0, 0)
        }

        sessionStorage.setItem('seed', JSON.stringify(tmpSeed))
    }, [])

    useEffect(() => {
        function onScroll() {
            if (
                window.scrollY + document.documentElement.clientHeight >
                document.documentElement.scrollHeight - 400
            ) {
                if (!isLoading) {
                    fetchNextPage()
                }
            }
        }
        window.addEventListener('scroll', onScroll)

        return () => {
            window.removeEventListener('scroll', onScroll)
        }
    }, [isLoading])

    useEffect(() => {
        if (isFirst === false) {
            router.push('/')
        }
    }, [isFirst])

    return (
        <>
            {isFirst !== true || !headerMe ? (
                <FullLoadingBackground>
                    <ClipLoader loading />
                </FullLoadingBackground>
            ) : (
                <AppLayout style={{ margin: '30px auto' }} me={me}>
                    <header css={instructionHeaderStyle}>
                        <h1>관심 있는 도서를 선택해주세요</h1>
                    </header>

                    <ProgressContainer>
                        <Progress
                            percent={Math.floor(
                                (count / maxCheckedValue) * 100,
                            )}
                        />
                    </ProgressContainer>

                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            userSelect: 'none',
                            margin: '30px auto',
                        }}
                    >
                        {btnDisabled ? (
                            <NextButton
                                onClick={() => {
                                    let checkedIsbnList = randomBooks?.pages
                                        ?.map((page) =>
                                            page.map((v: any) => ({
                                                isbn: v.isbn,
                                                tmpOrder: v.tmpOrder,
                                            })),
                                        )
                                        .flat()
                                        .filter((v: any) =>
                                            checked.includes(v.tmpOrder),
                                        )
                                        .map((v: any) => ({ isbn: v.isbn }))

                                    mutation.mutate(checkedIsbnList!)
                                }}
                            >
                                보러 가기
                            </NextButton>
                        ) : (
                            <NextButton disabled>보러 가기</NextButton>
                        )}
                    </div>

                    <MainContainer>
                        <BooksContainer style={{ margin: '0 15px' }}>
                            {randomBooks?.pages &&
                            randomBooks.pages instanceof Array
                                ? randomBooks?.pages?.map((page) =>
                                      page?.sort(sortByOrder)?.map((v: any) => (
                                          <div
                                              key={v.imgUrl}
                                              css={bookImageContainerStyle}
                                              onClick={() => {
                                                  if (
                                                      checked.includes(
                                                          v.tmpOrder,
                                                      )
                                                  ) {
                                                      setChecked([
                                                          ...checked.filter(
                                                              (t) =>
                                                                  t !==
                                                                  v.tmpOrder,
                                                          ),
                                                      ])
                                                      setCount(
                                                          (prev) => prev - 1,
                                                      )

                                                      setBtnDisabled(false)
                                                  } else if (
                                                      count < maxCheckedValue
                                                  ) {
                                                      setChecked([
                                                          ...checked,
                                                          v.tmpOrder,
                                                      ])
                                                      setCount(
                                                          (prev) => prev + 1,
                                                      )

                                                      if (
                                                          count + 1 ==
                                                          maxCheckedValue
                                                      ) {
                                                          setBtnDisabled(true)
                                                      }
                                                  }
                                              }}
                                          >
                                              <img
                                                  src={v.imgUrl}
                                                  width="150px"
                                                  key={v.imgUrl}
                                                  style={{
                                                      filter: checked.includes(
                                                          v.tmpOrder,
                                                      )
                                                          ? 'brightness(50%)'
                                                          : 'initial',
                                                      cursor: 'pointer',
                                                  }}
                                              />
                                          </div>
                                      )),
                                  )
                                : null}
                        </BooksContainer>
                    </MainContainer>
                </AppLayout>
            )}
        </>
    )
}

export default First

export const getServerSideProps = async (
    context: GetServerSidePropsContext,
) => {
    const cookie = context.req ? context.req.headers.cookie : ''
    axios.defaults.headers.common.cookie = ''
    if (context.req && cookie) {
        axios.defaults.headers.common.cookie = cookie
    }

    try {
        const data = await loadMyInfoAPI() // 401 에러
        // console.log(' ============ getServerSideProps  data ============')
        // console.log(data)

        const isFirst = await isFirstAPI()
        console.log(' ============ getServerSideProps  isFirst ============')
        console.log(isFirst)

        if (!isFirst) {
            return {
                redirect: {
                    destination: '/',
                },
            }
        }

        return {
            props: { me: data },
        }
    } catch (err) {
        // if (statusCode === 401) {
        //     return {
        //         redirect: {
        //             destination: '/about',
        //         },
        //     }
        // }
        return {
            props: {},
        }
    }
}

function sortByOrder(a: any, b: any) {
    return a.tmpOrder - b.tmpOrder
}
