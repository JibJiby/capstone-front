import AppLayout from '@components/AppLayout'
import { Button, Modal, Table, Upload } from 'antd'
import { InboxOutlined } from '@ant-design/icons'
import { useState } from 'react'

const { Dragger } = Upload

const Admin = () => {
    const [isModalVisible, setIsModalVisible] = useState(false)

    const showModal = () => {
        setIsModalVisible(true)
    }

    const handleOk = () => {
        setIsModalVisible(false)
    }

    const handleCancel = () => {
        setIsModalVisible(false)
    }

    return (
        <AppLayout>
            <div style={{ marginTop: '10px', marginBottom: '20px', marginLeft: '15px' }}>
                <div style={{ fontSize: '24px', fontWeight: 'bold' }}>유저 관리</div>
                <div style={{ margin: '10px 10px' }}>
                    <Table
                        dataSource={[
                            {
                                key: '1',
                                email: 'user01@email.com',
                                nickname: 'user01',
                            },
                            {
                                key: '2',
                                email: 'user02@email.com',
                                nickname: 'user02',
                            },
                        ]}
                        columns={[
                            { title: '이메일', dataIndex: 'email', key: 'email' },
                            { title: '닉네임', dataIndex: 'nickname', key: 'nickname' },
                            { title: '패스워드', render: (text) => <Button danger>변경</Button> },
                        ]}
                    />
                </div>
            </div>
            <div style={{ marginBottom: '20px', marginLeft: '15px' }}>
                <div style={{ fontSize: '24px', fontWeight: 'bold' }}>베스트셀러 업데이트</div>
                <div style={{ margin: '10px auto' }}>
                    <Dragger>
                        <InboxOutlined style={{ fontSize: '300%' }} />
                        <div style={{ fontSize: '18px', fontWeight: 'bold' }}>CSV 파일을 업로드 해주세요</div>
                    </Dragger>
                </div>
            </div>
            <div style={{ marginBottom: '20px', marginLeft: '15px' }}>
                <div style={{ fontSize: '24px', fontWeight: 'bold' }}>모델 재학습</div>
                <div style={{ margin: '10px 10px' }}>
                    <Button type="primary" size="large" style={{ fontWeight: 'bold' }} onClick={showModal}>
                        갱신하기
                    </Button>
                    <Modal
                        title="모델 재학습"
                        visible={isModalVisible}
                        onOk={handleOk}
                        onCancel={handleCancel}
                        centered
                    >
                        <p style={{ fontWeight: 'bold', fontSize: '16px' }}>지금 모델을 재학습 시키시겠습니까?</p>
                    </Modal>
                </div>
            </div>
        </AppLayout>
    )
}

export default Admin
