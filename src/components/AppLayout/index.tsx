import { css } from '@emotion/react'
import { contentStyle } from './styles'

interface Props {
    children: React.ReactNode
}

const AppLayout = ({ children }: Props) => {
    return (
        <>
            <header
                css={css`
                    height: 80px;
                    background-color: tomato;
                    display: flex;
                `}
            >
                헤더
            </header>
            <div css={contentStyle}>{children}</div>
        </>
    )
}

export default AppLayout
