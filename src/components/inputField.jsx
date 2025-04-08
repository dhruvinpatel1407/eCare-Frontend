import React from 'react';

const InputField = ({ 
  label,
  type = 'text',
  name,
  value,
  onChange,
  placeholder,
  error,
  required = false
}) => {
  return (
    <div className="mb-6">
      {label && (
        <label
          htmlFor={name}
          className="block text-gray-800 text-sm font-medium mb-1"
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <input
        id={name}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full px-4 py-2 text-sm rounded-lg border transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
          error ? "border-red-500" : "border-gray-300"
        }`}
      />
      {error && <p className="text-red-500 text-xs mt-1 italic">{error}</p>}
    </div>
  );
};

export default InputField;