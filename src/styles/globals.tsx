import { css, Global } from '@emotion/react'
import emotionNormalize from 'emotion-normalize'

export const globalStyles = (
    <Global
        styles={css`
            ${emotionNormalize}
            *, *::after, *::before {
                box-sizing: border-box;
                -moz-osx-font-smoothing: grayscale;
                -webkit-font-smoothing: antialiased;
                font-smoothing: antialiased;
            }

            html,
            body,
            #__next {
                height: 100%;
            }
        `}
    />
)
