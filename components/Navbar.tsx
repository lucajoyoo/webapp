import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
import MobileNav from './MobileNav'
import { SignedIn, UserButton } from '@clerk/nextjs'

const Navbar = () => {
    return (
        <nav className='flex flex-between fixed z-50 w-full bg-hs_grey-7 px-6 py-4 lg:px-10'>
            <Link href='/' className='flex items-center gap-4'>
                <Image
                    src='/images/26840106.png'
                    width={40}
                    height={40}
                    alt='yoom logo'
                    className='max-sm:size-10 rounded-full'
                />
                <p className='text-[26px] font-extrabold text-white max-sm:hidden'>
                    HSOS Conferencing
                </p>
            </Link>
            <div className='flex-between gap-5'>
                <SignedIn>
                    <UserButton />
                </SignedIn>

                <MobileNav />
            </div>
        </nav>
    )
}

export default Navbar
