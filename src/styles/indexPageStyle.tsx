import { css } from '@emotion/react'
import styled from '@emotion/styled'

export const FullLoadingBackground = styled.div`
    background-color: #e9ecef;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`

export const ContainerHeader = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 30px;
    margin-bottom: 45px;

    h1 {
        /* fontWeight: 'bold' */
        font-weight: bold;

        user-select: none;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
    }
`

export const bookImageContainerStyle = css`
    display: flex;
    margin-bottom: 50px;
    justify-content: center;

    user-select: none;
    position: relative;
`

export const bookImageStyle = css`
    cursor: pointer;
`
