import { useRouter } from 'next/router'
import { bookImage } from '@data/fake-book'
import AppLayout from '@components/AppLayout'

const Book = () => {
    const router = useRouter()
    const { id } = router.query

    return (
        <AppLayout>
            <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                <div style={{ marginBottom: '30px', userSelect: 'none' }}>
                    <h1>상세 정보</h1>
                </div>
                <div>
                    {/* FIXME: src 타입 */}
                    <img src={id && !Array.isArray(id) ? bookImage[parseInt(id)] : undefined} />
                </div>
            </div>
        </AppLayout>
    )
}

export default Book
