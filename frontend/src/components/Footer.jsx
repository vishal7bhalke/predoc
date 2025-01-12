import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div className='md:mx-10'>
      <div className='flex flex -col sm:grid grid-cols-[3fr_1fr_1fr] gap-4 my-10 mt-40 text-sm'> 
        {/*left section*/}
        <div>
            <img className='mb-5 w-40' src={assets.predoc} alt="" />
        <p className='w-full md:w-2/3 text-gray-600 leading-6'>Lorem Ipsum is simply dummy text of the printing and typesetting
             industry. Lorem Ipsum has been the industry's standard 
             dummy text ever since the 1500s, when an unknown printer 
             took a galley of type and
             scrambled it to make a type specimen book.</p>
        </div>

           {/*center section*/}
           <div>
            <p className='text-xl font-medium mb-5'>Company</p>
            <ul className='flex flex-col gap-2 text -gray-600'>
                <li>Home</li>
                <li>About us</li>
                <li>Contact us</li>
                <li>privacy policy</li>
            </ul>
            </div>

               {/*right section*/}
            <div>
            <p className='text-xl font-medium mb-5'>Get in Touch</p>
            <ul className='flex flex-col gap-2 text -gray-600'> 
                <li>0123456789</li>
                <li>Predoc@gmail.com</li>
            </ul>
            </div>
      </div>

      <div>
        <hr/>
        <p className='py-5 text-sm text-center'>Copyright © 2024-25  - All Right Reserved.</p>
      </div>
    </div>
  )
}

export default Footer
