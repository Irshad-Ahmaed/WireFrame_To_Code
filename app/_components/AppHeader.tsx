import { SidebarTrigger } from '@/components/ui/sidebar'
import React, { useState } from 'react'
import ProfileAvatar from './ProfileAvatar'

function AppHeader() {
    const [show, setShow] = useState(false);

    return (
        <div className='p-4 shadow-sm flex items-center justify-between w-full '>
            <SidebarTrigger className={`${!show && 'text-blue-500 shadow-sm shadow-blue-300'}`} 
                onClick={()=> setShow(!show)}/>
            <ProfileAvatar />
        </div>
    )
}

export default AppHeader