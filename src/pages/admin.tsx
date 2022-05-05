import AppLayout from '@components/AppLayout'
import { Button, Modal, Table, Upload } from 'antd'
import { InboxOutlined } from '@ant-design/icons'
import { useState } from 'react'

// 느려지게 하는 주범
import 'antd/dist/antd.css'
import useModal from '@hooks/useModal'
import useInput from '@hooks/useInput'

const { Dragger } = Upload

const Admin = () => {
    const [isLearningModalVisible, , showLearningModal, handleLearningModalOk, handleLearningModalCancel] = useModal()
    const [
        isEmailEditingModalVisible,
        ,
        showEmailEditingModal,
        handleEmailEditingModalOk,
        handleEmailEditingModalCancel,
    ] = useModal()
    const [
        isPasswordEditingModalVisible,
        ,
        showPasswordEditingModal,
        handlePasswordEditingModalOk,
        handlePasswordEditingModalCancel,
    ] = useModal()

    const [emailInput, onChangeEmailInput] = useInput('')
    const [passwordInput, onChangePasswordInput] = useInput('')

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
                            {
                                title: '이메일',
                                dataIndex: 'email',
                                key: 'email',
                                render: (text) => (
                                    <>
                                        <a onClick={showEmailEditingModal}>{text}</a>
                                        <Modal
                                            title="이메일 변경"
                                            visible={isEmailEditingModalVisible}
                                            onOk={handleEmailEditingModalOk}
                                            onCancel={handleEmailEditingModalCancel}
                                            centered
                                        >
                                            <p>변경할 이메일을 입력해주세요.</p>
                                            <input value={emailInput} onChange={onChangeEmailInput}/>
                                        </Modal>
                                    </>
                                ),
                            },
                            {
                                title: '닉네임',
                                dataIndex: 'nickname',
                                key: 'nickname',
                            },
                            {
                                title: '패스워드',
                                render: (text) => (
                                    <>
                                        <Button danger onClick={showPasswordEditingModal}>
                                            변경
                                        </Button>
                                        <Modal
                                            title="비밀번호 변경"
                                            visible={isPasswordEditingModalVisible}
                                            onOk={handlePasswordEditingModalOk}
                                            onCancel={handlePasswordEditingModalCancel}
                                            centered
                                        >
                                            <p style={{ fontWeight: 'bold', fontSize: '16px' }}>
                                                유저의 비밀번호를 수정하시겠습니까?
                                            </p>
                                            <input style={{ border: 'none' }} />
                                        </Modal>
                                    </>
                                ),
                            },
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
            <div style={{ marginBottom: '20px', marginLeft: '15px', marginTop: '20px' }}>
                <div style={{ fontSize: '24px', fontWeight: 'bold' }}>모델 재학습</div>
                <div style={{ margin: '15px 10px' }}>
                    <Button type="primary" size="large" style={{ fontWeight: 'bold' }} onClick={showLearningModal}>
                        갱신하기
                    </Button>
                    <Modal
                        title="모델 재학습"
                        visible={isLearningModalVisible}
                        onOk={handleLearningModalOk}
                        onCancel={handleLearningModalCancel}
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
