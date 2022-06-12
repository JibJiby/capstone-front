import { loadMyInfoAPI } from '@apis/user'
import AppLayout from '@components/AppLayout'
import styled from '@emotion/styled'
import { Input, Button, DatePicker, DatePickerProps } from 'antd'
import { useQuery } from 'react-query'
import { useCallback, useState } from 'react'
import moment from 'moment'

import 'antd/lib/button/style/index.css'
import 'antd/lib/input/style/index.css'
import 'antd/lib/date-picker/style/index.css'

const EditMyInfo = () => {
    const [bookDate, setBookDate] = useState(moment())

    const { data: headerMe } = useQuery('user', loadMyInfoAPI, {})

    const onDateChange: DatePickerProps['onChange'] = (date, dateString) => {
        if (date) {
            setBookDate(date)
        }
    }

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
                <EditFormContainer>
                    <div style={{ marginBottom: '30px' }}>
                        <label style={{ marginRight: '15px', fontWeight: 'bold' }}>이메일</label>
                        <Input value={headerMe?.email} readOnly style={{ cursor: 'not-allowed' }} />
                    </div>
                    <div style={{ marginBottom: '30px' }}>
                        <label style={{ marginRight: '15px', fontWeight: 'bold' }}>비밀번호</label>
                        <Input type="password" />
                    </div>
                    <div style={{ marginBottom: '30px' }}>
                        <label style={{ marginRight: '15px', fontWeight: 'bold' }}>비밀번호 확인</label>
                        <Input type="password" />
                    </div>
                    <div style={{ marginBottom: '30px' }}>
                        <label style={{ marginRight: '15px', fontWeight: 'bold', display: 'block' }}>북데이</label>
                        <DatePicker
                            size="large"
                            style={{ marginTop: '10px' }}
                            onChange={onDateChange}
                            value={bookDate}
                        />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <Button type="primary" size="large">
                            수정하기
                        </Button>
                    </div>
                </EditFormContainer>
            </div>
        </AppLayout>
    )
}

export default EditMyInfo

const EditFormContainer = styled.div`
    display: flex;
    flex-direction: column;
    border: 1px solid;
    border-color: #ababab;
    border-radius: 12px;
    margin: 20px 100px;
    padding: 30px 100px;

    input {
        margin-top: 10px;
    }

    @media screen and (min-width: 768px) {
        margin-left: 25%;
        margin-right: 25%;
    }
`
