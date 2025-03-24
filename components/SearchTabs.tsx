import { useState } from 'react';
import { FaPlane, FaHotel, FaSuitcase, FaExchangeAlt, FaCalendarAlt, FaMapMarkerAlt, FaUser } from 'react-icons/fa';
import { useRouter } from 'next/router';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

type TabType = 'flights' | 'hotels' | 'packages';
type FlightType = 'roundtrip' | 'oneway';

const SearchTabs = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabType>('flights');
  const [flightType, setFlightType] = useState<FlightType>('roundtrip');
  
  // Flight search state
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [departDate, setDepartDate] = useState<Date | null>(new Date());
  const [returnDate, setReturnDate] = useState<Date | null>(
    new Date(new Date().setDate(new Date().getDate() + 7))
  );
  const [passengers, setPassengers] = useState(1);
  
  // Hotel search state
  const [location, setLocation] = useState('');
  const [checkIn, setCheckIn] = useState<Date | null>(new Date());
  const [checkOut, setCheckOut] = useState<Date | null>(
    new Date(new Date().setDate(new Date().getDate() + 3))
  );
  const [rooms, setRooms] = useState(1);
  const [guests, setGuests] = useState(2);
  
  const handleSearchFlights = (e: React.FormEvent) => {
    e.preventDefault();
    router.push({
      pathname: '/flights',
      query: {
        origin,
        destination,
        departDate: departDate?.toISOString(),
        returnDate: flightType === 'roundtrip' ? returnDate?.toISOString() : undefined,
        passengers,
        flightType,
      },
    });
  };
  
  const handleSearchHotels = (e: React.FormEvent) => {
    e.preventDefault();
    router.push({
      pathname: '/hotels',
      query: {
        location,
        checkIn: checkIn?.toISOString(),
        checkOut: checkOut?.toISOString(),
        rooms,
        guests,
      },
    });
  };
  
  const handleSearchPackages = (e: React.FormEvent) => {
    e.preventDefault();
    router.push({
      pathname: '/packages',
      query: {
        origin,
        destination,
        departDate: departDate?.toISOString(),
        returnDate: returnDate?.toISOString(),
        passengers,
        rooms,
      },
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Tabs */}
      <div className="flex border-b">
        <button
          className={`flex-1 py-4 px-6 text-center font-medium focus:outline-none ${
            activeTab === 'flights'
              ? 'bg-primary-500 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
          onClick={() => setActiveTab('flights')}
        >
          <FaPlane className="inline-block mr-2" /> Flights
        </button>
        <button
          className={`flex-1 py-4 px-6 text-center font-medium focus:outline-none ${
            activeTab === 'hotels'
              ? 'bg-primary-500 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
          onClick={() => setActiveTab('hotels')}
        >
          <FaHotel className="inline-block mr-2" /> Hotels
        </button>
        <button
          className={`flex-1 py-4 px-6 text-center font-medium focus:outline-none ${
            activeTab === 'packages'
              ? 'bg-primary-500 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
          onClick={() => setActiveTab('packages')}
        >
          <FaSuitcase className="inline-block mr-2" /> Flight + Hotel
        </button>
      </div>

      {/* Flight Search Form */}
      {activeTab === 'flights' && (
        <div className="p-6">
          <div className="flex space-x-4 mb-4">
            <label className="inline-flex items-center">
              <input
                type="radio"
                className="form-radio text-primary-500"
                name="flightType"
                value="roundtrip"
                checked={flightType === 'roundtrip'}
                onChange={() => setFlightType('roundtrip')}
              />
              <span className="ml-2">Round Trip</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                className="form-radio text-primary-500"
                name="flightType"
                value="oneway"
                checked={flightType === 'oneway'}
                onChange={() => setFlightType('oneway')}
              />
              <span className="ml-2">One Way</span>
            </label>
          </div>

          <form onSubmit={handleSearchFlights}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="relative">
                <label className="form-label">From</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaMapMarkerAlt className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    className="form-input pl-10"
                    placeholder="City or Airport"
                    value={origin}
                    onChange={(e) => setOrigin(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="relative">
                <label className="form-label">To</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaMapMarkerAlt className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    className="form-input pl-10"
                    placeholder="City or Airport"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="form-label">Depart</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaCalendarAlt className="text-gray-400" />
                  </div>
                  <DatePicker
                    selected={departDate}
                    onChange={(date) => setDepartDate(date)}
                    className="form-input pl-10 w-full"
                    minDate={new Date()}
                    required
                  />
                </div>
              </div>
              {flightType === 'roundtrip' && (
                <div>
                  <label className="form-label">Return</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaCalendarAlt className="text-gray-400" />
                    </div>
                    <DatePicker
                      selected={returnDate}
                      onChange={(date) => setReturnDate(date)}
                      className="form-input pl-10 w-full"
                      minDate={departDate || new Date()}
                      required
                    />
                  </div>
                </div>
              )}
              <div>
                <label className="form-label">Passengers</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaUser className="text-gray-400" />
                  </div>
                  <select
                    className="form-input pl-10"
                    value={passengers}
                    onChange={(e) => setPassengers(Number(e.target.value))}
                  >
                    {[1, 2, 3, 4, 5, 6].map((num) => (
                      <option key={num} value={num}>
                        {num} {num === 1 ? 'Passenger' : 'Passengers'}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <button type="submit" className="btn btn-primary w-full py-3 text-lg font-semibold">
              Search Flights
            </button>
          </form>
        </div>
      )}

      {/* Hotel Search Form */}
      {activeTab === 'hotels' && (
        <div className="p-6">
          <form onSubmit={handleSearchHotels}>
            <div className="mb-4">
              <label className="form-label">Destination</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaMapMarkerAlt className="text-gray-400" />
                </div>
                <input
                  type="text"
                  className="form-input pl-10"
                  placeholder="City, Area, or Property"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="form-label">Check In</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaCalendarAlt className="text-gray-400" />
                  </div>
                  <DatePicker
                    selected={checkIn}
                    onChange={(date) => setCheckIn(date)}
                    className="form-input pl-10 w-full"
                    minDate={new Date()}
                    required
                  />
                </div>
              </div>
              <div>
                <label className="form-label">Check Out</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaCalendarAlt className="text-gray-400" />
                  </div>
                  <DatePicker
                    selected={checkOut}
                    onChange={(date) => setCheckOut(date)}
                    className="form-input pl-10 w-full"
                    minDate={checkIn || new Date()}
                    required
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="form-label">Rooms</label>
                <select
                  className="form-input"
                  value={rooms}
                  onChange={(e) => setRooms(Number(e.target.value))}
                >
                  {[1, 2, 3, 4, 5].map((num) => (
                    <option key={num} value={num}>
                      {num} {num === 1 ? 'Room' : 'Rooms'}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="form-label">Guests</label>
                <select
                  className="form-input"
                  value={guests}
                  onChange={(e) => setGuests(Number(e.target.value))}
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                    <option key={num} value={num}>
                      {num} {num === 1 ? 'Guest' : 'Guests'}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <button type="submit" className="btn btn-primary w-full py-3 text-lg font-semibold">
              Search Hotels
            </button>
          </form>
        </div>
      )}

      {/* Package Search Form */}
      {activeTab === 'packages' && (
        <div className="p-6">
          <form onSubmit={handleSearchPackages}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="form-label">From</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaMapMarkerAlt className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    className="form-input pl-10"
                    placeholder="City or Airport"
                    value={origin}
                    onChange={(e) => setOrigin(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div>
                <label className="form-label">To</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaMapMarkerAlt className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    className="form-input pl-10"
                    placeholder="City or Airport"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="form-label">Depart</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaCalendarAlt className="text-gray-400" />
                  </div>
                  <DatePicker
                    selected={departDate}
                    onChange={(date) => setDepartDate(date)}
                    className="form-input pl-10 w-full"
                    minDate={new Date()}
                    required
                  />
                </div>
              </div>
              <div>
                <label className="form-label">Return</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaCalendarAlt className="text-gray-400" />
                  </div>
                  <DatePicker
                    selected={returnDate}
                    onChange={(date) => setReturnDate(date)}
                    className="form-input pl-10 w-full"
                    minDate={departDate || new Date()}
                    required
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="form-label">Travelers</label>
                <select
                  className="form-input"
                  value={passengers}
                  onChange={(e) => setPassengers(Number(e.target.value))}
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                    <option key={num} value={num}>
                      {num} {num === 1 ? 'Traveler' : 'Travelers'}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="form-label">Rooms</label>
                <select
                  className="form-input"
                  value={rooms}
                  onChange={(e) => setRooms(Number(e.target.value))}
                >
                  {[1, 2, 3, 4, 5].map((num) => (
                    <option key={num} value={num}>
                      {num} {num === 1 ? 'Room' : 'Rooms'}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <button type="submit" className="btn btn-primary w-full py-3 text-lg font-semibold">
              Search Packages
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default SearchTabs;