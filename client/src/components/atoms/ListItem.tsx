import React from 'react';

interface ListItemProps {
  children: React.ReactNode;
  className?: string;
}

const ListItem: React.FC<ListItemProps> = ({ children, className }) => {
  const baseStyle = "p-4 border-b border-gray-200";
  return (
    <div className={`${baseStyle} ${className}`}>
      {children}
    </div>
  );
};

export default ListItem;
