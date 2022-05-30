import AppLayout from '@components/AppLayout'
import { bookImage } from '../data/fake-book'
import { Progress } from 'antd'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import BooksContainer from '@components/BooksContainer'
import { GetServerSidePropsContext } from 'next'
import axios from 'axios'
import { loadMyInfoAPI } from '@apis/user'
import { isFirstAPI } from '@apis/likeslog'

// import 'antd/lib/progress/style/index.css'

const First = () => {
    const router = useRouter()

    const [count, setCount] = useState(0)
    const [checked, setChecked] = useState<Array<number>>([])

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

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
    console.log('first 페이지!!!')
    
    const cookie = context.req ? context.req.headers.cookie : '';
    axios.defaults.headers.common.cookie = '';
    if (context.req && cookie) {
      axios.defaults.headers.common.cookie = cookie;
    }

    try {
        // FIXME: 내 정보 가져오는 거 말고, 최초 시행 유무 가져오기.
        const data = await loadMyInfoAPI();
        if (data) {

            // FIXME: 리다이렉션 수 많은 문제
            // const isFirst = await isFirstAPI()
            // if(isFirst) {
            //     return {
            //         redirect: {
            //             destination: '/first',
            //             permanent: false,
            //         }
            //     }
            // } 

            // 이미 로그인한 상태라면
            return {
                redirect: {
                    destination: '/',
                    permanent: false,
                }
            }
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
            }
        };
    }
}
