import AppLayout from '@components/AppLayout'
import { Button, Modal, Table, Upload } from 'antd'
import { DeleteFilled, InboxOutlined } from '@ant-design/icons'
import { useState } from 'react'

// 느려지게 하는 주범
import 'antd/dist/antd.css'
import useModal from '@hooks/useModal'
import useInput from '@hooks/useInput'
import styled from '@emotion/styled'

const { Dragger } = Upload

const DeleteIconWrapper = styled.div`
    display: inline-flex;
    width: 40px;
    height: 40px;

    justify-content: center;
    align-items: center;

    cursor: pointer;
    border-radius: 50%;
    transition: all 0.4s;

    &:hover {
        background-color: rgba(0, 0, 0, 0.1);
    }
`

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
        isNicknameEditingModalVisible,
        ,
        showNicknameEditingModal,
        handleNicknameEditingModalOk,
        handleNicknameEditingModalCancel,
    ] = useModal()
    const [
        isPasswordEditingModalVisible,
        ,
        showPasswordEditingModal,
        handlePasswordEditingModalOk,
        handlePasswordEditingModalCancel,
    ] = useModal()
    const [
        isUserDeletingModalVisible,
        ,
        showUserDeletingModal,
        handleUserDeletingModalOk,
        handleUserDeletingModalCancel,
    ] = useModal()

    const [emailInput, onChangeEmailInput] = useInput('')
    const [nicknameInput, onChangeNicknameInput] = useInput('')
    const [passwordInput, onChangePasswordInput] = useInput('')

    // TODO: 각각 (email, nickname, password) 수정시 요청 로직과 state 비우는 콜백함수 생성하기

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
                                            okText="변경"
                                            cancelText="취소하기"
                                        >
                                            <p>변경할 이메일을 입력해주세요.</p>
                                            <input value={emailInput} onChange={onChangeEmailInput} />
                                        </Modal>
                                    </>
                                ),
                            },
                            {
                                title: '닉네임',
                                dataIndex: 'nickname',
                                key: 'nickname',
                                render: (text) => (
                                    <>
                                        <a onClick={showNicknameEditingModal}>{text}</a>
                                        <Modal
                                            title="닉네임 변경"
                                            visible={isNicknameEditingModalVisible}
                                            onOk={handleNicknameEditingModalOk}
                                            onCancel={handleNicknameEditingModalCancel}
                                            centered
                                            okText="변경"
                                            cancelText="취소하기"
                                        >
                                            <p>변경할 닉네임을 입력해주세요.</p>
                                            <input value={nicknameInput} onChange={onChangeNicknameInput} />
                                        </Modal>
                                    </>
                                ),
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
                                            <input value={passwordInput} onChange={onChangePasswordInput} />
                                        </Modal>
                                    </>
                                ),
                            },
                            {
                                title: '유저 삭제',
                                render: (text) => (
                                    <>
                                        <DeleteIconWrapper onClick={showUserDeletingModal}>
                                            <DeleteFilled style={{ color: '#fa5252' }} />
                                        </DeleteIconWrapper>
                                        <Modal
                                            title="유저 삭제"
                                            visible={isUserDeletingModalVisible}
                                            onOk={handleUserDeletingModalOk}
                                            onCancel={handleUserDeletingModalCancel}
                                            centered
                                            okText="삭제"
                                            cancelText="취소하기"
                                            okButtonProps={{
                                                type: 'primary',
                                                danger: true,
                                                style: { fontWeight: 'bold' }, // 이렇게 적용할 수 있음.
                                            }}
                                        >
                                            <p style={{ fontWeight: 'bold', fontSize: '16px' }}>
                                                정말로 유저를 삭제하시겠습니까?
                                            </p>
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
                    <Dragger accept=".csv">
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
                        okText="재학습"
                        cancelText="취소하기"
                    >
                        <p style={{ fontWeight: 'bold', fontSize: '16px' }}>지금 모델을 재학습 시키시겠습니까?</p>
                    </Modal>
                </div>
            </div>
        </AppLayout>
    )
}

export default Admin
