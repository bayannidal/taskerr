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
  bgColor,
  validation,
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
      className={`${customClass} ${
        !bgColor ? "bg-secondary dark:bg-dSecondary" : bgColor
      } ${
        validation === true ? "border-2 border-red-500" : null
      } w-full min-h-[7rem] font-medium rounded-lg text-[0.5rem] placeholder:text-[0.5rem] sm:text-base md:text-base sm:placeholder:text-[0.8rem] placeholder:md:text-base p-3 mb-2  text-text dark:text-white caret-third placeholder:font-medium  focus:bg-third focus:bg-opacity-30 dark:focus:bg-third dark:focus:bg-opacity-30`}
    />
  );
};
