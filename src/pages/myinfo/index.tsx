import axios from 'axios'
import { GetServerSidePropsContext } from 'next'
import { useRouter } from 'next/router'
import { useQuery } from 'react-query'

import { loadMyCheckedBookList } from '@apis/book'
import { loadMyInfoAPI } from '@apis/user'
import AppLayout from '@components/AppLayout'
import BooksContainer from '@components/BooksContainer'
import { bookImageContainerStyle, EditingMyInfoButton } from './style'

function MyInfo({ me }: { me?: any }) {
    const router = useRouter()

    const { data: myBooks } = useQuery(['myBooks'], loadMyCheckedBookList)

    return (
        <AppLayout me={me} style={{ margin: '0 15px' }}>
            <div style={{ marginLeft: '130px', marginTop: '30px' }}>
                <header>
                    <h3>나의 정보</h3>
                </header>
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
            </div>

            <header
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    userSelect: 'none',
                    margin: '30px auto',
                }}
            >
                <h2>내가 찜한 도서들</h2>
            </header>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <BooksContainer>
                    {myBooks?.map((v: any) => (
                        <>
                            <div key={v.imgUrl} css={bookImageContainerStyle}>
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

        return {
            props: { me: data },
        }
    } catch (err: any) {
        return {
            props: {},
        }
    }
}
