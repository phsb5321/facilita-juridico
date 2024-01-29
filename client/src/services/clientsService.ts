import {
  CreateClientType,
  IClient,
  ISearchResultType,
} from "@/interfaces/IClient";
import axios from "axios";

const BASE_URL = "http://localhost:3000"; // TODO!: move to .env

export const createClient = async (
  client: CreateClientType
): Promise<IClient> => {
  const response = await axios.post(`${BASE_URL}/clients`, client);
  return response.data;
};

export const getShortestRoute = async (): Promise<IClient[]> => {
  const response = await axios.get(`${BASE_URL}/clients/shortest-route`);
  return response.data;
};

export const deleteClient = async (clientId: number): Promise<void> => {
  await axios.delete(`${BASE_URL}/clients/${clientId}`);
};

export const searchClients = async (
  searchTerm: string,
  page: number,
  limit: number
): Promise<ISearchResultType> => {
  const response = await axios.get(`${BASE_URL}/clients/search`, {
    params: { search: searchTerm, page, limit },
  });
  return response.data;
};
