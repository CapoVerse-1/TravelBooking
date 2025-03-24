import React from 'react';
import Image from 'next/image';
import { FaStar, FaQuoteLeft } from 'react-icons/fa';

interface Testimonial {
  id: string;
  name: string;
  location: string;
  avatar: string;
  rating: number;
  text: string;
  trip: string;
}

const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    location: 'New York, USA',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
    rating: 5,
    text: 'TravelEase made planning my anniversary trip so simple! The discounts were amazing, and their customer service went above and beyond when we needed to make last-minute changes.',
    trip: 'Paris, France - Anniversary Trip',
  },
  {
    id: '2',
    name: 'Michael Chen',
    location: 'Toronto, Canada',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
    rating: 4,
    text: 'I booked a family vacation to Bali through TravelEase and saved over $500 compared to other sites. The booking process was straightforward, and everything was well-organized.',
    trip: 'Bali, Indonesia - Family Vacation',
  },
  {
    id: '3',
    name: 'Elena Rodriguez',
    location: 'Madrid, Spain',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
    rating: 5,
    text: 'As a frequent business traveler, I appreciate the efficiency and reliability of TravelEase. Their mobile app makes it easy to manage bookings on the go, and the flight + hotel packages offer great value.',
    trip: 'Tokyo, Japan - Business Trip',
  },
];

const Testimonials = () => {
  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <FaStar
          key={i}
          className={i < rating ? 'text-yellow-400' : 'text-gray-300'}
        />
      );
    }
    return <div className="flex space-x-1">{stars}</div>;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {testimonials.map((testimonial) => (
        <div key={testimonial.id} className="card hover:shadow-lg transition-shadow duration-300">
          <div className="flex items-start mb-4">
            <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4 flex-shrink-0">
              <Image
                src={testimonial.avatar}
                alt={testimonial.name}
                layout="fill"
                objectFit="cover"
              />
            </div>
            <div>
              <p className="font-bold">{testimonial.name}</p>
              <p className="text-sm text-gray-600">{testimonial.location}</p>
              {renderStars(testimonial.rating)}
            </div>
          </div>
          
          <div className="mb-4">
            <FaQuoteLeft className="text-gray-300 text-xl mb-2" />
            <p className="text-gray-700 italic">{testimonial.text}</p>
          </div>
          
          <div className="text-sm text-primary-600 font-medium">
            {testimonial.trip}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Testimonials; 