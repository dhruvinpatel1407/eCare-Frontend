// Client/src/components/DoctorsList.jsx
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchDoctors } from "./action";
import DoctorCard from "../../components/card/DoctorCard";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { doctors, loading, error } = useSelector((state) => state.dashboard);

  useEffect(() => {
    dispatch(fetchDoctors());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="w-full bg-[#FFF2F2] ">
    <div className="pt-20 container mx-auto p-4 bg-[#FFF2F2] min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-center text-[#2D336B]">
        Our Doctors
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {doctors.map((doctor) => (
          <DoctorCard
            key={doctor._id}
            type="doctor"
            data={{
              name: doctor.name,
              speciality: doctor.speciality,
              hospital: doctor.hospital,
              rating: doctor.rating || 4,
              date: doctor.availableDays?.[0] || "Monday-Friday",
              time: doctor.availableTime || "10:00 AM - 5:00 PM",
              id: doctor._id,
            }}
          />
        ))}
      </div>
    </div></div>
  );
};

export default Dashboard;
