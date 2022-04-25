import { useRouter } from 'next/router'
import { bookImage } from '@data/fake-book'
import AppLayout from '@components/AppLayout'
import Image from 'next/image'
import styled from '@emotion/styled'

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
    const { id } = router.query

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
                    <div style={{ padding: '10px 25px', userSelect: 'none' }}>
                        <img src={id && !Array.isArray(id) ? bookImage[parseInt(id)] : undefined} />
                    </div>
                    <div style={{ marginTop: '20px' }}>
                        <div style={{ marginTop: '10px', fontSize: '24px', fontWeight: 'bold' }}>도서 제목</div>
                        <div style={{ marginTop: '14px', fontSize: '18px' }}>작가 / 출판사</div>
                        <div style={{ marginTop: '14px', fontSize: '11pt', height: '70px' }}>줄거리 ...</div>
                        <div style={{ marginTop: '14px', marginBottom: '15px', display: 'flex', gap: '10px' }}>
                            <Image src="/rating-star.png" width={40} height={40} />
                            <Image src="/rating-star.png" width={40} height={40} />
                            <Image src="/rating-star.png" width={40} height={40} />
                            <Image src="/rating-star.png" width={40} height={40} />
                            <Image src="/rating-star.png" width={40} height={40} />
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
                    <div style={{ display: 'inline-block', cursor: 'pointer' }}>
                        <Image src="/save-icon.png" width={20} height={20} />
                    </div>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                        <span style={{ fontWeight: 'bold', fontSize: '18px', letterSpacing: '.7px' }}>21,000</span>
                        <span style={{ fontSize: '24px' }}> 원</span>
                    </div>
                    <LinkButton>구매 링크</LinkButton>
                </div>
            </div>
        </AppLayout>
    )
}

export default Book
