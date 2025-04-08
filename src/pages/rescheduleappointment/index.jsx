// Client/src/pages/reschedulepage/index.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  getExistingAppointmentDetails,
  rescheduleAppointment
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

const RescheduleAppointment = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const appointmentId = params.id;

  const { 
    loading, 
    existingAppointment,
    bookedTimeSlots = [], 
    error 
  } = useSelector((state) => state.reschedule);

  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [availableTimeSlots, setAvailableTimeSlots] = useState([]);
  
  useEffect(() => {
    dispatch(getExistingAppointmentDetails(appointmentId));
    
  }, [dispatch, appointmentId]);

  useEffect(() => {
    if (selectedDate && bookedTimeSlots) {
      const allSlots = generateTimeSlots();
      const formattedDate = selectedDate.toLocaleDateString("en-GB");

      if (!Array.isArray(bookedTimeSlots)) {
        setAvailableTimeSlots(allSlots);
        return;
      }

      // Extract only times from bookedTimeSlots
      const bookedTimes = bookedTimeSlots
        .filter((t) => t?.bookedTime?.startsWith(formattedDate))
        .map((t) => {
          const timeParts = t.bookedTime.split(" ");
          return `${timeParts[1]} ${timeParts[2]}`;
        });

      // Filter available slots
      const availableSlots = allSlots.filter((slot) => !bookedTimes.includes(slot));

      setAvailableTimeSlots(availableSlots);
    }
  }, [selectedDate, bookedTimeSlots]);

  useEffect(() => {
    if (existingAppointment) {
     
      // Split the bookedTime string into date and time parts
      const [datePart, timePart, period] = existingAppointment.bookedTime.split(/\s+/); 
      const [day, month, year] = datePart.split('/');
      const existingTIme = `${timePart} ${period}`; 
      
      // Create a valid Date object
      const appointmentDate = new Date(year, month - 1, day); // Months are 0-based in JavaScript
      
      setSelectedDate(appointmentDate);
      setSelectedTime(existingTIme);
    }
  }, [existingAppointment]);

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
  };

  const handleRescheduleAppointment = () => {
    if (!selectedDate || !selectedTime) return;

    const formattedDate = selectedDate.toLocaleDateString("en-GB");
    const formattedDateTime = `${formattedDate} ${selectedTime}`;
    
    dispatch(rescheduleAppointment(appointmentId, formattedDateTime, navigate));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // if (error) {
  //   return (
  //     <div className="flex justify-center items-center h-screen text-red-500">
  //       Error: {error}
  //     </div>
  //   );
  // }

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
        {/* Existing Appointment Info */}
        <div className="existing-appointment-info space-y-4">
          <h2 className="text-2xl font-semibold text-gray-800">
            Current Appointment Details
          </h2>
          <p className="text-gray-700">
            Date:{existingAppointment?.bookedTime.split(' ')[0]}
          </p>
          <p className="text-gray-700">Time: {selectedTime}</p>
        </div>

        {/* Reschedule Section */}
        <div className="reschedule-section space-y-6">
          <h2 className="text-2xl font-semibold text-gray-800">
            Select New Appointment Date
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

          {/* Reschedule Button */}
          <button
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors"
            onClick={handleRescheduleAppointment}
            disabled={!selectedDate || !selectedTime}
          >
            Reschedule Appointment
          </button>
        </div>
      </div>
    </div>
  );
};

export default RescheduleAppointment;