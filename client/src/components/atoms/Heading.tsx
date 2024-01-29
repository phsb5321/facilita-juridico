import React from "react";

interface HeadingProps {
  level: 1 | 2 | 3 | 4 | 5 | 6;
  children: React.ReactNode;
  className?: string;
}

const Heading: React.FC<HeadingProps> = ({
  level,
  children,
  className = "",
}) => {
  const Component = `h${level}` as keyof JSX.IntrinsicElements;

  // return <Component className="font-bold text-xl">
  return (
    <Component className={`font-bold text-xl ${className}`}>
      {children}
    </Component>
  );
};

export default Heading;
