import React from "react";

const formatDateTime = (bookedTime) => {
  if (!bookedTime) return { date: "", time: "" };

  const [date, time] = bookedTime.split(" ");
  return { date, time };
};

const AppointmentCard = ({ data, onReschedule, onCancel, isLoading }) => {
  const { date, time } = formatDateTime(data.bookedTime);
  const isDisabled = data.status?.toLowerCase() === "cancelled";
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  return (
    <div className="bg-white rounded-2xl shadow-md p-6 mb-4 border border-[#E5E7EB] hover:shadow-lg transition-shadow hover:-translate-y-1 transform transition-transform">
      {/* Patient Name & Status */}
      <div className="flex justify-between items-start mb-4">
        <div>
        
          <p className="text-[#2D336B] text-base font-medium">Patient</p>
        </div>
        <span className="bg-[#A9B5DF] text-[#2D336B] text-xs font-medium px-3 py-1 rounded-full">
          {data.status}
        </span>
      </div>

      {/* Appointment Details */}
      <div className="space-y-2 text-base text-[#7886C7]">
        <p>
          Doctor: <span className="text-[#2D336B]">{data.physician?.name}</span>
        </p>
        <p>
          Clinic:{" "}
          <span className="text-[#2D336B]">
            {data.physician?.clinics?.[0]?.clinicName}
          </span>
        </p>
        <p>
          Date: <span className="text-[#2D336B]">{date}</span>
        </p>
        <p>
          Time: <span className="text-[#2D336B]">{time}</span>
        </p>
        <p>
          Speciality:{" "}
          <span className="text-[#2D336B]">{data.physician?.speciality}</span>
        </p>
      </div>

      {/* Buttons Section */}
      <div className="flex justify-between mt-6">
        <button
          onClick={() => onReschedule(data)}
          className={`px-4 py-2 rounded-md transition ${
            isDisabled
              ? 'bg-[#7886C7] text-[#4B5563]'
              : 'bg-[#2D336B] text-white hover:bg-[#7886C7]'
          }`} 
          disabled={isDisabled}
        >
          Reschedule
        </button>
        <button
          onClick={() => onCancel(data)}
          className={`px-4 py-2 rounded-md transition ${
            isDisabled
              ? 'bg-[#7886C7] text-[#4B5563]'
              : 'bg-[#2D336B] text-white hover:bg-[#7886C7]'
          }`}
          disabled={isDisabled}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default AppointmentCard;
