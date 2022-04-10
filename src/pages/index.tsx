import type { NextPage } from 'next'
import AppLayout from '@components/AppLayout'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { bookImage } from '@data/fake-book'
import BackTop from '@components/BackTop'
import styled from '@emotion/styled'

const Home = ({ isCompleted }: { isCompleted: boolean }) => {
    const router = useRouter()

    const [myBooks, setMyBooks] = useState([...bookImage])

    console.log('isCompleted')
    console.log(isCompleted)

    useEffect(() => {
        if (!isCompleted) {
            router.push('/first')
        }
    }, [])

    return (
        <>
            <AppLayout>
                <div>
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            marginTop: '30px',
                            marginBottom: '45px',

                            userSelect: 'none',
                        }}
                    >
                        <h1 style={{ fontWeight: 'bold' }}>유저님이 좋아하실 책들을 추천합니다.</h1>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <BooksContainer style={{ margin: '0 15px' }}>
                            {myBooks.map((v, i) => (
                                <>
                                    <div
                                        key={i}
                                        style={{
                                            marginBottom: '50px',
                                            display: 'flex',
                                            justifyContent: 'center',

                                            userSelect: 'none',
                                            position: 'relative',
                                        }}
                                    >
                                        <img src={v} width={600} style={{ cursor: 'pointer' }} />
                                        <div
                                            style={{
                                                position: 'absolute',
                                                top: 0,
                                                right: 0,

                                                width: '20px',
                                                height: '20px',

                                                backgroundColor: '#e9ecef',
                                                textAlign: 'center',
                                            }}
                                            onClick={() => setMyBooks([...myBooks.filter((v, j) => j !== i)])}
                                        >
                                            x
                                        </div>
                                    </div>
                                </>
                            ))}
                        </BooksContainer>
                    </div>
                </div>
            </AppLayout>
            <BackTop limit={500} />
        </>
    )
}

export default Home

export async function getStaticProps() {
    const res = await fetch('https://jsonplaceholder.typicode.com/todos/10')
    const data = await res.json()
    console.log('미리 가져오기')
    console.log(data)

    return {
        props: { isCompleted: data.completed }, // will be passed to the page component as props
    }
}

const BooksContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 150px);

    column-gap: 50px;
    row-gap: 50px;

    @media screen and (min-width: 768px) and (max-width: 1023px) {
        column-gap: 40px;
    }

    @media screen and (min-width: 676px) and (max-width: 767px) {
        grid-template-columns: repeat(3, 150px);
    }

    @media screen and (min-width: 480px) and (max-width: 675px) {
        grid-template-columns: repeat(2, 150px);
    }

    @media screen and (max-width: 479px) {
        grid-template-columns: repeat(1, 150px);
    }
`
