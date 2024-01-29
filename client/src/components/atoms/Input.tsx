import React from "react";

interface InputProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  name: string;
  type?: string;
  className?: string;
}

const Input: React.FC<InputProps> = ({
  value,
  onChange,
  placeholder,
  name,
  type = "text",
  className,
}) => {
  const baseStyle =
    "shadow border rounded w-full p-2 text-gray-700 focus:outline-none focus:shadow-outline";
  const additionalClasses = className ? ` ${className}` : "";

  return (
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`${baseStyle}${additionalClasses}`}
    />
  );
};

export default Input;
