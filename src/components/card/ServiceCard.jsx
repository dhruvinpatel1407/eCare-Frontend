import React from "react";

const ServiceCard = ({ service }) => {
  return (
    <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-4 w-80">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white">
        {service.name}
      </h2>
      <p className="text-gray-600 dark:text-gray-300 mt-2">
        {service.description}
      </p>
      <p className="text-lg font-semibold text-blue-600 dark:text-blue-400 mt-2">
        ₹{service.price}
      </p>
      <span className="inline-block bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm px-3 py-1 rounded mt-3">
        {service.category}
      </span>
    </div>
  );
};

export default ServiceCard;
