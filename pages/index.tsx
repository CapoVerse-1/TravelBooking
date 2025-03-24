import { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { FaPlane, FaHotel, FaCalendarAlt, FaMapMarkerAlt, FaUser, FaSearch } from 'react-icons/fa';
import SearchTabs from '@/components/SearchTabs';
import FeaturedDestinations from '@/components/FeaturedDestinations';
import SpecialOffers from '@/components/SpecialOffers';
import Testimonials from '@/components/Testimonials';

export default function Home() {
  return (
    <>
      <Head>
        <title>TravelEase - Book Flights & Hotels at the Best Prices</title>
        <meta name="description" content="Book flights and hotels at the best prices with TravelEase" />
      </Head>

      {/* Hero section with search */}
      <section className="relative">
        <div className="absolute inset-0 z-0">
          <Image 
            src="https://images.unsplash.com/photo-1496947850313-7743325fa58c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
            alt="Travel destination"
            layout="fill"
            objectFit="cover"
            quality={90}
            priority
          />
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Discover the World with TravelEase
            </h1>
            <p className="text-xl text-white max-w-3xl mx-auto">
              Find and book the best deals on flights, hotels, and vacation packages. Save up to 30% with our exclusive discounts.
            </p>
          </div>
          
          <div className="max-w-5xl mx-auto">
            <SearchTabs />
          </div>
        </div>
      </section>

      {/* Featured Destinations */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Popular Destinations</h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
              Explore our handpicked selection of the most sought-after travel destinations
            </p>
          </div>
          
          <FeaturedDestinations />
        </div>
      </section>

      {/* Special Offers */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Special Offers</h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
              Take advantage of our limited-time deals and promotions
            </p>
          </div>
          
          <SpecialOffers />
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">What Our Customers Say</h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
              Read testimonials from travelers who booked with TravelEase
            </p>
          </div>
          
          <Testimonials />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Ready to Start Your Journey?</h2>
          <p className="text-xl text-white mb-8 max-w-3xl mx-auto">
            Sign up now and get access to exclusive deals and personalized recommendations.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/register" className="btn bg-white text-primary-600 hover:bg-gray-100 px-8 py-3 rounded-md font-medium text-lg">
              Create Account
            </Link>
            <Link href="/contact" className="btn border-2 border-white text-white hover:bg-white hover:text-primary-600 px-8 py-3 rounded-md font-medium text-lg">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
} 