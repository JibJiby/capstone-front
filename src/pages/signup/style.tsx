import { css } from '@emotion/react'
import styled from '@emotion/styled'

export const SignupPageInput = styled.input`
    width: 400px;
    border-radius: 4px;
    font-size: 17px;
    color: #202124;
    margin: 1px 1px 0 1px;
    padding: 13px 15px;
    line-height: 24px;
    border: 1px solid #ced4da;
    outline: none;
`

export const SignupPageButton = styled.button`
    width: 180px;
    height: 50px;
    border-radius: 8px;
    font-size: 20px;
    font-weight: bold;
    user-select: none;
    cursor: pointer;

    border: none;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
    background-color: #495057;
    color: white;
    letter-spacing: 3px;

    &:hover {
        opacity: 0.85;
        transition: opacity 0.3s ease;
    }
`

export const ClearButtonContainer = styled.div`
    position: absolute;
    top: 16px;
    right: 11px;
    user-selection: none;
    cursor: pointer;
`

export const SignupPageContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 50px;

    section#logo {
        user-select: none;
        cursor: pointer;
    }

    section#signup-form {
        display: flex;
        flex-direction: column;
        margin-top: 48px;
    }

    section#back-login {
        display: flex;
        justify-content: center;
        margin-top: 15px;
        user-select: none;

        u {
            cursor: pointer;
            color: #ff8787;
            font-weight: bold;
        }
    }

    section#signup-btn-container {
        display: flex;
        justify-content: center;
        margin-top: 40px;
    }
`

export const errorMessageStyle = css`
    color: red;
    font-size: 14px;
`
