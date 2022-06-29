import { css } from '@emotion/react'
import styled from '@emotion/styled'

export const EditingMyInfoButton = styled.button`
    /* padding: '10px 15px', borderRadius: '8px', border: 'none' */
    padding: 10px 15px;
    border-radius: 8px;
    border: none;
    cursor: pointer;

    &:hover {
        opacity: 0.4;
        transition: all 0.2s ease-in;
    }
`

export const bookImageContainerStyle = css`
    display: flex;
    margin-bottom: 50px;
    justify-content: center;

    user-select: none;
    position: relative;
`
