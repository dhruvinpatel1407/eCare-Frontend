import React from "react";

const ServiceCard = ({ service }) => {
  return (
    <div className="bg-white hover:shadow-2xl transition-shadow duration-300 rounded-2xl p-6 w-80 border border-gray-200 ">
  <h2 className="text-2xl font-bold text-gray-800 mb-1">
    {service.name}
  </h2>
  
  <p className="text-gray-600 text-sm mb-3">
    {service.description}
  </p>
  
  <p className="text-lg font-semibold text-emerald-600">
    ₹{service.price}
  </p>
  
  <span className="inline-block bg-blue-100 text-blue-700 text-xs font-medium px-3 py-1 rounded-full mt-3">
    {service.category}
  </span>
</div>

  );
};

export default ServiceCard;
