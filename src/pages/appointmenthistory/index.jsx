import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import AppointmentCard from "../../components/card/AppointmentCard";
import { fetchAppointments, cancelAppointment } from "./action";
import { useNavigate } from "react-router-dom";

const AppointmentHistory = () => {
  const dispatch = useDispatch();
  const { appointments, loading: loadingAppointments } = useSelector(
    (state) => state.appointment
  );
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchAppointments());
  }, [dispatch]);

  const isLoading = loadingAppointments;

  const handleReschedule = (appointment) => {
    navigate(`/reschedule/${appointment._id}`);
  };

  const handleCancel = async (appointment) => {
    try {
      await dispatch(cancelAppointment(appointment._id)); 
      dispatch(fetchAppointments());                      
    } catch (error) {
      console.error("Failed to cancel appointment:", error.message);
      
    }
     
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="pt-20 container mx-auto p-4">
      <h1 className="text-3xl font-bold mt-12 mb-8 text-center text-blue-800">
        Your Appointments
      </h1>

      {appointments.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center space-y-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 64 64"
            className="w-64 h-64 object-contain"
            fill="none"
          >
            <rect width="64" height="64" rx="8" fill="#E0F2FE" />
            <g>
              <rect x="16" y="20" width="32" height="24" rx="4" fill="white" />
              <rect x="16" y="20" width="32" height="4" fill="#3B82F6" />
              <circle cx="22" cy="22" r="1" fill="white" />
              <circle cx="26" cy="22" r="1" fill="white" />
              <circle cx="30" cy="22" r="1" fill="white" />
              <rect x="22" y="28" width="20" height="2" rx="1" fill="#CBD5E1" />
              <rect x="22" y="32" width="12" height="2" rx="1" fill="#CBD5E1" />
              <rect x="22" y="36" width="16" height="2" rx="1" fill="#CBD5E1" />
            </g>
            <circle cx="38" cy="44" r="6" fill="#F87171" />
            <path
              d="M36.5858 41.4142L39.4142 44.2426M39.4142 41.4142L36.5858 44.2426"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>

          <h2 className="text-2xl font-semibold text-gray-700">
            No Appointments Found
          </h2>
          <p className="text-gray-500">
            It looks like you haven’t booked any appointments yet.
          </p>
          <button
            onClick={() => navigate("/dashboard")}
            className="mt-4 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all"
          >
            Book an Appointment
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {appointments.map((appointment) => (
            <AppointmentCard
              key={appointment._id}
              data={appointment}
              onReschedule={handleReschedule}
              onCancel={handleCancel}
              isLoading={isLoading}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default AppointmentHistory;
