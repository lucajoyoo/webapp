import { SignUp } from '@clerk/nextjs'
import React from 'react'

const SignUpPage = () => {
    return (
        <div>
            <main className='flex  h-screen w-full items-center justify-center'>
                <SignUp />
            </main>
        </div>
    )
}

export default SignUpPage
