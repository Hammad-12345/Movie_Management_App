import React from "react";

const TextField = (props) => {
  return (
    <div className="relative w-full">
      {/* Input Field */}
      <input
        className={`w-full px-2 pt-5 pb-2 border-t-0 border-l-0 border-r-0 border-b-2 text-gray-700 ${
          props.error && props.touched ? "border-red-500" : "border-gray-300"
        } focus:outline-none`}
        {...props}
        id={props.name}
        placeholder=" " /* Add a space placeholder */
      />

      {/* Animated Label */}
      <label
        className="absolute  top-2.5 text-gray-500 text-base transition-all duration-300 input-label"
        htmlFor={props.name}
      >
        {props.Label}
      </label>

      {/* Error Message */}
      {props.error && props.touched && (
        <span className="text-sm  text-red-600">{props.error}</span>
      )}
    </div>
  );
};

export default TextField;
