import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaCalendarAlt, FaTag, FaPlane, FaHotel, FaChevronRight } from 'react-icons/fa';

interface Offer {
  id: string;
  title: string;
  description: string;
  image: string;
  discountPercentage: number;
  originalPrice: number;
  type: 'flight' | 'hotel' | 'package';
  expiry: string;
}

const offers: Offer[] = [
  {
    id: 'maldives-package',
    title: 'Luxury Maldives Getaway',
    description: '5 nights at a 5-star resort with flights, transfers, and all-inclusive meals',
    image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    discountPercentage: 25,
    originalPrice: 2499,
    type: 'package',
    expiry: '2023-12-31',
  },
  {
    id: 'europe-flights',
    title: 'European City Breaks',
    description: 'Discounted flights to major European cities including Paris, Rome, and Barcelona',
    image: 'https://images.unsplash.com/photo-1519677100203-a0e668c92439?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    discountPercentage: 20,
    originalPrice: 599,
    type: 'flight',
    expiry: '2023-11-30',
  },
  {
    id: 'caribbean-resort',
    title: 'Caribbean Beach Resorts',
    description: 'Luxury beachfront accommodations with special perks and amenities included',
    image: 'https://images.unsplash.com/photo-1548574505-5e239809ee19?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    discountPercentage: 30,
    originalPrice: 1299,
    type: 'hotel',
    expiry: '2023-10-31',
  },
];

const SpecialOffers = () => {
  const calculateDiscountedPrice = (originalPrice: number, discountPercentage: number) => {
    return Math.round(originalPrice * (1 - discountPercentage / 100));
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {offers.map((offer) => {
        const discountedPrice = calculateDiscountedPrice(offer.originalPrice, offer.discountPercentage);
        
        return (
          <div key={offer.id} className="card overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <div className="relative">
              <div className="h-48 relative">
                <Image
                  src={offer.image}
                  alt={offer.title}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <div className="absolute top-0 right-0 bg-red-600 text-white px-3 py-1 rounded-bl-lg font-bold">
                {offer.discountPercentage}% OFF
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                <p className="text-white font-bold text-xl">{offer.title}</p>
              </div>
            </div>
            
            <div className="p-4">
              <p className="text-gray-700 mb-4">{offer.description}</p>
              
              <div className="flex items-center mb-3">
                <div className="text-gray-500 flex items-center mr-4">
                  {offer.type === 'flight' ? (
                    <FaPlane className="mr-1" />
                  ) : offer.type === 'hotel' ? (
                    <FaHotel className="mr-1" />
                  ) : (
                    <span className="flex items-center">
                      <FaPlane className="mr-1" /> + <FaHotel className="mx-1" />
                    </span>
                  )}
                  <span className="capitalize">{offer.type}</span>
                </div>
                
                <div className="text-gray-500 flex items-center">
                  <FaCalendarAlt className="mr-1" />
                  <span>Expires: {new Date(offer.expiry).toLocaleDateString()}</span>
                </div>
              </div>
              
              <div className="flex justify-between items-center mt-4">
                <div>
                  <p className="line-through text-gray-500">${offer.originalPrice}</p>
                  <p className="text-primary-600 font-bold text-xl">${discountedPrice}</p>
                </div>
                <Link href={`/offers/${offer.id}`} className="btn btn-primary flex items-center">
                  Book Now <FaChevronRight className="ml-1" />
                </Link>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SpecialOffers; 