import type { AppProps } from 'next/app'
import { useRef } from 'react'
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { globalStyles } from '@styles/globals'

import '@styles/antd.less'

function MyApp({ Component, pageProps }: AppProps) {
    const queryClientRef = useRef<QueryClient>()
    if (!queryClientRef.current) {
        queryClientRef.current = new QueryClient()
    }

    return (
        <QueryClientProvider client={queryClientRef.current}>
            <Hydrate state={pageProps.dehydratedState}>
                {globalStyles}
                <Component {...pageProps} />
                <ReactQueryDevtools initialIsOpen={false} />
            </Hydrate>
        </QueryClientProvider>
    )
}
export default MyApp
