import React from 'react'
import ImageUpload from './_components/ImageUpload'

function Dashboard() {
    return (
        <div className='px-5 xl:px-20'>
            <h2 className='font-bold text-3xl'>Convert Wireframe To Code</h2>
            <ImageUpload/>
        </div>
    )
}

export default Dashboard