import Header from '@components/Header'
import { css } from '@emotion/react'
import { contentStyle } from './styles'

interface Props {
    children: React.ReactNode
}

const AppLayout = ({ children }: Props) => {
    return (
        <>
            <Header />
            <div style={{ height: '60px' }}></div>
            <div>{children}</div>
        </>
    )
}

export default AppLayout
