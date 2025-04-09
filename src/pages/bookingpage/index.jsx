import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  getPhysicianDetails,
  getBookedAppointments,
  bookAppointment,
} from "./action";

const generateTimeSlots = () => {
  const timeSlots = [];

  // Morning slots (9:00 AM to 1:00 PM)
  for (let i = 9; i < 13; i++) {
    timeSlots.push(`${i}:00 AM`);
  }

  // Evening slots (3:00 PM to 6:00 PM)
  for (let i = 3; i < 6; i++) {
    timeSlots.push(`${i}:00 PM`);
  }

  return timeSlots;
};

const Booking = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const physicianId = params.id;
  const {
    loading,
    physicianDetails,
    bookedTimeSlots = [],
    error,
  } = useSelector((state) => state.booking);

  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [availableTimeSlots, setAvailableTimeSlots] = useState([]);

  useEffect(() => {
    dispatch(getPhysicianDetails(physicianId));

    if (selectedDate) {
      dispatch(getBookedAppointments(physicianId));
    }
  }, [dispatch, physicianId, selectedDate]);

  useEffect(() => {
    if (selectedDate && bookedTimeSlots) {
      const allSlots = generateTimeSlots();
      const formattedDate = selectedDate.toLocaleDateString("en-GB"); // Convert to dd/mm/yyyy

      if (!Array.isArray(bookedTimeSlots)) {
        setAvailableTimeSlots(allSlots); // No previous bookings, allow all slots
        return;
      }

      // Extract only times from bookedTimeSlots
      const bookedTimes = bookedTimeSlots
        .filter((t) => t?.bookedTime?.startsWith(formattedDate)) // Match selected date
        .map((t) => {
          const timeParts = t.bookedTime.split(" ");
          return `${timeParts[1]} ${timeParts[2]}`;
        });

      // Filter available slots
      const availableSlots = allSlots.filter(
        (slot) => !bookedTimes.includes(slot)
      );

      setAvailableTimeSlots(availableSlots);
    }
  }, [selectedDate, bookedTimeSlots]);

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
  };

  const handleBookAppointment = () => {
    if (!selectedDate || !selectedTime) return;

    const formattedDate = selectedDate.toLocaleDateString("en-GB"); // Ensure dd/mm/yyyy format
    const formattedDateTime = `${formattedDate} ${selectedTime}`;

    dispatch(bookAppointment(physicianId, formattedDateTime));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="pt-20 container mx-auto p-4 max-w-4xl">
      <div className="bg-white rounded-2xl shadow-xl p-8 space-y-8 border border-gray-100">
        {/* Physician Info */}
        <div className="physician-info space-y-3">
          <h1 className="text-4xl font-extrabold text-blue-800">
            {physicianDetails.name}
          </h1>
          <p className="text-xl text-gray-700">{physicianDetails.speciality}</p>
          <div className="text-gray-600 space-y-1">
            <p>
              📞{" "}
              <span className="font-medium">
                {physicianDetails.contactNumber}
              </span>
            </p>
            <p>
              📧 <span className="font-medium">{physicianDetails.email}</span>
            </p>
          </div>
        </div>

        {/* Clinic Info */}
        <div className="clinics-info space-y-4">
          <h2 className="text-2xl font-semibold text-blue-700 border-b pb-2 border-gray-200">
            Available Clinics
          </h2>
          <div className="space-y-4">
            {physicianDetails.clinics?.map((clinic, index) => (
              <div
                key={index}
                className="clinic-card bg-gradient-to-br from-blue-50 to-white border border-blue-100 rounded-xl p-4 shadow-sm hover:shadow-md transition"
              >
                <h3 className="font-semibold text-blue-800 text-lg">
                  {clinic.clinicName}
                </h3>
                <p className="text-gray-700">{clinic.address}</p>
                <p className="text-gray-600">{clinic.city}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Booking Section */}
        <div className="booking-section space-y-6">
          <h2 className="text-2xl font-semibold text-blue-700 border-b pb-2 border-gray-200">
            Book an Appointment
          </h2>

          {/* Date Picker */}
          <div className="date-picker">
            <label className="block mb-2 text-gray-700 font-medium">
              Select a Date
            </label>
            <DatePicker
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              minDate={new Date()}
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholderText="Select a date"
              dateFormat="dd/MM/yyyy"
              filterDate={(date) => {
                const day = date.getDay();
                return day !== 0 && day !== 6; // 0 = Sunday, 6 = Saturday
            }}
            />
          </div>

          {/* Time Slots */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Available Time Slots
            </h3>
            <div className="time-grid grid grid-cols-3 sm:grid-cols-4 gap-3">
              {availableTimeSlots.map((timeSlot, index) => (
                <button
                  key={index}
                  onClick={() => handleTimeSelect(timeSlot)}
                  className={`p-3 rounded-xl text-sm font-medium transition-all border
                ${
                  selectedTime === timeSlot
                    ? "bg-blue-600 text-white border-blue-600 shadow-md"
                    : "bg-white text-gray-800 border-gray-300 hover:bg-blue-50 hover:border-blue-300"
                }`}
                >
                  {timeSlot}
                </button>
              ))}
            </div>
          </div>

          {/* Book Button */}
          <button
            className={`w-full bg-blue-600 text-white py-3 px-4 rounded-xl font-semibold shadow-lg hover:bg-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed`}
            onClick={handleBookAppointment}
            disabled={!selectedDate || !selectedTime}
          >
            Confirm Booking
          </button>
        </div>
      </div>
    </div>
  );
};

export default Booking;
