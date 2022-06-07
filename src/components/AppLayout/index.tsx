import Header from '@components/Header'
import { css } from '@emotion/react'
import { CSSProperties } from 'react'
import { contentStyle } from './styles'

interface Props {
    children: React.ReactNode
    style?: CSSProperties | undefined
}

const AppLayout = ({ children, style }: Props) => {
    return (
        <>
            <Header />
            <div style={{ height: '60px' }}></div>
            <div style={style}>{children}</div>
        </>
    )
}

export default AppLayout
