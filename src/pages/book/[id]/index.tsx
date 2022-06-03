import { useRouter } from 'next/router'
import { bookImage } from '@data/fake-book'
import AppLayout from '@components/AppLayout'
import Image from 'next/image'
import styled from '@emotion/styled'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { confirmCheckedBookAPI, loadOneBookInfo } from '@apis/book'
import { toggleLikesAPI } from '@apis/likeslog'
import { useCallback } from 'react'

const LinkButton = styled.button`
    cursor: pointer;
    height: 40px;
    width: 100px;
    font-weight: bold;
    background-color: #212529;
    border: none;
    border-radius: 6px;
    color: white;
    font-size: 18px;

    transition: 0.3s;

    &:hover {
        opacity: 0.8;
    }
`

const Book = () => {
    const router = useRouter()
    const queryClient = useQueryClient()

    const { id: isbn } = router.query

    const { data: bookInfo } = useQuery(['book', isbn], () => loadOneBookInfo(isbn as string))
    const { data: isChecked } = useQuery(['checked', isbn], () => confirmCheckedBookAPI(isbn as string))

    const mutation = useMutation(toggleLikesAPI, {
        onMutate: () => {
            //
        },
        onError: () => {
            //
        },
        onSuccess: (result) => {
            console.log('mutate success  ')
            console.log(result)

            if (result === 'unchecked') {
                queryClient.setQueryData(['checked', isbn], false)
            } else if (result === 'checked') {
                queryClient.setQueryData(['checked', isbn], true)
            } else {
                console.log('=======================')
                console.log('예외 값  :: ', result)
                console.log('=======================')
            }
        },
        onSettled: () => {
            //
        },
    })

    const onClickLikesButton = useCallback(() => {
        // console.log('on click likes')
        // console.log(isbn)
        mutation.mutate(isbn as string)
    }, [mutation, isbn])

    return (
        <AppLayout>
            <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                <div
                    style={{
                        marginBottom: '30px',
                        marginTop: '40px',
                        backgroundColor: '#f1f3f5',
                        display: 'flex',
                        width: '70%',
                        borderRadius: '8px',
                    }}
                >
                    <div
                        style={{
                            padding: '10px 25px',
                            userSelect: 'none',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        {/* <img src={id && !Array.isArray(id) ? bookImage[parseInt(id)] : undefined} /> */}
                        <img src={bookInfo?.imgUrl} style={{ width: '130px' }} />
                    </div>
                    <div style={{ marginTop: '20px' }}>
                        <div style={{ marginTop: '10px', fontSize: '24px', fontWeight: 'bold' }}>{bookInfo?.title}</div>
                        <div style={{ marginTop: '14px', fontSize: '18px' }}>
                            {bookInfo?.author} {bookInfo && '/'} {bookInfo?.publisher}
                        </div>
                        <div style={{ marginTop: '14px', fontSize: '11pt', height: '70px' }}>
                            {(bookInfo ? bookInfo?.info?.slice(0, 100) : '') +
                                (bookInfo?.info?.length > 100 ? ' ...' : '')}
                        </div>
                        <div style={{ marginTop: '14px', marginBottom: '15px', display: 'flex', gap: '10px' }}>
                            {/* TODO: rating에 맞게 보여줘야 함 */}
                            {bookInfo ? (
                                Array(Math.round(bookInfo.average / 2))
                                    .fill()
                                    .map((_) => <Image src="/rating-star.png" width={40} height={40} />)
                            ) : (
                                <></>
                            )}
                        </div>
                    </div>
                </div>
                <div
                    style={{
                        display: 'flex',
                        width: '70%',
                        justifyContent: 'end',
                        userSelect: 'none',
                        gap: '20px',
                        alignItems: 'center',
                    }}
                >
                    <div style={{ display: 'inline-block', cursor: 'pointer' }} onClick={onClickLikesButton}>
                        {isChecked ? (
                            <Image src="/checked-save-icon.png" width={20} height={20} />
                        ) : (
                            <Image src="/save-icon.png" width={20} height={20} />
                        )}
                    </div>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                        <span style={{ fontWeight: 'bold', fontSize: '18px', letterSpacing: '.7px' }}>
                            {bookInfo?.list_price}
                        </span>
                        <span style={{ fontSize: '24px' }}> 원</span>
                    </div>
                    <LinkButton
                        onClick={() => {
                            window.open(`https://book.naver.com/search/search.naver?query=${bookInfo?.isbn}`, '_blank')
                        }}
                    >
                        구매 링크
                    </LinkButton>
                </div>
            </div>
        </AppLayout>
    )
}

export default Book
