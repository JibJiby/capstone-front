import { CSSProperties } from 'react'
import { Container } from './styles'

interface Props {
    children: React.ReactNode
    style?: CSSProperties | undefined
}

const BooksContainer = ({ children, style }: Props) => {
    return <Container style={style}>{children}</Container>
}

export default BooksContainer
