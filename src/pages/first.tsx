import AppLayout from '@components/AppLayout'
import { NextPage } from 'next'
import { bookImage } from '../data/fake-book'
import { Progress } from 'antd'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import BooksContainer from '@components/BooksContainer'

const First = ({ isFirstDone }: { isFirstDone: boolean }) => {
    const router = useRouter()

    const [count, setCount] = useState(0)
    const [checked, setChecked] = useState<Array<number>>([])

    useEffect(() => {
        if (isFirstDone) {
            // 이미 샘플 도서 선택한 이력 있으면 홈 페이지로 이동.
            router.push('/')
        }
    }, [])

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
                    margin: '0 150px',
                    marginBottom: '100px',
                    // width: '70%',
                    display: 'flex',
                    justifyContent: 'center',
                }}
            >
                <Progress percent={count * 10} />
            </div>

            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: '10px 10px',
                }}
            >
                <BooksContainer
                    style={
                        {
                            // grid
                            // https://studiomeal.com/archives/533
                            // gridTemplateRows: 'repeat(auto-fill, 300px)',
                        }
                    }
                >
                    {/* 원하는 레이아웃 */}
                    {/* https://heeyamsec.tistory.com/37 */}
                    {bookImage.map((v, i) => (
                        <div
                            style={{
                                cursor: 'pointer',
                                // backgroundColor: checked.includes(i) ? 'yellow' : 'initial'
                            }}
                            key={i}
                            onClick={() => {
                                if (checked.includes(i)) {
                                    setChecked([...checked.filter((v) => v !== i)])
                                    setCount((prev) => prev - 1)
                                } else if (count < 10) {
                                    setChecked([...checked, i])
                                    setCount((prev) => prev + 1)
                                }
                            }}
                        >
                            <img
                                src={v}
                                height={180}
                                width={150}
                                style={{ filter: checked.includes(i) ? 'brightness(50%)' : 'initial' }}
                            />
                        </div>
                    ))}
                </BooksContainer>
            </div>
        </AppLayout>
    )
}

export default First

export async function getStaticProps() {
    // TODO: first 유무 확인하는 api 날리고
    // const res = await fetch('https://jsonplaceholder.typicode.com/todos/10')
    // const isFirstDone = await res.json()
    const isFirstDone = false

    return {
        props: { isFirstDone }, // will be passed to the page component as props
    }
}
