import React from 'react'
import PriceCard from '@/components/atoms/card/PriceCard'


const Subscription = () => {
  return (
    <div className="w-full lg:p-7 h-full ">

      <div className="bg-[linear-gradient(to_right,#EDE9FE,#ffffff)] lg:rounded-3xl h-full flex flex-col overflow-y-auto ">
        <div className='text-black flex flex-col items-center mt-10 text-center'>

          <h1 className='text-3xl font-bold'>Manage Subscription</h1>
          <p>Want to get more out of Chatzaar Plus? Subscribe to one of our professional plans.</p>
        </div>

        <div className="grid xl:grid-cols-4 lg:grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-6 text-black mt-10 px-10">

          {[...Array(5)].map((_, index) => (
            <PriceCard key={index}/>

          ))}

        </div>

      </div>
    </div>
  )
}

export default Subscription