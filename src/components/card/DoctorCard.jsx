// Client/src/components/DoctorCard.jsx
import React from "react";
import {
  FaUser,
  FaCalendarAlt,
  FaClock,
  FaStar,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const DoctorCard = ({ type = "doctor", data = {}, onClick = () => {} }) => {
  const navigate = useNavigate();

  const {
    name = "",
    speciality = "",
    hospital = "",
    rating = 0,
    date = "",
    time = "",
    id = "",
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
          <div className="bg-[#A9B5DF] p-2 rounded-full mr-3">
            <FaUser className="text-[#2D336B] text-xl" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-[#2D336B]">{name}</h3>
            <p className="text-base text-[#7886C7]">{speciality}</p>
          </div>
        </div>

        {type === "doctor" && (
          <div className="flex items-center">
            <span className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <FaStar
                  key={i}
                  className={`text-sm ${
                    i < rating ? "text-yellow-400" : "text-[#A9B5DF]"
                  }`}
                />
              ))}
            </span>
          </div>
        )}
      </div>

      {type === "doctor" && (
        <div className="mt-4 space-y-1">
          <p className="text-base text-[#2D336B]">
            Available at <span className="font-medium">{hospital}</span>
          </p>
          <div className="flex items-center">
            <FaCalendarAlt className="text-[#2D336B] mr-2" />
            <span className="text-sm text-[#7886C7]">{date}</span>
          </div>
          <div className="flex items-center">
            <FaClock className="text-[#2D336B] mr-2" />
            <span className="text-sm text-[#7886C7]">{time}</span>
          </div>
        </div>
      )}

      {type === "doctor" && (
        <button
          className="mt-4 w-full bg-[#2D336B] text-white py-2 rounded-lg hover:bg-[#1c244f] transition-colors duration-200 text-base font-medium"
          onClick={handleBooking}
        >
          Book Appointment
        </button>
      )}
    </div>
  );
};

export default DoctorCard;
