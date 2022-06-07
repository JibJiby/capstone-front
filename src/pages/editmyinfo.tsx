import AppLayout from '@components/AppLayout'
import { Input } from 'antd'

const EditMyInfo = () => {
    return (
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
                    <h1 style={{ fontWeight: 'bold' }}>나의 정보 수정</h1>
                </div>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        border: '1px solid',
                        borderColor: '#ababab',
                        borderRadius: '12px',
                        margin: '20px 100px',
                        padding: '30px 100px',
                        alignItems: 'center',
                    }}
                >
                    <div style={{ marginBottom: '30px' }}>
                        <label style={{ marginRight: '15px' }}>이메일</label>
                        <Input />
                    </div>
                    <div style={{ marginBottom: '30px' }}>
                        <label style={{ marginRight: '15px' }}>비밀번호</label>
                        <Input />
                    </div>
                    <div style={{ marginBottom: '30px' }}>
                        <label style={{ marginRight: '15px' }}>비밀번호 확인</label>
                        <Input />
                    </div>
                    <div>
                        <button>수정하기</button>
                    </div>
                </div>
            </div>
        </AppLayout>
    )
}

export default EditMyInfo
