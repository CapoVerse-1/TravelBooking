import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { FaFilter, FaPlane, FaLongArrowAltRight, FaExchangeAlt, FaRegClock, FaChair, FaSuitcase, FaShoppingCart } from 'react-icons/fa';
import SearchTabs from '@/components/SearchTabs';

// Mock flight data for demonstration purposes
const mockFlights = [
  {
    id: 'f1',
    airline: 'SkyJet Airways',
    airlineLogo: 'https://via.placeholder.com/40',
    flightNumber: 'SJ 101',
    origin: 'New York',
    originCode: 'JFK',
    destination: 'London',
    destinationCode: 'LHR',
    departureTime: '08:30',
    arrivalTime: '20:45',
    duration: '7h 15m',
    stops: 0,
    stopLocations: [],
    price: 599,
    discountedPrice: 479,
    discountPercentage: 20,
    seatsAvailable: 12,
    aircraft: 'Airbus A330',
    departureDate: '2023-11-15',
    returnDate: '2023-11-22',
    cabinClass: 'Economy',
  },
  {
    id: 'f2',
    airline: 'Global Express',
    airlineLogo: 'https://via.placeholder.com/40',
    flightNumber: 'GE 505',
    origin: 'New York',
    originCode: 'JFK',
    destination: 'London',
    destinationCode: 'LGW',
    departureTime: '10:15',
    arrivalTime: '22:30',
    duration: '7h 15m',
    stops: 1,
    stopLocations: ['Dublin (DUB)'],
    price: 529,
    discountedPrice: 449,
    discountPercentage: 15,
    seatsAvailable: 8,
    aircraft: 'Boeing 787',
    departureDate: '2023-11-15',
    returnDate: '2023-11-22',
    cabinClass: 'Economy',
  },
  {
    id: 'f3',
    airline: 'TransAtlantic Air',
    airlineLogo: 'https://via.placeholder.com/40',
    flightNumber: 'TA 707',
    origin: 'New York',
    originCode: 'EWR',
    destination: 'London',
    destinationCode: 'LHR',
    departureTime: '18:45',
    arrivalTime: '07:10',
    duration: '7h 25m',
    stops: 0,
    stopLocations: [],
    price: 649,
    discountedPrice: 519,
    discountPercentage: 20,
    seatsAvailable: 3,
    aircraft: 'Boeing 777',
    departureDate: '2023-11-15',
    returnDate: '2023-11-22',
    cabinClass: 'Economy',
  },
  {
    id: 'f4',
    airline: 'Atlantic Connect',
    airlineLogo: 'https://via.placeholder.com/40',
    flightNumber: 'AC 212',
    origin: 'New York',
    originCode: 'JFK',
    destination: 'London',
    destinationCode: 'LHR',
    departureTime: '20:30',
    arrivalTime: '09:15',
    duration: '7h 45m',
    stops: 0,
    stopLocations: [],
    price: 579,
    discountedPrice: 509,
    discountPercentage: 12,
    seatsAvailable: 15,
    aircraft: 'Airbus A350',
    departureDate: '2023-11-15',
    returnDate: '2023-11-22',
    cabinClass: 'Economy',
  },
  {
    id: 'f5',
    airline: 'Luxury Air',
    airlineLogo: 'https://via.placeholder.com/40',
    flightNumber: 'LX 800',
    origin: 'New York',
    originCode: 'JFK',
    destination: 'London',
    destinationCode: 'LHR',
    departureTime: '21:15',
    arrivalTime: '10:00',
    duration: '7h 45m',
    stops: 0,
    stopLocations: [],
    price: 899,
    discountedPrice: 719,
    discountPercentage: 20,
    seatsAvailable: 5,
    aircraft: 'Boeing 787-9',
    departureDate: '2023-11-15',
    returnDate: '2023-11-22',
    cabinClass: 'Premium Economy',
  },
];

