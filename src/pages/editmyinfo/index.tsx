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
import {
    EditFormContainer,
    EditMyInfoPageContainer as Container,
} from './style'

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
            <Container>
                <header id="edit-my-info-header">
                    <h1>나의 정보 수정</h1>
                </header>
                <EditFormContainer>
                    <div className="edit-info-section">
                        <label className="input-label">이메일</label>
                        <Input
                            value={headerMe?.email}
                            readOnly
                            style={{ cursor: 'not-allowed' }}
                        />
                    </div>
                    <div className="edit-info-section">
                        <label className="input-label">비밀번호</label>
                        <Input type="password" />
                    </div>
                    <div className="edit-info-section">
                        <label className="input-label">비밀번호 확인</label>
                        <Input type="password" />
                    </div>
                    <div className="edit-info-section">
                        <label className="input-label">북데이</label>
                        <DatePicker
                            size="large"
                            style={{ marginTop: '10px' }}
                            onChange={onDateChange}
                            value={bookDate}
                        />
                    </div>
                    <div id="submit-container">
                        <Button type="primary" size="large">
                            수정하기
                        </Button>
                    </div>
                </EditFormContainer>
            </Container>
        </AppLayout>
    )
}

export default EditMyInfo
