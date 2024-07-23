'use client'

import { useUser } from '@clerk/nextjs'
import { useStreamVideoClient } from '@stream-io/video-react-sdk'
import { useRouter } from 'next/navigation'

import { useGetCallById } from '@/hooks/useGetCallById'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'

const Table = ({
    title,
    description,
}: {
    title: string
    description: string
}) => {
    return (
        <div className='flex flex-col items-start xl:flex-row border-2 border-hs_grey-7 px-4 rounded-lg'>
            <h1 className='text-base font-bold text-hs_grey-7 lg:text-xl xl:min-w-32'>
                {title}:
            </h1>

            <h1 className='truncate italic selection:text-sm font-light max-sm:max-w-[320px] lg:text-lg text-white'>
                {description}
            </h1>
        </div>
    )
}

const PersonalRoom = () => {
    const router = useRouter()
    const { user } = useUser()
    const client = useStreamVideoClient()
    const { toast } = useToast()

    const meetingId = user?.id

    const { call } = useGetCallById(meetingId!)

    const startRoom = async () => {
        if (!client || !user) return

        const newCall = client.call('default', meetingId!)

        if (!call) {
            await newCall.getOrCreate({
                data: {
                    starts_at: new Date().toISOString(),
                },
            })
        }

        router.push(`/meeting/${meetingId}?personal=true`)
    }

    const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${meetingId}?personal=true`

    return (
        <section className='flex size-full flex-col gap-10 text-white'>
            <h1 className='text-xl font-bold lg:text-3xl'>Mein Raum</h1>
            <div className='flex w-full flex-col gap-8 xl:max-w-[900px] '>
                <Table
                    title='Beschreibung'
                    description={`${user?.username}'s Meeting Room`}
                />
                <Table title='Meeting ID' description={meetingId!} />
                <Table title='Einladungslink' description={meetingLink} />
            </div>
            <div className='flex gap-5'>
                <Button
                    className='bg-hs_grey-7 hover:bg-hs_blue-1'
                    onClick={startRoom}
                >
                    Meeting starten
                </Button>
                <Button
                    className='bg-hs_grey-7 hover:bg-hs_blue-1'
                    onClick={() => {
                        navigator.clipboard.writeText(meetingLink)
                        toast({
                            title: 'Link Copied',
                        })
                    }}
                >
                    Einladung kopieren
                </Button>
            </div>
        </section>
    )
}

export default PersonalRoom
