import React from 'react'
import { IoLogoInstagram } from 'react-icons/io'
import { PiTiktokLogoBold } from 'react-icons/pi'
import { RiTwitterXLine } from 'react-icons/ri'
import { TbBrandMeta } from 'react-icons/tb'
import { LuPhoneCall } from "react-icons/lu";
import { PiCopyrightFill } from "react-icons/pi";
import { Link } from 'react-router-dom'


const Footer = () => {
  return (
    <footer className='border-t py-12 bg-gray-300'>
        <div className='container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 px-6 lg:px-2'>
            <div>
                <h3 className='text-lg text-gray-800 mb-4'>News Letter</h3>
                <p className='text-gray-500 mb-4'>
                    Be first to hear about new products, exclusive events, and
                    online offers.
                </p>
                <p className='font-medium text-sm text-gray-600 mb-3 mt-5'>Sign Up and get 10% off your first order.</p>

                {/* Newsletter form */}
                <form className='flex'>
                    <input 
                    type="text"
                    placeholder='Enter your email'
                    className='p-3 w-full text-sm border-t border-l border-b border-gray-400 
                    rounded-l-md focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all'
                    required 
                    />
                    <button type='submit'
                    className='bg-black text-white px-4 py-3 text-sm rounded-r-md hover:bg-violet-400 
                    transition-all'>
                        Subscribe</button>
                </form>
            </div>

            {/* Shop links */}
            <div>
                <h3 className='text-lg text-gray-800 mb-4'>Shop</h3>
                <ul className='space-y-2 text-gray-600'>
                    <li>
                    <Link to="/collections/all?gender=Men" className='hover:text-gray-600 transition-colors'>
                    Men's Top Wear
                    </Link>
                    </li>
                    <li>
                    <Link to="/collections/all?gender=Women" className='hover:text-gray-600 transition-colors'>
                    Women's Top Wear
                    </Link>
                    </li>
                    <li>
                    <Link to="/collections/all?category=Top Wear" className='hover:text-gray-600 transition-colors'>
                     Top Wear
                    </Link>
                    </li>
                    <li>
                    <Link to="/collections/all?category=Bottom Wear" className='hover:text-gray-600 transition-colors'>
                     Bottom Wear
                    </Link>
                    </li>
                </ul>
            </div>

            {/* contact links */}
             <div>
                <h3 className='text-lg text-gray-800 mb-4'>Support</h3>
                <ul className='space-y-2 text-gray-600'>
                    <li>
                    <Link to="#" className='hover:text-gray-600 transition-colors'>
                    Contact Us
                    </Link>
                    </li>
                    <li>
                    <Link to="#" className='hover:text-gray-600 transition-colors'>
                    About Us
                    </Link>
                    </li>
                    <li>
                    <Link to="#" className='hover:text-gray-600 transition-colors'>
                    FAQs
                    </Link>
                    </li>
                    <li>
                    <Link to="#" className='hover:text-gray-600 transition-colors'>
                    Features
                    </Link>
                    </li>
                </ul>
            </div>

            {/* Follow Us */}
            <div>
                <h3 className='text-lg text-gray-800 mb-4'>Follow Us: </h3>
                <div className='flex items-center space-x-4 mb-4'>
                    <a href="https://www.facebook.com"
                    target='_blank'
                    rel='noopener noreferrer'
                    className='hover:text-gray-500'
                    >
                        <TbBrandMeta className='w-6 h-6'/>
                    </a>
                    <a href="https://www.instagram.com"
                    target='_blank'
                    rel='noopener noreferrer'
                    className='hover:text-gray-500'
                    >
                        <IoLogoInstagram className='w-5 h-5'/>
                    </a>
                    <a href="https://www.twitter.com"
                    target='_blank'
                    rel='noopener noreferrer'
                    className='hover:text-gray-500'
                    >
                        <RiTwitterXLine className='w-5 h-5'/>
                    </a>
                    <a href="https://www.tiktok.com"
                    target='_blank'
                    rel='noopener noreferrer'
                    className='hover:text-gray-500'
                    >
                        <PiTiktokLogoBold className='w-5 h-5'/>
                    </a>
                </div>
                <p className='text-gray-500'>Call Us</p>
                <p className='text-gray-500'>
                    <LuPhoneCall className='inline-block mr-3' />
                    +39 (012) 345 6789
                </p>
            </div>
        </div>
        {/* Footer copyright */}
        <div className='container mx-auto mt-12 px-4 lg:px-2 border-t border-gray-400 pt-4'>
            <p className='text-sm text-center text-gray-500 tracking-tighter'>
               <PiCopyrightFill className='ml-125 -mb-4 '/> 
                2025, EC_Web. All Rights Reserved                
            </p>
        </div>
    </footer>
  )
}

export default Footer