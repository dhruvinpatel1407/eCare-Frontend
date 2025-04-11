import React from "react";

const ServiceCard = ({ service }) => {
  return (
    <div className="bg-white hover:shadow-2xl transition-shadow duration-300 rounded-2xl p-6 w-80 border border-[#A9B5DF]">
    <h2 className="text-xl font-bold text-[#2D336B] mb-2">
      {service.name}
    </h2>
  
    <p className="text-base text-[#7886C7] mb-3">
      {service.description}
    </p>
  
    <p className="text-lg font-semibold text-emerald-600">
      ₹{service.price}
    </p>
  
    <span className="inline-block bg-[#A9B5DF] text-white text-sm font-medium px-3 py-1 rounded-full mt-3">
      {service.category}
    </span>
  </div>
  

  );
};

export default ServiceCard;
