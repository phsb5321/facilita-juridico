import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  type = "button",
  className,
}) => {
  const baseStyle =
    "bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded";
  const additionalClasses = className ? ` ${className}` : "";

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseStyle}${additionalClasses}`}
    >
      {children}
    </button>
  );
};

export default Button;