export default function Flights() {
  const router = useRouter();
  const { 
    origin, 
    destination, 
    departDate, 
    returnDate, 
    passengers = '1', 
    flightType = 'roundtrip' 
  } = router.query;

  const [flights, setFlights] = useState(mockFlights);
  const [filteredFlights, setFilteredFlights] = useState(mockFlights);
  const [loading, setLoading] = useState(true);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [filters, setFilters] = useState({
    stops: ['all', '0', '1', '2+'],
    airlines: ['all', 'SkyJet Airways', 'Global Express', 'TransAtlantic Air', 'Atlantic Connect', 'Luxury Air'],
    departureTime: ['all', 'morning', 'afternoon', 'evening', 'night'],
    sort: 'price-asc',
  });
  const [activeFilters, setActiveFilters] = useState({
    stops: 'all',
    airlines: 'all',
    departureTime: 'all',
  });
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    // Simulate API call with delay
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Apply filters
    let result = [...flights];

    // Filter by stops
    if (activeFilters.stops !== 'all') {
      if (activeFilters.stops === '0') {
        result = result.filter(flight => flight.stops === 0);
      } else if (activeFilters.stops === '1') {
        result = result.filter(flight => flight.stops === 1);
      } else if (activeFilters.stops === '2+') {
        result = result.filter(flight => flight.stops >= 2);
      }
    }

    // Filter by airline
    if (activeFilters.airlines !== 'all') {
      result = result.filter(flight => flight.airline === activeFilters.airlines);
    }

    // Filter by departure time
    if (activeFilters.departureTime !== 'all') {
      const hour = parseInt(flights[0].departureTime.split(':')[0]);
      
      if (activeFilters.departureTime === 'morning') {
        result = result.filter(flight => {
          const hour = parseInt(flight.departureTime.split(':')[0]);
          return hour >= 6 && hour < 12;
        });
      } else if (activeFilters.departureTime === 'afternoon') {
        result = result.filter(flight => {
          const hour = parseInt(flight.departureTime.split(':')[0]);
          return hour >= 12 && hour < 18;
        });
      } else if (activeFilters.departureTime === 'evening') {
        result = result.filter(flight => {
          const hour = parseInt(flight.departureTime.split(':')[0]);
          return hour >= 18 && hour < 22;
        });
      } else if (activeFilters.departureTime === 'night') {
        result = result.filter(flight => {
          const hour = parseInt(flight.departureTime.split(':')[0]);
          return hour >= 22 || hour < 6;
        });
      }
    }

    // Filter by price range
    result = result.filter(flight => {
      return flight.discountedPrice >= priceRange[0] && flight.discountedPrice <= priceRange[1];
    });

    // Sort results
    if (filters.sort === 'price-asc') {
      result.sort((a, b) => a.discountedPrice - b.discountedPrice);
    } else if (filters.sort === 'price-desc') {
      result.sort((a, b) => b.discountedPrice - a.discountedPrice);
    } else if (filters.sort === 'duration-asc') {
      result.sort((a, b) => {
        const aDuration = parseInt(a.duration.split('h')[0]) * 60 + parseInt(a.duration.split('h')[1].replace('m', '').trim());
        const bDuration = parseInt(b.duration.split('h')[0]) * 60 + parseInt(b.duration.split('h')[1].replace('m', '').trim());
        return aDuration - bDuration;
      });
    } else if (filters.sort === 'departure-asc') {
      result.sort((a, b) => {
        const aTime = parseInt(a.departureTime.replace(':', ''));
        const bTime = parseInt(b.departureTime.replace(':', ''));
        return aTime - bTime;
      });
    } else if (filters.sort === 'arrival-asc') {
      result.sort((a, b) => {
        const aTime = parseInt(a.arrivalTime.replace(':', ''));
        const bTime = parseInt(b.arrivalTime.replace(':', ''));
        return aTime - bTime;
      });
    }

    setFilteredFlights(result);
  }, [activeFilters, priceRange, filters.sort, flights]);

  const handleFilterChange = (category: string, value: string) => {
    setActiveFilters(prev => ({
      ...prev,
      [category]: value,
    }));
  };

  const handleSortChange = (value: string) => {
    setFilters(prev => ({
      ...prev,
      sort: value,
    }));
  };

  const handlePriceRangeChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const value = parseInt(e.target.value);
    setPriceRange(prev => {
      const newRange = [...prev] as [number, number];
      newRange[index] = value;
      return newRange;
    });
  };

  const formatDate = (dateStr?: string | string[]) => {
    if (!dateStr) return 'N/A';
    const date = new Date(dateStr.toString());
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  return (
    <>
      <Head>
        <title>Flight Search Results - TravelEase</title>
        <meta name="description" content="Search and book flights at the best prices" />
      </Head>

      <div className="bg-gray-100 min-h-screen">
        {/* Search bar section */}
        <div className="bg-primary-700 py-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <SearchTabs />
          </div>
        </div>

        {/* Main content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Search summary */}
          <div className="mb-6 bg-white p-4 rounded-lg shadow-sm">
            <div className="flex flex-col md:flex-row md:items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Flights from {origin || 'Origin'} to {destination || 'Destination'}
                </h1>
                <p className="text-gray-600">
                  {formatDate(departDate)} {returnDate ? `- ${formatDate(returnDate)}` : ''} | {passengers} {parseInt(passengers as string) === 1 ? 'Passenger' : 'Passengers'} | {flightType === 'roundtrip' ? 'Round Trip' : 'One Way'}
                </p>
              </div>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="mt-3 md:mt-0 btn btn-outline flex items-center md:w-auto w-full justify-center"
              >
                <FaFilter className="mr-2" /> {showFilters ? 'Hide Filters' : 'Show Filters'}
              </button>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-6">
            {/* Filters sidebar */}
            {showFilters && (
              <div className="lg:w-1/4 bg-white p-4 rounded-lg shadow-sm h-fit">
                <h2 className="text-lg font-semibold mb-4">Filters</h2>
                
                {/* Price range filter */}
                <div className="mb-6">
                  <h3 className="font-medium mb-2">Price Range</h3>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-600">${priceRange[0]}</span>
                    <span className="text-gray-600">${priceRange[1]}</span>
                  </div>
                  <div className="flex gap-4">
                    <input
                      type="range"
                      min="0"
                      max="1000"
                      step="50"
                      value={priceRange[0]}
                      onChange={(e) => handlePriceRangeChange(e, 0)}
                      className="w-full"
                    />
                    <input
                      type="range"
                      min="0"
                      max="1000"
                      step="50"
                      value={priceRange[1]}
                      onChange={(e) => handlePriceRangeChange(e, 1)}
                      className="w-full"
                    />
                  </div>
                </div>
                
                {/* Stops filter */}
                <div className="mb-6">
                  <h3 className="font-medium mb-2">Stops</h3>
                  <div className="space-y-2">
                    {filters.stops.map(stop => (
                      <label key={stop} className="flex items-center">
                        <input
                          type="radio"
                          name="stops"
                          value={stop}
                          checked={activeFilters.stops === stop}
                          onChange={() => handleFilterChange('stops', stop)}
                          className="mr-2"
                        />
                        {stop === 'all' ? 'All' : stop === '0' ? 'Non-stop' : stop === '1' ? '1 Stop' : '2+ Stops'}
                      </label>
                    ))}
                  </div>
                </div>
                
                {/* Airlines filter */}
                <div className="mb-6">
                  <h3 className="font-medium mb-2">Airlines</h3>
                  <div className="space-y-2">
                    {filters.airlines.map(airline => (
                      <label key={airline} className="flex items-center">
                        <input
                          type="radio"
                          name="airlines"
                          value={airline}
                          checked={activeFilters.airlines === airline}
                          onChange={() => handleFilterChange('airlines', airline)}
                          className="mr-2"
                        />
                        {airline === 'all' ? 'All Airlines' : airline}
                      </label>
                    ))}
                  </div>
                </div>
                
                {/* Departure time filter */}
                <div className="mb-6">
                  <h3 className="font-medium mb-2">Departure Time</h3>
                  <div className="space-y-2">
                    {filters.departureTime.map(time => (
                      <label key={time} className="flex items-center">
                        <input
                          type="radio"
                          name="departureTime"
                          value={time}
                          checked={activeFilters.departureTime === time}
                          onChange={() => handleFilterChange('departureTime', time)}
                          className="mr-2"
                        />
                        {time === 'all' ? 'All Times' 
                         : time === 'morning' ? 'Morning (6AM - 12PM)' 
                         : time === 'afternoon' ? 'Afternoon (12PM - 6PM)' 
                         : time === 'evening' ? 'Evening (6PM - 10PM)' 
                         : 'Night (10PM - 6AM)'}
                      </label>
                    ))}
                  </div>
                </div>
                
                {/* Clear filters button */}
                <button
                  onClick={() => {
                    setActiveFilters({
                      stops: 'all',
                      airlines: 'all',
                      departureTime: 'all',
                    });
                    setPriceRange([0, 1000]);
                  }}
                  className="w-full btn btn-outline"
                >
                  Clear All Filters
                </button>
              </div>
            )}
            
            {/* Results section */}
            <div className={`${showFilters ? 'lg:w-3/4' : 'w-full'}`}>
              {/* Sort options */}
              <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <p className="text-gray-600">
                    {filteredFlights.length} {filteredFlights.length === 1 ? 'flight' : 'flights'} found
                  </p>
                  <div className="flex items-center">
                    <label htmlFor="sort-by" className="mr-2 text-gray-600">Sort by:</label>
                    <select
                      id="sort-by"
                      value={filters.sort}
                      onChange={(e) => handleSortChange(e.target.value)}
                      className="form-input py-1"
                    >
                      <option value="price-asc">Price: Lowest first</option>
                      <option value="price-desc">Price: Highest first</option>
                      <option value="duration-asc">Duration: Shortest first</option>
                      <option value="departure-asc">Departure: Earliest first</option>
                      <option value="arrival-asc">Arrival: Earliest first</option>
                    </select>
                  </div>
                </div>
              </div>
              
              {/* Flight results */}
              {loading ? (
                <div className="flex justify-center items-center h-64">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
                </div>
              ) : filteredFlights.length === 0 ? (
                <div className="bg-white p-8 rounded-lg shadow-sm text-center">
                  <h3 className="text-xl font-semibold mb-2">No flights found</h3>
                  <p className="text-gray-600 mb-4">Try adjusting your filters or search criteria</p>
                  <button
                    onClick={() => {
                      setActiveFilters({
                        stops: 'all',
                        airlines: 'all',
                        departureTime: 'all',
                      });
                      setPriceRange([0, 1000]);
                    }}
                    className="btn btn-primary"
                  >
                    Clear Filters
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredFlights.map((flight) => (
                    <div key={flight.id} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-200">
                      <div className="p-4 sm:p-6">
                        <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                          {/* Airline info */}
                          <div className="lg:w-1/6">
                            <div className="flex items-center mb-2">
                              <div className="w-10 h-10 mr-3 relative">
                                <Image
                                  src={flight.airlineLogo}
                                  alt={flight.airline}
                                  layout="fill"
                                  objectFit="contain"
                                />
                              </div>
                              <div>
                                <p className="font-medium">{flight.airline}</p>
                                <p className="text-sm text-gray-600">{flight.flightNumber}</p>
                              </div>
                            </div>
                          </div>
                          
                          {/* Flight times */}
                          <div className="lg:w-3/6">
                            <div className="flex items-center">
                              <div className="text-center">
                                <p className="font-bold text-lg">{flight.departureTime}</p>
                                <p className="text-sm text-gray-600">{flight.originCode}</p>
                              </div>
                              
                              <div className="mx-4 flex-grow">
                                <div className="text-xs text-center mb-1">{flight.duration}</div>
                                <div className="relative flex items-center">
                                  <div className="h-0.5 bg-gray-300 w-full"></div>
                                  {flight.stops > 0 ? (
                                    <>
                                      <div className="absolute left-1/2 -ml-1 w-2 h-2 rounded-full bg-gray-500"></div>
                                      <div className="absolute left-1/2 mt-4 -ml-4 text-xs text-gray-500">
                                        {flight.stops} stop
                                      </div>
                                    </>
                                  ) : (
                                    <FaPlane className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-primary-500" />
                                  )}
                                </div>
                                {flight.stops > 0 && (
                                  <div className="text-xs text-center mt-4 text-gray-600">
                                    {flight.stopLocations.join(', ')}
                                  </div>
                                )}
                              </div>
                              
                              <div className="text-center">
                                <p className="font-bold text-lg">{flight.arrivalTime}</p>
                                <p className="text-sm text-gray-600">{flight.destinationCode}</p>
                              </div>
                            </div>
                          </div>
                          
                          {/* Flight details */}
                          <div className="lg:w-1/6">
                            <div className="flex flex-col text-sm text-gray-600">
                              <div className="flex items-center mb-1">
                                <FaRegClock className="mr-1" /> {flight.duration}
                              </div>
                              <div className="flex items-center mb-1">
                                <FaChair className="mr-1" /> {flight.cabinClass}
                              </div>
                              <div className="flex items-center">
                                <FaSuitcase className="mr-1" /> Baggage included
                              </div>
                            </div>
                          </div>
                          
                          {/* Price and booking */}
                          <div className="lg:w-1/6 flex flex-col items-center">
                            <div className="mb-2 text-center">
                              <p className="line-through text-gray-500">${flight.price}</p>
                              <p className="text-primary-600 font-bold text-2xl">${flight.discountedPrice}</p>
                              <p className="text-xs text-gray-600">per passenger</p>
                            </div>
                            <div className="bg-red-100 text-red-800 text-xs font-semibold px-2 py-1 rounded-full mb-2">
                              Save {flight.discountPercentage}%
                            </div>
                            <Link href={`/booking/flight/${flight.id}`} className="btn btn-primary w-full sm:w-auto flex items-center justify-center">
                              <FaShoppingCart className="mr-2" /> Book Now
                            </Link>
                          </div>
                        </div>
                        
                        {/* Expandable details section (simplified for demo) */}
                        <div className="mt-4 pt-4 border-t border-gray-200">
                          <div className="flex flex-wrap justify-between text-sm text-gray-600">
                            <div className="mb-2">
                              <span className="font-medium">Aircraft:</span> {flight.aircraft}
                            </div>
                            <div className="mb-2">
                              <span className="font-medium">Seats available:</span> {flight.seatsAvailable}
                            </div>
                            <div className="mb-2">
                              <span className="font-medium">Departs:</span> {formatDate(flight.departureDate)}
                            </div>
                            {flight.returnDate && (
                              <div className="mb-2">
                                <span className="font-medium">Returns:</span> {formatDate(flight.returnDate)}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
} 