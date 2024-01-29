import {
  CreateClientType,
  IClient,
  ISearchResultType,
} from "@/interfaces/IClient";
import {
  createClient,
  deleteClient,
  getShortestRoute,
  searchClients,
} from "@/services/clientsService";
import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useState } from "react";

/**
 * A helper function to invalidate queries related to clients.
 * @param queryClient Instance of QueryClient.
 */
const invalidateClientsQuery = (queryClient: QueryClient) => {
  queryClient.invalidateQueries({ queryKey: ["clients"] });
};

export const useClients = () => {
  const queryClient = useQueryClient();
  const [currentPage, setCurrentPage] = useState(1);
  const clientsPerPage = 10;

  const addClientMutation = useMutation<IClient, Error, CreateClientType>({
    mutationFn: createClient,
    onSuccess: () => {
      invalidateClientsQuery(queryClient);
    },
  });

  const deleteClientMutation = useMutation<void, Error, number>({
    mutationFn: deleteClient,
    onSuccess: () => {
      invalidateClientsQuery(queryClient);
    },
  });

  const shortestRouteQuery = useQuery<IClient[], Error>({
    queryKey: ["shortestRoute"],
    queryFn: getShortestRoute,
  });

  const searchClientsQuery = useQuery<ISearchResultType, Error>({
    queryKey: ["searchResults", "", currentPage, clientsPerPage],
    queryFn: ({ queryKey }) => {
      const [, searchTerm = "", page, limit] = queryKey as [
        string,
        string,
        number,
        number,
      ];
      return searchClients(searchTerm, page, limit);
    },
  });

  /**
   * Initiates a search for clients based on the provided term, page, and limit.
   * @param searchTerm The term to search for.
   * @param page Page number for pagination (default is 1).
   * @param limit Number of items per page (default is 10).
   */
  const search = (
    searchTerm: string,
    page: number = currentPage,
    limit: number = clientsPerPage
  ) => {
    setCurrentPage(page); // Update the current page
    queryClient.fetchQuery<ISearchResultType, Error>({
      queryKey: ["searchResults", searchTerm, page, limit],
      queryFn: () => searchClients(searchTerm, page, limit),
      staleTime: 0,
    });
  };

  return {
    // Search
    searchResultsData: searchClientsQuery.data,
    isClientsLoading: searchClientsQuery.isLoading,
    isClientsError: searchClientsQuery.error,
    clientsError: searchClientsQuery.error,
    search,
    currentPage,
    setCurrentPage,
    totalPages: Math.ceil(
      (searchClientsQuery.data?.total ?? 0) / clientsPerPage
    ),

    // Add Client
    addClient: addClientMutation.mutate,

    // Delete Client
    deleteClient: deleteClientMutation.mutate,

    // Shortest Route
    shortestRouteData: shortestRouteQuery.data,

    // Query Client
    queryClient,
  };
};
