import React from "react";

const Heading = (props) => {
  return (
    <div className="w-full py-4 px-6 bg-blue-100 rounded-lg shadow-md">
      <p className="font-bold text-2xl text-blue-800 border-l-4 border-blue-500 pl-3">
        {props.title}
      </p>
    </div>
  );
};

export default Heading;
