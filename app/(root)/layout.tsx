import StreamVideoProvider from '@/providers/StreamClientProvider'
import { Metadata } from 'next'
import React, { ReactNode } from 'react'

export const metadata: Metadata = {
    title: 'HSOS Conferencing',
    description: 'DMA Video Calling App',
    icons: {
        icon: '/images/26840106.png',
    },
}

const RootLayout = ({ children }: Readonly<{ children: ReactNode }>) => {
    return (
        <main>
            <StreamVideoProvider>{children}</StreamVideoProvider>
        </main>
    )
}

export default RootLayout
