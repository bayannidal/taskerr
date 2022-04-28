import React from "react";

export const Textarea = ({
  id,
  name,
  value,
  placeholder,
  onChange,
  required,
  customClass,
  step,
}) => {
  return (
    <textarea
      type="text"
      id={id}
      name={name}
      value={value ? value : ""}
      placeholder={placeholder}
      onChange={onChange}
      required={required}
      step={step}
      className={`${customClass} w-full min-h-[5rem] font-medium rounded-lg text-[0.5rem] placeholder:text-[0.5rem] sm:text-base md:text-base sm:placeholder:text-[0.8rem] placeholder:md:text-base p-3 mb-2 bg-secondary dark:bg-dSecondary text-text dark:text-white caret-third placeholder:font-medium`}
    />
  );
};
