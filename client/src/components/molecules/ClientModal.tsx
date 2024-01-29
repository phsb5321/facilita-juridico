import Heading from "@/components/atoms/Heading";
import Modal from "@/components/atoms/Modal";
import Text from "@/components/atoms/Text";
import { IClient } from "@/interfaces";

interface ClientModalProps {
  isOpen: boolean;
  onClose: () => void;
  client: IClient | null;
}

const ClientModal: React.FC<ClientModalProps> = ({
  isOpen,
  onClose,
  client,
}) => {
  const haveCoordinates = client?.coordinate_x && client?.coordinate_y;
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Heading level={2}>{client?.name}</Heading>
      <Text>Email: {client?.email}</Text>
      <Text>Phone: {client?.phone}</Text>

      {haveCoordinates && (
        <Text>
          Location: {client?.coordinate_x}, {client?.coordinate_y}
        </Text>
      )}
    </Modal>
  );
};

export default ClientModal;
