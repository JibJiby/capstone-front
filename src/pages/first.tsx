import AppLayout from '@components/AppLayout'
import { bookImage } from '../data/fake-book'
import { Progress } from 'antd'
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

    const tmpSeed = Math.ceil(Math.random() * 100)
    const { data: randomBooks } = useQuery(['ramdomBook'], () => loadRandomBookList(tmpSeed, 0, 99), {
        staleTime: 30 * 60 * 1000, // 단위 ms
        refetchOnWindowFocus: false,
    })
    const { data: isFirst } = useQuery('isfirst', isFirstAPI)

    const mutation = useMutation<Promise<any>, AxiosError, Array<{ isbn: string }>>(checkFirstBooks, {
        onMutate: () => {},
        onSuccess: () => {
            router.push('/')
        },
    })

    const [count, setCount] = useState(0)
    const [checked, setChecked] = useState<Array<number>>([])
    const [btnDisabled, setBtnDisabled] = useState(false)

    useEffect(() => {
        // TODO: ssr 로 이동
        if (isFirst) {
            router.push('/first')
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
                <Progress percent={count * maxCheckedValue} />
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
                                .filter((v, i) => checked.includes(i))
                                .map((v) => ({ isbn: v.isbn }))
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
    console.log('first 페이지!!!')

    const cookie = context.req ? context.req.headers.cookie : ''
    axios.defaults.headers.common.cookie = ''
    if (context.req && cookie) {
        axios.defaults.headers.common.cookie = cookie
    }

    try {
        // // FIXME: 내 정보 가져오는 거 말고, 최초 시행 유무 가져오기.
        // const data = await loadMyInfoAPI()
        // if (data) {
        //     // FIXME: 리다이렉션 수 많은 문제
        //     // const isFirst = await isFirstAPI()
        //     // if(isFirst) {
        //     //     return {
        //     //         redirect: {
        //     //             destination: '/first',
        //     //             permanent: false,
        //     //         }
        //     //     }
        //     // }

        //     // 이미 로그인한 상태라면
        //     return {
        //         redirect: {
        //             destination: '/',
        //             permanent: false,
        //         },
        //     }
        // }

        return {
            props: {},
        }
    } catch (err) {
        // 비로그인 상태라면 이대로.
        // FIXME: 여기서 항상 에러
        console.log('first 에러!!!!')
        console.log(err)
        return {
            redirect: {
                destination: '/about',
                permanent: false,
            },
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
