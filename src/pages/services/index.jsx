import React, { useEffect } from "react";
import { fetchServices } from "./action";
import { useSelector, useDispatch } from "react-redux";
import ServiceCard from "../../components/card/ServiceCard";

const ServicesPage = () => {
  const dispatch = useDispatch();
  const { services, loading, error } = useSelector((state) => state.services);

  useEffect(() => {
    dispatch(fetchServices());
  }, [dispatch]);

  if (loading) {
    return (
        <div className="flex justify-center items-center h-screen">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
    );
}
  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="pt-20 container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Our Services</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {services.map((service) => (
          <ServiceCard key={service._id} service={service} />
        ))}
      </div>
    </div>
  );
};

export default ServicesPage;