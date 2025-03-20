import React from 'react'
import { Mail, LinkedinIcon} from 'lucide-react'

const Support = () => {
    return (
        <div className="w-full lg:p-7 h-full ">
            <div className='bg-[linear-gradient(to_right,#EDE9FE,#ffffff)] lg:rounded-3xl h-full overflow-y-auto '>

                <div className=' mx-auto max-w-3xl py-16 px-5'>
                    <h1 className=' capitalize text-black font-bold text-3xl text-center'>Talk to our team</h1>

                    <p className='text-black text-[12px] mt-10'>Your preferred option</p>

                    <div className='w-full h-[1px] bg-gray-500' />

                    <a href="mailto:tamjidahmed050@gmail.com" className="flex gap-4 p-4 bg-gray-800 mt-8 rounded-lg text-white items-center">
                        <Mail size={32} />

                        <div>
                            <p className='text-white font-bold'>Email us</p>
                            <p>we will aim to response soon</p>
                        </div>

                    </a>



                    <p className='text-black text-[12px] mt-10'>Follow us</p>

                    <div className='w-full h-[1px] bg-gray-500' />

                    <a href="https://www.linkedin.com/in/tamjidahmedofficial" target='_blank'  className="flex gap-4 p-4 bg-gray-800 mt-8 rounded-lg text-white items-center">
                        <LinkedinIcon size={32} />

                        <div>
                            <p className='text-white font-bold'>LinkedIn</p>
                            <p> follow us on linkedin for updates </p>
                        </div>

                    </a>


                </div>


            </div>

        </div>
    )
}

export default Support