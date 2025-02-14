import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Image from 'next/image'
import React from 'react'
import { Record } from '../[uid]/page';


const SelectionDetails = ({record}: {record: Record}) => {
  return (
    <div className='p-5 bg-gray-100 h-screen rounded-lg'>

      <h2 className=' font-bold my-2'>WireFrame:</h2>
      <Image src={record?.imageUrl} alt='wireframe' width={300} height={400}
        className='rounded-lg object-contain w-full h-1/2 border border-dashed 
        border-gray-400 p-1 bg-white'
      />

      <h2 className='mt-4 font-bold mb-2'>AI Model</h2>
      <Input className='bg-white'
        disabled={true} 
        defaultValue={record?.model}
      />

      <h2 className='mt-4 font-bold mb-2'>Description</h2>
      <Textarea className='bg-white h-[180px]'
        disabled={true} 
        defaultValue={record?.description}
      />
    </div>
  )
}

export default SelectionDetails