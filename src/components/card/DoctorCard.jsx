// Client/src/components/DoctorCard.jsx
import React from 'react';
import { FaUser, FaCalendarAlt, FaClock, FaStar, FaRetweet } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const DoctorCard = ({ 
  type = "doctor",
  data = {},
  onClick = () => {}
}) => {
  
  const navigate = useNavigate();

  const {
    name = "",
    speciality = "",
    hospital = "",
    rating = 0,
    date = "",
    time = "",
    id = ""
  } = data;

  const handleBooking = () => {
    navigate(`/appointment/${id}`);
  };

  return (
    <div 
      className="bg-white rounded-lg shadow-md p-6 mb-4 transition-transform duration-200 hover:scale-105 hover:shadow-lg"
      onClick={onClick}
    >
      <div className="flex justify-between items-start">
        <div className="flex items-center">
          <div className="bg-blue-100 p-2 rounded-full mr-3">
            <FaUser className="text-blue-600 text-xl" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-800">{name}</h3>
            <p className="text-gray-600">{speciality}</p>
          </div>
        </div>
        {type === "doctor" && (
          <div className="flex items-center">
            <span className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} 
                  className={`text-sm ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
                />
              ))}
            </span>
          </div>
        )}
      </div>

      {type === "doctor" && (
        <div className="mt-4">
          <p className="text-gray-600">Available at {hospital}</p>
          <div className="flex items-center mt-2">
            <FaCalendarAlt className="text-green-600 mr-2" />
            <span className="text-gray-700">{date}</span>
          </div>
          <div className="flex items-center">
            <FaClock className="text-green-600 mr-2" />
            <span className="text-gray-700">{time}</span>
          </div>
        </div>
      )}

      {/* {isBookingHistory && (
        <div className="mt-4">
          <div className="flex justify-between items-center">
            <div>
              <p className="font-medium text-gray-800">{patientName}</p>
              <p className="text-sm text-gray-600">{status}</p>
            </div>
            <span className={`px-3 py-1 rounded-full text-sm ${status === 'Completed' ? 'bg-green-100 text-green-800' : status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-blue-100 text-blue-800'}`}>
              {status}
            </span>
          </div>
          <div className="flex items-center mt-2">
            <FaCalendarAlt className="text-blue-600 mr-2" />
            <span className="text-gray-700">{date}</span>
          </div>
          <div className="flex items-center">
            <FaClock className="text-blue-600 mr-2" />
            <span className="text-gray-700">{time}</span>
          </div>
        </div>
      )} */}

      {type === "doctor" && (
        <button 
          className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
          onClick={handleBooking}
        >
          Book Appointment
        </button>
      )}

    </div>
  );
};

export default DoctorCard;