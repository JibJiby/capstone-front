import { loadMyCheckedBookList } from '@apis/book'
import AppLayout from '@components/AppLayout'
import BooksContainer from '@components/BooksContainer'
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
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    userSelect: 'none',
                    margin: '30px auto',
                }}
            >
                <h1>내가 찜한 도서들</h1>
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
