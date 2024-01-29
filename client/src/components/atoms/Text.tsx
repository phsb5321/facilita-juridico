import React from "react";

type TextProps = {
  children: React.ReactNode;
  as?: keyof JSX.IntrinsicElements;
  className?: string;
};

const Text: React.FC<TextProps> = ({
  children,
  as: Component = "p",
  className,
}) => {
  return <Component className={`text-base ${className}`}>{children}</Component>;
};

export default Text;
