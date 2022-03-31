import { css } from '@emotion/react'

export const noSelectStyle = css`
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
`

export const divNoneSelectionStyle = css`
    ${noSelectStyle}
    cursor: pointer;
`
