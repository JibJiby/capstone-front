import styled from '@emotion/styled'

export const Container = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 150px);

    column-gap: 50px;
    row-gap: 50px;

    @media screen and (min-width: 768px) and (max-width: 1023px) {
        column-gap: 30px;
    }

    @media screen and (min-width: 676px) and (max-width: 767px) {
        grid-template-columns: repeat(3, 150px);
    }

    @media screen and (min-width: 480px) and (max-width: 675px) {
        grid-template-columns: repeat(2, 150px);
    }

    @media screen and (max-width: 479px) {
        grid-template-columns: repeat(1, 150px);
    }
`
