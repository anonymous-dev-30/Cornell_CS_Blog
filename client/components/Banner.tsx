import React from 'react'

function Banner() {
  return (
    <div className='flex justify-between items-center bg-yellow-400 border-black py-10 lg:py-0'>
        <div className='px-10 space-y-5'>
            <h1 className='text-6xl max-w-xl font-serif'>
                <span className='underline decoration-black decoration-4'>Blog</span>
                &nbsp; is place to read write and connect</h1>
            <h2>It's easy and free to post your thinking on any topic and connect with millions of readers</h2>
        </div>
        <div>
            <img className='hidden md:inline-flex h-32 lg:h-full' src="https://www.underconsideration.com/brandnew/archives/medium_2017_monogram.png" alt="M-logo" />
        </div>
    </div>
  )
}

export default Banner;