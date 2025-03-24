import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface Destination {
  id: string;
  name: string;
  country: string;
  description: string;
  image: string;
  price: number;
}

const destinations: Destination[] = [
  {
    id: 'paris',
    name: 'Paris',
    country: 'France',
    description: 'Experience the city of lights with breathtaking architecture and world-class cuisine.',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    price: 599,
  },
  {
    id: 'tokyo',
    name: 'Tokyo',
    country: 'Japan',
    description: 'Explore the fascinating blend of traditional culture and futuristic technology.',
    image: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    price: 899,
  },
  {
    id: 'santorini',
    name: 'Santorini',
    country: 'Greece',
    description: 'Relax on stunning beaches with clear waters and iconic white-washed buildings.',
    image: 'https://images.unsplash.com/photo-1469796466635-455ede028ac4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    price: 699,
  },
  {
    id: 'bali',
    name: 'Bali',
    country: 'Indonesia',
    description: 'Find your paradise with tropical beaches, lush landscapes, and spiritual temples.',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    price: 749,
  },
  {
    id: 'newyork',
    name: 'New York',
    country: 'USA',
    description: 'Discover the ultimate urban experience in the city that never sleeps.',
    image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    price: 649,
  },
  {
    id: 'dubai',
    name: 'Dubai',
    country: 'UAE',
    description: 'Marvel at modern architectural wonders and experience luxury in the desert.',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    price: 849,
  },
];

const FeaturedDestinations = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {destinations.map((destination) => (
        <div key={destination.id} className="card group hover:shadow-xl transition-shadow duration-300">
          <div className="relative h-48 mb-4 overflow-hidden rounded-t-lg">
            <Image
              src={destination.image}
              alt={`${destination.name}, ${destination.country}`}
              layout="fill"
              objectFit="cover"
              className="group-hover:scale-110 transition-transform duration-300"
            />
            <div className="absolute bottom-0 left-0 bg-black bg-opacity-60 text-white py-2 px-4">
              <p className="font-bold">{destination.name}</p>
              <p className="text-sm">{destination.country}</p>
            </div>
          </div>
          <div className="p-4">
            <p className="text-gray-600 mb-4">{destination.description}</p>
            <div className="flex justify-between items-center">
              <p className="text-primary-600 font-bold">
                From ${destination.price}
                <span className="text-sm font-normal text-gray-500"> / person</span>
              </p>
              <Link href={`/destination/${destination.id}`} className="btn btn-primary text-sm">
                Explore
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FeaturedDestinations; 