import React from 'react';
import womensCollectionImage from '../../assets/womens-collection.jpg';
import MensCollectionImage from "../../assets/mens-collection.jpg"
import { Link } from 'react-router-dom';

const GenderCollectionSection = () => {
  return (
    <section className="py-10 px-4 lg:px-0">
      <div className="container mx-auto flex flex-col md:flex-row gap-8">
        {/* Women's Collection */}
        <div className="relative flex-1">
          <img
            src={womensCollectionImage}
            alt="Women's Collection"
            className="w-full h-[800px] object-cover"
          />
          <div className="absolute bottom-8 left-8 bg-white opacity-60 p-4 ">
            <h2 className="text-2xl font-bold text-gray-900">
              Women's Collection
            </h2>
            <Link
              to="/collections/all?gender=Women"
              className="text-gray-700 underline"
            >
              Shop Now
            </Link>
          </div>
        </div>

        {/* Men's Collection */}
        <div className="relative flex-1">
          <img
            src={MensCollectionImage}
            alt="Men's Collection"
            className="w-full h-[800px] object-cover"
          />
          <div className="absolute bottom-8 left-8 bg-white opacity-70 p-4 ">
            <h2 className="text-2xl font-bold text-gray-900">
              Men's Collection
            </h2>
            <Link
              to="/collections/all?gender=Men"
              className="text-gray-700 underline"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GenderCollectionSection;
