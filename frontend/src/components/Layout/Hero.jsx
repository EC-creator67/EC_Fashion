import React from 'react';
import HeroImg from '../../assets/ec_hero.jpg';
import { Link } from 'react-router-dom';


const Hero = () => {
  return (
    <section className="relative">
      <img
        src={HeroImg}
        alt="EcWeb"
        className="w-full h-[300px] md:h-[450px] lg:h-[550px] object-cover"
      />
      <div className="absolute inset-0 bg-black-opacity-20 flex items-center justify-center">
        <div className="text-center text-white p-6">
          <h1 className=" text-4xl  md:text-8xl font-bold tracking-tighter uppercase mb-4">
            Vacanze <br /> Pronte
          </h1>
          <p className='text-sm tracking-tighter md:text-lg mb-6'>
            Esplora gli outfits con spedizione veloce WorldWide
          </p>
          <Link to="#" className='bg-white text-gray-950 px-6 py-2 rounded-sm text-lg'>
          Shop Now
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
