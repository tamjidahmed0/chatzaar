import React from 'react'

const PriceCard = () => {
  return (
    <div>
       
            <div  className="flex justify-center items-center">
              <div className="bg-gray-100 p-6 rounded-2xl shadow-lg ">
                <div className="flex justify-between items-center">
                  <h3 className="text-gray-700 font-medium">Pro Monthly</h3>
                  <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                    Save 50%
                  </span>
                </div>
                <div className="mt-2">
                  <span className="text-3xl font-bold">$4.99 USD</span>
                  <span className="text-gray-500 text-lg line-through ml-2">$9.99</span>
                </div>
                <p className="text-gray-600 text-sm mt-1">Billed monthly</p>
                <button className="w-full bg-purple-600 text-white font-semibold py-2 mt-4 rounded-lg hover:bg-purple-700 transition">
                  Upgrade Now
                </button>
                <p className="text-gray-500 text-xs text-center mt-3">
                  Experience the benefits of Pro membership with unlimited chats for one month.
                </p>
              </div>
            </div>
          
    </div>
  )
}

export default PriceCard