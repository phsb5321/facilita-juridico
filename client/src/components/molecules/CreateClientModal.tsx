import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import Modal from "@/components/atoms/Modal";
import { CreateClientType } from "@/interfaces/IClient";
import React, { useState } from "react";

interface CreateClientModalProps {
  isOpen: boolean;
  onCreateClient: (client: CreateClientType) => void;
  onClose: () => void;
}

const CreateClientModal: React.FC<CreateClientModalProps> = ({
  isOpen,
  onCreateClient,
  onClose,
}) => {
  const [client, setClient] = useState<CreateClientType>({
    name: "",
    email: "",
    phone: "",
    coordinate_x: 0,
    coordinate_y: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setClient({
      ...client,
      [name]:
        name === "coordinate_x" || name === "coordinate_y"
          ? parseFloat(value)
          : value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onCreateClient(client);
    setClient({
      name: "",
      email: "",
      phone: "",
      coordinate_x: 0,
      coordinate_y: 0,
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit}>
        <h2 className="text-lg font-bold mb-4">Create New Client</h2>
        <Input
          name="name"
          value={client.name}
          onChange={handleChange}
          placeholder="Name"
        />
        <Input
          name="email"
          value={client.email}
          onChange={handleChange}
          placeholder="Email"
        />
        <Input
          name="phone"
          value={client.phone}
          onChange={handleChange}
          placeholder="Phone"
        />
        <Input
          name="coordinate_x"
          type="number"
          value={client.coordinate_x.toString()}
          onChange={handleChange}
          placeholder="Coordinate X"
        />
        <Input
          name="coordinate_y"
          type="number"
          value={client.coordinate_y.toString()}
          onChange={handleChange}
          placeholder="Coordinate Y"
        />
        <Button type="submit" className="mt-4">
          Create 
        </Button>
      </form>
    </Modal>
  );
};

export default CreateClientModal;
