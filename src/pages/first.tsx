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
import { useMutation, useQuery } from 'react-query'
import { loadRandomBookList } from '@apis/book'
import styled from '@emotion/styled'

const maxCheckedValue = 20

const First = () => {
    const router = useRouter()

    const { data: isFirst } = useQuery('isfirst', isFirstAPI, {
        staleTime: 30 * 60 * 1000, // 단위 ms
        refetchOnWindowFocus: false,
    })

    const tmpSeed = Math.ceil(Math.random() * 100)
    const { data: randomBooks } = useQuery(['ramdomBook'], () => loadRandomBookList(tmpSeed, 0, 99), {
        staleTime: 30 * 60 * 1000, // 단위 ms
        refetchOnWindowFocus: false,
    })

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
        if (isFirst === false) {
            router.push('/')
        }
    }, [isFirst])

    return (
        <AppLayout style={{ margin: '30px auto' }}>
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
                            // console.log(checked)
                            // console.log('-=----=-=--=-')
                            let checkedIsbnList = randomBooks
                                ?.filter((v: any, i: number) => checked.includes(i))
                                ?.map((v: any) => ({ isbn: v.isbn }))
                            // console.log(checkedIsbnList)
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
                    {randomBooks?.map((v: any, i: any) => (
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
                                    if (checked.includes(i)) {
                                        setChecked([...checked.filter((v) => v !== i)])
                                        setCount((prev) => prev - 1)

                                        setBtnDisabled(false)
                                    } else if (count < maxCheckedValue) {
                                        setChecked([...checked, i])
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
                                        filter: checked.includes(i) ? 'brightness(50%)' : 'initial',
                                        cursor: 'pointer',
                                    }}
                                />
                            </div>
                        </>
                    ))}
                </BooksContainer>
            </div>
        </AppLayout>
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
            props: {},
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
