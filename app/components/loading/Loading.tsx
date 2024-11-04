import React from 'react'

const Loading = () => {
   return (
      <div className="flex justify-center items-center h-screen">
         <div className="flex flex-col items-center space-y-4">
            <div className="animate-spin rounded-full h-14 w-14 border-t-4 border-red-400"></div>
            <h1 className="text-lg text-white">Loading...</h1>
         </div>
      </div>
   )
}

export default Loading;