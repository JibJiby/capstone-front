import { loadMyCheckedBookList } from '@apis/book'
import AppLayout from '@components/AppLayout'
import BooksContainer from '@components/BooksContainer'
import styled from '@emotion/styled'
import { Button } from 'antd'
import { useRouter } from 'next/router'
import { useCallback, useEffect } from 'react'
import { useQuery } from 'react-query'

function MyInfo() {
    const router = useRouter()

    const { data: myBooks } = useQuery(['myBooks'], loadMyCheckedBookList, {
        // staleTime: 30 * 60 * 1000, // 단위 ms
        // refetchOnWindowFocus: false,
    })

    // const onBookImageClick = useCallback(() => {}, [])

    useEffect(() => {}, [])

    return (
        <AppLayout>
            {/* <div style={{ marginLeft: '130px' }}>
                <div>
                    <h3>나의 정보</h3>
                </div>
                <div>
                    <EditingMyInfoButton
                        onClick={() => {
                            router.push('/editmyinfo')
                        }}
                    >
                        {' '}
                        수정하러 가기
                    </EditingMyInfoButton>
                </div>
            </div> */}

            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    userSelect: 'none',
                    margin: '30px auto',
                }}
            >
                <h2>내가 찜한 도서들</h2>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <BooksContainer style={{ margin: '0 15px' }}>
                    {myBooks?.map((v, i) => (
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
        </AppLayout>
    )
}

export default MyInfo

const EditingMyInfoButton = styled.button`
    /* padding: '10px 15px', borderRadius: '8px', border: 'none' */
    padding: 10px 15px;
    border-radius: 8px;
    border: none;
    cursor: pointer;

    &:hover {
        opacity: 0.4;
        transition: all 0.2s ease-in;
    }
`
