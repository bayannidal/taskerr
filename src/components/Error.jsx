import React from "react";
import XIcon from "@heroicons/react/solid/XCircleIcon";

const Error = ({ error, handleError, text }) => {
  if (!error) {
    return null;
  }

  return (
    <div className="bg-red-400 text-base p-3 xs:p-4 rounded-lg flex justify-between items-center text-white hover:bg-opacity-80 mb-5 animate__animated animate__shakeX custom-shadow">
      {text}
      <XIcon className="h-6" onClick={handleError} />
      {error}
    </div>
  );
};

export default Error;
