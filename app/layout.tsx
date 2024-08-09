import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ClerkProvider } from '@clerk/nextjs'

import '@stream-io/video-react-sdk/dist/css/styles.css'
import 'react-datepicker/dist/react-datepicker.css'

import { Toaster } from '@/components/ui/toaster'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'HSOS Conferencing',
    description: 'DMA Video Calling App',
    icons: {
        icon: '/images/26840106.png',
    },
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang='de'>
            <ClerkProvider
                appearance={{
                    layout: {
                        logoImageUrl: '/images/26840106.png',
                        socialButtonsVariant: 'iconButton',
                    },

                    variables: {
                        colorText: '#ffffff',
                        colorPrimary: '#0E78F9',
                        colorBackground: '#333333',
                        colorInputBackground: '#b1b1b1',
                        colorInputText: '#333333',
                        borderRadius: '8px',
                    },
                }}
            >
                <body className={`${inter.className} bg-hs_grey-6`}>
                    {children}
                    <Toaster />
                </body>
            </ClerkProvider>
        </html>
    )
}
