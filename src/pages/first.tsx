import AppLayout from '@components/AppLayout'
import { bookImage } from '../data/fake-book'
import { message, Progress } from 'antd'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import BooksContainer from '@components/BooksContainer'
import { GetServerSidePropsContext } from 'next'
import axios, { AxiosError } from 'axios'
import { loadMyInfoAPI } from '@apis/user'
import { checkFirstBooks, isFirstAPI } from '@apis/likeslog'

import 'antd/lib/progress/style/index.css'
import { useInfiniteQuery, useMutation, useQuery } from 'react-query'
import { loadRandomBookList } from '@apis/book'
import styled from '@emotion/styled'
import { ClipLoader } from 'react-spinners'

const maxCheckedValue = 10

const First = ({ me }: { me?: any }) => {
    const router = useRouter()

    const { data: isFirst } = useQuery('isfirst', isFirstAPI, {
        // staleTime: 30 * 60 * 1000, // 단위 ms
        // refetchOnWindowFocus: false,
    })

    let tmpSeed = Math.ceil(Math.random() * 100)

    const {
        data: randomBooks,
        fetchNextPage,
        refetch,
    } = useInfiniteQuery(
        ['first', 'ramdomBook'],
        ({ pageParam = 0 }) => {
            if (pageParam > 0) {
                tmpSeed = Number(JSON.parse(sessionStorage.getItem('seed')!))
            }
            return loadRandomBookList(tmpSeed, 30 * pageParam, 30 * (pageParam + 1) - 1)
        },
        {
            cacheTime: 10 * 60 * 1000, // 단위 ms
            refetchOnWindowFocus: false,

            //infinite
            getNextPageParam: (lastPage, pages) => 1,
        },
    )

    console.log('randomBooks')
    console.log(randomBooks)

    const mutation = useMutation<Promise<any>, AxiosError, Array<{ isbn: string }>>(checkFirstBooks, {
        onMutate: () => {},
        onSuccess: () => {
            router.push('/')
            message.info('선호 도서을 충분히 선택하셨습니다!')
        },
    })

    const [count, setCount] = useState(0)
    const [checked, setChecked] = useState<Array<number>>([])
    const [btnDisabled, setBtnDisabled] = useState(false)

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
    }, [])

    useEffect(() => {
        if (isFirst === false) {
            router.push('/')
        }
    }, [isFirst])

    return (
        <>
            {isFirst !== true ? (
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
                </div>
            ) : (
                <AppLayout style={{ margin: '30px auto' }} me={me}>
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            userSelect: 'none',
                            margin: '30px auto',
                        }}
                    >
                        <h1>관심 있는 도서를 선택해주세요</h1>
                    </div>

                    <ProgressContainer>
                        <Progress percent={Math.floor((count / maxCheckedValue) * 100)} />
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
                                    console.log(checked)
                                    // console.log('-=----=-=--=-')

                                    let randomBooksIsbnList = randomBooks?.pages
                                    let checkedIsbnList = randomBooks?.pages
                                        ?.map((page) => page.map((v: any) => ({ isbn: v.isbn, tmpOrder: v.tmpOrder })))
                                        .flat()
                                        .filter((v: any) => checked.includes(v.tmpOrder))
                                        .map((v: any) => ({ isbn: v.isbn }))
                                    console.log(randomBooksIsbnList)

                                    mutation.mutate(checkedIsbnList)
                                }}
                            >
                                보러 가기
                            </NextButton>
                        ) : (
                            <NextButton disabled>보러 가기</NextButton>
                        )}
                    </div>

                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            padding: '10px 10px',
                        }}
                    >
                        <BooksContainer style={{ margin: '0 15px' }}>
                            {randomBooks?.pages && randomBooks.pages instanceof Array
                                ? randomBooks?.pages?.map((page) =>
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
                                                      onClick={() => {
                                                          if (checked.includes(v.tmpOrder)) {
                                                              setChecked([...checked.filter((t) => t !== v.tmpOrder)])
                                                              setCount((prev) => prev - 1)

                                                              setBtnDisabled(false)
                                                          } else if (count < maxCheckedValue) {
                                                              setChecked([...checked, v.tmpOrder])
                                                              setCount((prev) => prev + 1)

                                                              if (count + 1 == maxCheckedValue) {
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
                                                              filter: checked.includes(v.tmpOrder)
                                                                  ? 'brightness(50%)'
                                                                  : 'initial',
                                                              cursor: 'pointer',
                                                          }}
                                                      />
                                                  </div>
                                              </>
                                          )),
                                  )
                                : null}
                        </BooksContainer>
                    </div>
                </AppLayout>
            )}
        </>
    )
}

export default First

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
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
    } catch (err: any) {
        // if (statusCode === 401) {
        //     return {
        //         redirect: {
        //             destination: '/about',
        //         },
        //     }
        // }
        return {
            //
            props: {},
        }
    }
}

const ProgressContainer = styled.div`
    margin: 0 150px;
    margin-bottom: 100px;
    display: flex;
    justify-content: center;

    @media screen and (min-width: 1032px) {
        //FIXME:
        margin-left: 30%;
        margin-right: 30%;
    }
`

const NextButton = styled.button`
    width: 200px;
    height: 2.5rem;
    margin: 15px auto;
    border: 0px;
    border-radius: 6px;
    font-size: 20px;
    background-color: rgb(0, 28, 52);
    color: white;
    font-weight: bold;
    user-select: none;
    cursor: pointer;
    transition: all 0.5s ease 0s;

    &:disabled {
        cursor: not-allowed;
        background-color: rgb(198, 198, 198);
    }
`
