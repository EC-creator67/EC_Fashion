import React from 'react'
import {TbBrandMeta} from 'react-icons/tb'
import {IoLogoInstagram} from 'react-icons/io'
import {RiTwitterXLine} from 'react-icons/ri'
import { PiTiktokLogoBold } from "react-icons/pi";

const Topbar = () => {
  return (
    <div className='bg-blue-500 text-white'>
        <div className='container mx-auto flex justify-between py-2 px-10'>
            <div className='hidden items-center space-x-4 md:flex'>
                <a target='_blank' href="https://facebook.com" className='hover:text-gray-300'>
                <TbBrandMeta className='w-8 h-8'/>
                </a>
                <a target='_blank' href="https://Instagram.com" className='hover:text-gray-300'>
                <IoLogoInstagram className='w-7 h-7'/>
                </a>
                <a target='_blank' href="#" className='hover:text-gray-300'>
                <RiTwitterXLine className='w-6 h-6'/>
                </a>
                <a target='_blank' href="https://tiktok.com" className='hover:text-gray-300'>
                <PiTiktokLogoBold className='w-6 h-6'/>
                </a>
            </div>
            <div  className='text-sm text-center mt-1 flex-grow'>
                <span className='font-bold '>
                    We ship WorldWide - Spediamo in tutto il mondo </span>
            </div>
            <div className='hidden md:block mt-1'>
                <span className='hover:text-yellow-500 font-bold'>+39 (123) 456 7890</span>
            </div>
        </div>
    </div>
  )
}

export default Topbar