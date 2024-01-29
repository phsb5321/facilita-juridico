import { useEffect, useState } from "react";

import Button from "@/components/atoms/Button";
import Heading from "@/components/atoms/Heading";
import Input from "@/components/atoms/Input";
import Pagination from "@/components/atoms/Pagination";
import ClientCard from "@/components/molecules/ClientCard";
import ClientModal from "@/components/molecules/ClientModal";
import CreateClientModal from "@/components/molecules/CreateClientModal";
import PageTemplate from "@/components/templates/PageTemplate";
import { useClients } from "@/hooks/useClients";
import useDebounce from "@/hooks/useDebounce";
import { CreateClientType, IClient } from "@/interfaces/IClient";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/clients")({ component: Clients });

function Clients() {
  const [selectedClient, setSelectedClient] = useState<IClient | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const [currentPage, setCurrentPage] = useState(1);

  const {
    addClient,
    searchResultsData,
    search,
    queryClient,
    isClientsLoading,
    clientsError,
  } = useClients();

  useEffect(() => {
    search(debouncedSearchTerm, currentPage, 10);
  }, [debouncedSearchTerm, currentPage, search]);

  const totalPages = Math.ceil((searchResultsData?.total ?? 0) / 10);

  const handleClientSelect = (client: IClient) => setSelectedClient(client);

  const handleCreateClient = (client: CreateClientType) => {
    addClient(client);
    setIsCreateModalOpen(false);
    queryClient.invalidateQueries({ queryKey: ["clients"] });
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const renderClientCards = () => {
    if (isClientsLoading) return <p>Loading clients...</p>;
    if (clientsError) return <p>Error: {clientsError.message}</p>;
    if (searchResultsData?.clients.length) {
      return searchResultsData.clients.map((client) => (
        <ClientCard
          key={client.id}
          name={client.name}
          email={client.email}
          phone={client.phone}
          onViewLocation={() => handleClientSelect(client)}
        />
      ));
    }
    return <p>No clients found.</p>;
  };

  return (
    <PageTemplate
      header={<Heading level={1}>👥 Clients</Heading>}
      content={
        <>
          <div className="my-4 flex h-10">
            <Input
              type="text"
              placeholder="Search clients..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-grow mr-2"
              name="search"
            />
            <Button onClick={() => setIsCreateModalOpen(true)}>+</Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {renderClientCards()}
          </div>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
          {selectedClient && (
            <ClientModal
              isOpen={!!selectedClient}
              client={selectedClient}
              onClose={() => setSelectedClient(null)}
            />
          )}
          <CreateClientModal
            isOpen={isCreateModalOpen}
            onCreateClient={handleCreateClient}
            onClose={() => setIsCreateModalOpen(false)}
          />
        </>
      }
    />
  );
}
