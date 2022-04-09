import type { NextPage } from 'next'
import AppLayout from '@components/AppLayout'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

const Home = ({ isCompleted }: { isCompleted: boolean }) => {
    const router = useRouter()

    console.log('isCompleted')
    console.log(isCompleted)

    useEffect(() => {
        if (!isCompleted) {
            console.log('선호 도서 선택하지 않아 이동.')
            router.push('/first')
        }
    }, [])

    return <AppLayout>first로</AppLayout>
}

export default Home

export async function getStaticProps() {
    const res = await fetch('https://jsonplaceholder.typicode.com/todos/1')
    const data = await res.json()
    console.log('미리 가져오기')
    console.log(data)

    return {
        props: { isCompleted: data.completed }, // will be passed to the page component as props
    }
}
