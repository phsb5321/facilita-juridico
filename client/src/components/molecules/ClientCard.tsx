import React from "react";

import Button from "@/components/atoms/Button";
import Text from "@/components/atoms/Text";

interface ClientCardProps {
  name: string;
  email: string;
  phone: string;
  onViewLocation: () => void;
}

const ClientCard: React.FC<ClientCardProps> = ({
  name,
  email,
  phone,
  onViewLocation,
}) => {
  return (
    <div className="bg-white rounded shadow-md p-4 flex justify-between items-center h-24">
      <div>
        <Text as="h3" className="font-bold">
          {name}
        </Text>
        <Text>{email}</Text>
        <Text>{phone}</Text>
      </div>

      <Button onClick={onViewLocation}>View Location</Button>
    </div>
  );
};

export default ClientCard;
