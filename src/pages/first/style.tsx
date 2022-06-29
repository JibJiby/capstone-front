import { css } from '@emotion/react'
import styled from '@emotion/styled'

export const FirstPageMainContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px 10px;
`

export const ProgressContainer = styled.div`
    margin: 0 150px;
    margin-bottom: 100px;
    display: flex;
    justify-content: center;

    @media screen and (min-width: 1032px) {
        margin-left: 30%;
        margin-right: 30%;
    }
`

export const NextButton = styled.button`
    width: 200px;
    height: 2.5rem;
    margin: 15px auto;
    border: 0px;
    border-radius: 6px;
    font-size: 20px;
    background-color: rgb(0, 28, 52);
    color: white;
    font-weight: bold;
    user-select: none;
    cursor: pointer;
    transition: all 0.5s ease 0s;

    &:disabled {
        cursor: not-allowed;
        background-color: rgb(198, 198, 198);
    }
`

export const FullLoadingBackground = styled.div`
    background-color: #e9ecef;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`

export const instructionHeaderStyle = css`
    display: flex;
    justify-content: center;
    user-select: none;
    margin: 30px auto;
`

export const bookImageContainerStyle = css`
    display: flex;
    margin-bottom: 50px;
    justify-content: center;

    user-select: none;
    position: relative;
`
