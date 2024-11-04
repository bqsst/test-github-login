import React from 'react'
import Link from 'next/link';

const HomePage = () => {
  return (
    <div className='flex-center h-screen'>
      <Link href={'/auth'} className='button'>
        Go To Authorize
      </Link>
    </div>
  )
}

export default HomePage;