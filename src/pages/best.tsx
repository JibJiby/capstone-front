import AppLayout from '@components/AppLayout'
import BackTop from '@components/BackTop'
import BooksContainer from '@components/BooksContainer'
import { Dropdown, Menu, Button } from 'antd'
import { useEffect } from 'react'
import { bookImage } from '../data/fake-book'



function Best() {
    // Infinite Scroll
    useEffect(() => {
        function onScroll() {
            // scrollY는 현재 포인트(상단 기준)
            // clientHeight (간단히 브라우저 높이. 고정값)
            // scrollHeight (페이지 가장 아래. 고정값. 하단 기준)
            if (window.scrollY + document.documentElement.clientHeight > document.documentElement.scrollHeight - 300) {
                // TODO: 더 불러오기 API (throttling)
                console.log('더 불러왔음')
            }
        }
        window.addEventListener('scroll', onScroll)
        return () => {
            window.removeEventListener('scroll', onScroll)
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
                        <h1 style={{ fontWeight: 'bold' }}>현재 유행중인 책들입니다.</h1>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '50px' }}>
                        <Dropdown
                            overlay={
                                <Menu>
                                    <Menu.Item>자기 계발</Menu.Item>
                                </Menu>
                            }
                        >
                            <Button>대분류</Button>
                        </Dropdown>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <BooksContainer style={{ margin: '0 15px' }}>
                            {bookImage.map((v, i) => (
                                <>
                                    <div
                                        key={v}
                                        style={{
                                            marginBottom: '50px',
                                            display: 'flex',
                                            justifyContent: 'center',

                                            userSelect: 'none',
                                            position: 'relative',
                                        }}
                                    >
                                        <img src={v} width={600} style={{ cursor: 'pointer' }} />
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

export default Best
