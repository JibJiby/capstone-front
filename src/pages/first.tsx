import AppLayout from '@components/AppLayout'
import { NextPage } from 'next'
import { bookImage } from '../data/fake-book'

const First: NextPage = () => {
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
                <h1>관심 있는 도서를 선택해주세요</h1>
            </div>

            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: '10px 10px',
                }}
            >
                <div
                    style={{
                        // grid
                        // https://studiomeal.com/archives/533
                        display: 'grid',

                        gridTemplateColumns: 'repeat(4, 220px)',
                        // gridTemplateRows: 'repeat(auto-fill, 300px)',

                        rowGap: '50px',
                    }}
                >
                    {/* 원하는 레이아웃 */}
                    {/* https://heeyamsec.tistory.com/37 */}
                    {bookImage.map((v, i) => (
                        <div style={{ cursor: 'pointer' }} key={i}>
                            <img src={v} height={180} width={150} />
                        </div>
                    ))}
                </div>
            </div>
        </AppLayout>
    )
}

export default First
