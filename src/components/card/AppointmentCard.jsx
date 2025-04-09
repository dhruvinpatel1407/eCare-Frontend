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
    <div className="bg-white rounded-lg shadow-md p-6 mb-4">
      {/* Patient Name & Status */}
      <div className="flex justify-between items-start mb-4">
        <div>
          {/* <h3 className="text-xl font-semibold text-gray-800">{data.patientName}</h3> */}
          <p className="text-gray-600">Patient</p>
        </div>
        <span className="bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded">
          {data.status}
        </span>
      </div>

      {/* Appointment Details */}
      <div className="space-y-2">
        <p className="text-gray-600">Doctor: {data.physician?.name}</p>
        <p className="text-gray-600">
          Clinic: {data.physician?.clinics?.[0]?.clinicName}
        </p>
        <p className="text-gray-600">Date: {date}</p>
        <p className="text-gray-600">Time: {time}</p>
        <p className="text-gray-600">
          Speciality: {data.physician?.speciality}
        </p>
      </div>

      {/* Buttons Section */}
      <div className="flex justify-between mt-4">
        <button
          onClick={() => onReschedule(data)}
          className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition"
          disabled={isDisabled}
        >
          Reschedule
        </button>
        <button
          onClick={() => onCancel(data)}
          className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
          disabled={isDisabled}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default AppointmentCard;
