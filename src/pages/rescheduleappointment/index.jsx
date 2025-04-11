// Client/src/pages/reschedulepage/index.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { getExistingAppointmentDetails, rescheduleAppointment } from "./action";

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
    error,
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
      const availableSlots = allSlots.filter(
        (slot) => !bookedTimes.includes(slot)
      );

      setAvailableTimeSlots(availableSlots);
    }
  }, [selectedDate, bookedTimeSlots]);

  useEffect(() => {
    if (existingAppointment) {
      // Split the bookedTime string into date and time parts
      const [datePart, timePart, period] =
        existingAppointment.bookedTime.split(/\s+/);
      const [day, month, year] = datePart.split("/");
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

  return (
    <div className="pt-20 container mx-auto p-4 max-w-4xl">
      <div className="bg-white rounded-2xl shadow-xl p-8 space-y-8 border border-[#A9B5DF]">
        {/* Existing Appointment Info */}
        <div className="space-y-3">
          <h2 className="text-3xl font-bold text-[#2D336B]">
            Your Current Appointment
          </h2>
          <div className="bg-[#FFF2F2] border-l-4 border-[#A9B5DF] p-4 rounded-lg text-[#2D336B] text-base">
            <p>
              <span className="font-medium">Date:</span>{" "}
              {existingAppointment?.bookedTime.split(" ")[0]}
            </p>
            <p>
              <span className="font-medium">Time:</span> {selectedTime}
            </p>
          </div>
        </div>

        {/* Reschedule Section */}
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-[#2D336B] border-b pb-2 border-[#A9B5DF]">
            Reschedule Your Appointment
          </h2>

          {/* Date Picker */}
          <div>
            <label className="block mb-2 text-[#2D336B] font-medium text-base">
              Select a New Date
            </label>
            <DatePicker
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              minDate={new Date()}
              className="w-full p-3 border border-[#A9B5DF] rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#7886C7]"
              placeholderText="Select a date"
              dateFormat="dd/MM/yyyy"
            />
          </div>

          {/* Available Time Slots */}
          <div>
            <h3 className="text-lg font-semibold text-[#2D336B] mb-2">
              Available Time Slots
            </h3>
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
              {availableTimeSlots.map((timeSlot, index) => (
                <button
                  key={index}
                  onClick={() => handleTimeSelect(timeSlot)}
                  className={`p-3 rounded-xl text-sm font-medium transition-all border ${
                    selectedTime === timeSlot
                      ? "bg-[#2D336B] text-white border-[#2D336B] shadow-md"
                      : "bg-white text-[#2D336B] border-[#A9B5DF] hover:bg-[#A9B5DF]/20 hover:border-[#7886C7]"
                  }`}
                >
                  {timeSlot}
                </button>
              ))}
            </div>
          </div>

          {/* Reschedule Button */}
          <button
            onClick={handleRescheduleAppointment}
            disabled={!selectedDate || !selectedTime}
            className="w-full bg-[#2D336B] text-white py-3 px-4 rounded-xl font-semibold shadow-lg hover:bg-[#7886C7] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Confirm Reschedule
          </button>
        </div>
      </div>
    </div>
  );
};

export default RescheduleAppointment;
