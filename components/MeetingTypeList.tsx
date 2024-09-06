'use client'

import { useState } from 'react'
import HomeCard from './HomeCard'
import { useRouter } from 'next/navigation'
import MeetingModal from './MeetingModal'
import { useUser } from '@clerk/nextjs'
import { Call, useStreamVideoClient } from '@stream-io/video-react-sdk'
import { describe } from 'node:test'
import ReactDatePicker from 'react-datepicker'
import { registerLocale, setDefaultLocale } from 'react-datepicker'
import { de } from 'date-fns/locale'
import { Locale } from 'date-fns'
import { Input } from '@/components/ui/input'

registerLocale('de', de as Locale)
setDefaultLocale('de')

import { useToast } from '@/components/ui/use-toast'
import { Textarea } from './ui/textarea'

const initialValues = {
    dateTime: new Date(),
    description: '',
    link: '',
}

const MeetingTypeList = () => {
    const router = useRouter()

    const [meetingState, setMeetingState] = useState<
        | 'isScheduleMeeting'
        | 'isJoiningMeeting'
        | 'isInstantMeeting'
        | undefined
    >(undefined)
    const [values, setValues] = useState(initialValues)
    const [callDetails, setCallDetails] = useState<Call>()
    const client = useStreamVideoClient()
    const { user } = useUser()
    const { toast } = useToast()

    const createMeeting = async () => {
        if (!client || !user) return
        try {
            if (!values.dateTime) {
                toast({ title: 'Bitte Datum und Zeit auswählen' })
                return
            }
            const id = crypto.randomUUID()
            const call = client.call('default', id)
            if (!call) throw new Error('Erstellen eines Meeting gescheitert')
            const startsAt =
                values.dateTime.toISOString() ||
                new Date(Date.now()).toISOString()
            const description = values.description || 'Instant Meeting'
            await call.getOrCreate({
                data: {
                    starts_at: startsAt,
                    custom: {
                        description,
                    },
                },
            })
            setCallDetails(call)
            if (!values.description) {
                router.push(`/meeting/${call.id}`)
            }
            toast({
                title: 'Meeting erstellt',
            })
        } catch (error) {
            console.error(error)
            toast({ title: 'Erstellen eines Meeting gescheitert' })
        }
    }

    const meetingLink = `https://hsos-conferencing-dma.vercel.app/meeting/${callDetails?.id}`

    return (
        <section className='grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-6'>
            <HomeCard
                img='/icons/add-meeting.svg'
                title='Neues Meeting'
                description='Starte jetzt ein neues Meeting'
                handleClick={() => setMeetingState('isInstantMeeting')}
                className='bg-hs_blue-2'
            />
            <HomeCard
                img='/icons/schedule.svg'
                title='Meeting planen'
                description='Plane ein Meeting'
                handleClick={() => setMeetingState('isScheduleMeeting')}
                className='bg-hs_blue-3'
            />
            <HomeCard
                img='/icons/recordings.svg'
                title='Aufnahmen'
                description='Schaue deine Meeting Aufnahmen'
                handleClick={() => router.push('/recordings')}
                className='bg-hs_blue-4'
            />
            <HomeCard
                img='/icons/join-meeting.svg'
                title='Meeting beitreten'
                description='Trete einem Meeting mit einem Link bei'
                handleClick={() => setMeetingState('isJoiningMeeting')}
                className='bg-hs_blue-5'
            />

            {!callDetails ? (
                <MeetingModal
                    isOpen={meetingState === 'isScheduleMeeting'}
                    onClose={() => setMeetingState(undefined)}
                    title='Meeting erstellen'
                    handleClick={createMeeting}
                >
                    <div className='flex flex-col gap-2.5 '>
                        <label className='text-base text-normal leading-[22px] text-white font-bold'>
                            Beschreibung
                        </label>
                        <Textarea
                            className='border-none bg-hs_grey-5 focus-visible:ring-0 focus-visible:ring-offset-0 text-white'
                            onChange={(e) => {
                                setValues({
                                    ...values,
                                    description: e.target.value,
                                })
                            }}
                        />
                    </div>
                    <div className='flex flex-col w-full gap-2.5'>
                        <label className='text-base text-normal leading-[22px] text-sky-2 font-bold'>
                            Datum und Zeit
                        </label>
                        <ReactDatePicker
                            locale='de'
                            timeCaption='Zeit'
                            selected={values.dateTime}
                            onChange={(date) =>
                                setValues({ ...values, dateTime: date! })
                            }
                            showTimeSelect
                            timeFormat='HH:mm'
                            timeIntervals={15}
                            dateFormat='d MMMM yyyy - h:mm '
                            className='w-full rounded bg-hs_grey-5 p-2 focus:outline none text-white'
                        />
                    </div>
                </MeetingModal>
            ) : (
                <MeetingModal
                    isOpen={meetingState === 'isScheduleMeeting'}
                    onClose={() => setMeetingState(undefined)}
                    title='Meeting erstellt'
                    className='text-center'
                    handleClick={() => {
                        navigator.clipboard.writeText(meetingLink)
                        toast({ title: 'Link kopiert' })
                    }}
                    image='/icons/checked.svg'
                    buttonIcon='/icons/copy.svg'
                    buttonText='Copy Meeting Link'
                />
            )}
            <MeetingModal
                isOpen={meetingState === 'isInstantMeeting'}
                onClose={() => setMeetingState(undefined)}
                title='Starte ein Meeting'
                className='text-center'
                buttonText='Meeting starten'
                handleClick={createMeeting}
            />

            <MeetingModal
                isOpen={meetingState === 'isJoiningMeeting'}
                onClose={() => setMeetingState(undefined)}
                title='Link eingeben'
                className='text-center'
                buttonText='Meeting besuchen'
                handleClick={() => router.push(values.link)}
            >
                <Input
                    placeholder='Meeting Link'
                    className='text-white border-none bg-hs_grey-6 focus-visible:ring-0 focus-visible:ring-offset-0'
                    onChange={(e) =>
                        setValues({ ...values, link: e.target.value })
                    }
                />
            </MeetingModal>
        </section>
    )
}

export default MeetingTypeList
