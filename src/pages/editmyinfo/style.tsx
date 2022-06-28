import styled from '@emotion/styled'

export const EditMyInfoPageContainer = styled.div`
    header#edit-my-info-header {
        display: flex;
        justify-content: center;
        margin-top: 30px;
        margin-bottom: 45px;
        user-select: none;

        h1 {
            font-weight: bold;
        }
    }
`

export const EditFormContainer = styled.div`
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

    label.input-label {
        margin-right: 15px;
        font-weight: bold;
    }

    .edit-info-section {
        margin-bottom: 30px;
    }

    #submit-container {
        display: flex;
        justify-content: center;
    }

    @media screen and (min-width: 768px) {
        margin-left: 25%;
        margin-right: 25%;
    }
`
