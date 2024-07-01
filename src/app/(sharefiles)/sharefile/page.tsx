"use client"
import React from 'react'
import Dropbox from '../components/Dropbox'

function page() {
  return (
    <div className='flex flex-col ch w-full items-center'>
         <div className="flex   flex-col-reverse lg:flex-row w-full items-center justify-center">
        <div className="w-full lg:w-1/3">Files</div>
        <div className="w-full lg:w-2/3 ">
        <Dropbox/>
        </div>
      </div>
    </div>
  ) 
}

export default page
