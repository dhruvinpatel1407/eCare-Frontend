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
  const { loading, physicianDetails, bookedTimeSlots = [], error } = useSelector(
    (state) => state.booking
  );

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
      const availableSlots = allSlots.filter((slot) => !bookedTimes.includes(slot));

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
  
    dispatch(bookAppointment(physicianId,formattedDateTime));
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
    <div className="container mx-auto p-4 max-w-4xl">
      <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
        {/* Physician Info */}
        <div className="physician-info space-y-4">
          <h1 className="text-3xl font-bold text-gray-800">
            {physicianDetails.name}
          </h1>
          <p className="text-xl text-gray-600">{physicianDetails.speciality}</p>
          <p className="text-gray-700">📞 {physicianDetails.contactNumber}</p>
          <p className="text-gray-700">📧 {physicianDetails.email}</p>
        </div>

        {/* Clinic Info */}
        <div className="clinics-info space-y-4">
          <h2 className="text-2xl font-semibold text-gray-800">
            Available Clinics
          </h2>
          <div className="space-y-4">
            {physicianDetails.clinics?.map((clinic, index) => (
              <div
                key={index}
                className="clinic-card bg-gray-50 rounded-lg p-4 shadow-sm"
              >
                <h3 className="font-semibold text-gray-800">{clinic.clinicName}</h3>
                <p className="text-gray-700">{clinic.address}</p>
                <p className="text-gray-700">{clinic.city}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Booking Section */}
        <div className="booking-section space-y-6">
          <h2 className="text-2xl font-semibold text-gray-800">
            Select Appointment Date
          </h2>

          {/* Date Picker */}
          <div className="date-picker">
            <DatePicker
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              minDate={new Date()}
              className="w-full p-2 border rounded-lg"
              placeholderText="Select a date"
              dateFormat="dd/MM/yyyy"
            />
          </div>

          <h3 className="text-lg font-medium text-gray-800">Available Time Slots</h3>

          {/* Time Slots Grid */}
          <div className="time-grid grid grid-cols-3 gap-2">
            {availableTimeSlots.map((timeSlot, index) => (
              <button
                key={index}
                onClick={() => handleTimeSelect(timeSlot)}
                className={`p-3 rounded-lg text-center transition-colors ${
                  selectedTime === timeSlot
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 hover:bg-gray-200'
                }`}
              >
                {timeSlot}
              </button>
            ))}
          </div>

          {/* Book Button */}
          <button
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors"
            onClick={handleBookAppointment}
            disabled={!selectedDate || !selectedTime}
          >
            Book Appointment
          </button>
        </div>
      </div>
    </div>
  );
};

export default Booking;
