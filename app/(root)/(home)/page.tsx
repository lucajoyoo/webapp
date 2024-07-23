import MeetingTypeList from '@/components/MeetingTypeList'
import React from 'react'

const Home = () => {
    const now = new Date()

    const time = now.toLocaleTimeString('de-DE', {
        hour: '2-digit',
        minute: '2-digit',
    })
    const date = now.toLocaleDateString('de-DE', {
        weekday: 'long',
        day: '2-digit',
        month: 'long',
        year: 'numeric',
    })

    return (
        <section className='flex size-full flex-col gap-10 text-white'>
            <div className='h-[300px] w-full rounded-[20px] bg-hero bg-cover'>
                <div className='flex h-full flex-col justify-between max-md:px-5 max-md:py-8 lg:p-11'>
                    <h2 className='glassmorphism2 max-w-[270px] rounded-2xl py-2 text-center text-xl font-extrabold text-hs_grey-7'>
                        Kommende Meetings
                    </h2>
                    <div className='flex flex-col gap-2'>
                        <h1 className='px-4 glassmorphism2 w-max text-4xl font-extrabold l:text-7xl text-hs_grey-7 rounded-2xl'>
                            {time}
                        </h1>
                        <p className='px-4 glassmorphism2 w-max text-lg font-medium text-hs_grey-7 lg:text-2xl rounded-2xl'>
                            {date}
                        </p>
                    </div>
                </div>
            </div>
            <MeetingTypeList />
        </section>
    )
}

export default Home
