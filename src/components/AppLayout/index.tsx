import Header from '@components/Header'
import { css } from '@emotion/react'
import { CSSProperties } from 'react'
import { contentStyle } from './styles'

interface Props {
    children: React.ReactNode
    style?: CSSProperties | undefined
    me?: any
}

const AppLayout = ({ children, style, me }: Props) => {
    return (
        <>
            <Header me={me} />
            <div style={{ height: '60px' }}></div>
            <div style={style}>{children}</div>
        </>
    )
}

export default AppLayout
