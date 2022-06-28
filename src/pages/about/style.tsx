import styled from '@emotion/styled'

export const AboutPageLoginButton = styled.button`
    border: none;
    border-radius: 12px;

    width: 300px;
    height: 50px;

    font-size: 26px;
    font-weight: bold;

    cursor: pointer;
    transition: all 0.3s;

    background-color: white;

    box-shadow: 0px 4px 8px rgb(2 32 71 / 20%), 0px 8px 16px rgb(0 27 55 / 25%);
    &:hover {
        background-color: #868e96;
        color: white;
    }
`

export const AboutPageContainer = styled.div`
    width: 100%;
    height: 100%;
    background-image: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)),
        url('https://cdn.pixabay.com/photo/2015/09/05/21/51/reading-925589_960_720.jpg');
    background-repeat: no-repeat;
    background-size: cover;

    display: flex;
    flex-direction: column;
    align-items: center;

    header {
        color: white;
        font-size: 28px;
        user-select: none;
        margin-bottom: 64px;

        strong {
            font-weight: bold;
        }
    }

    .logo {
        user-select: none;
        margin-top: 100px;
        margin-bottom: 100px;
    }

    section.main-sentance {
        color: white;
        work-break: break-word;
        user-select: none;
        margin-bottom: 58px;
    }

    section.button-container {
        display: flex;
        justify-content: center;
        user-select: none;
    }

    @media (max-width: 630px) {
        h1 {
            font-size: 1.8em;
        }
    }
`
