import React from "react";

export const InputText = ({
  type,
  id,
  name,
  value,
  placeholder,
  onChange,
  required,
}) => {
  return (
    <input
      type={type}
      id={id}
      name={name}
      value={value ? value : ""}
      placeholder={placeholder}
      onChange={onChange}
      required={required}
      className="flex-grow  rounded-lg p-3 xs:p-4   mb-2 bg-secondary dark:bg-dSecondary"
    />
  );
};
