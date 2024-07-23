'use client'

import { useCall, useCallStateHooks } from '@stream-io/video-react-sdk'
import { useRouter } from 'next/navigation'
import React from 'react'
import { Button } from './ui/button'

const EndCallButton = () => {
    const call = useCall()
    const router = useRouter()

    const { useLocalParticipant } = useCallStateHooks()
    const localParticipant = useLocalParticipant()

    const isMeetingOwner =
        localParticipant &&
        call?.state.createdBy &&
        localParticipant.userId === call.state.createdBy.id
    if (!isMeetingOwner) return null

    return (
        <Button
            onClick={async () => {
                call.endCall()
                router.push('/')
            }}
            className='bg-red-500 rounded-2xl'
        >
            Besprechung beenden
        </Button>
    )
}

export default EndCallButton
