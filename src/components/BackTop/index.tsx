import styled from '@emotion/styled'
import { Button } from 'antd'
import React, { useEffect, useRef, useState } from 'react'

const BackTopWrapper = styled.div`
    width: 40px;
    height: 40px;
    text-align: center;
    /* height 와 같은 값으로 세로 중앙 */
    line-height: 45px;
    border-radius: 20px;

    position: fixed;
    right: 1rem;
    bottom: 40px;
    font-size: 24px;
    z-index: 1;
    background-color: #00000073;
    cursor: pointer;

    &:hover {
        background-color: #000000d9;
        transition: all 0.3s;
    }
`

const BackTop = ({ limit }: { limit?: number }) => {
    const [visible, setVisible] = useState(false)
    const scrollLimit = useRef(limit || 50)

    useEffect(() => {
        // 이벤트 등록 한번만
        window.addEventListener('scroll', toggleVisible)

        return () => {
            window.removeEventListener('scroll', toggleVisible)
        }
    }, [])

    const toggleVisible = () => {
        const scrolled = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0

        if (scrolled > scrollLimit.current) {
            setVisible(true)
        } else if (scrolled <= scrollLimit.current) {
            setVisible(false)
        }
    }

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        })
    }

    return (
        <BackTopWrapper
            style={{
                // width: '100%',
                // height: '20px',
                display: visible ? 'inline' : 'none',
            }}
            onClick={scrollToTop}
        >
            <svg
                viewBox="64 64 896 896"
                focusable="false"
                data-icon="vertical-align-top"
                width="1em"
                height="1em"
                fill="#fff"
                aria-hidden="true"
            >
                <path d="M859.9 168H164.1c-4.5 0-8.1 3.6-8.1 8v60c0 4.4 3.6 8 8.1 8h695.8c4.5 0 8.1-3.6 8.1-8v-60c0-4.4-3.6-8-8.1-8zM518.3 355a8 8 0 00-12.6 0l-112 141.7a7.98 7.98 0 006.3 12.9h73.9V848c0 4.4 3.6 8 8 8h60c4.4 0 8-3.6 8-8V509.7H624c6.7 0 10.4-7.7 6.3-12.9L518.3 355z"></path>
            </svg>
        </BackTopWrapper>
    )
}

export default BackTop
