import { query } from "@/clients/PostgresClient";
import { CLIENT_CREATED } from "@/constants";
import clientEmitter from "@/constants/ClientEvents";
import { IClient } from "@/interfaces";

const createClient = async (client: IClient): Promise<IClient> => {
  const { name, email, phone } = client;
  const result = await query(
    "INSERT INTO clients (name, email, phone) VALUES ($1, $2, $3) RETURNING *",
    [name, email, phone]
  );

  const newClient = result.rows[0];
  clientEmitter.emit(CLIENT_CREATED, newClient);

  return newClient;
};

const getClients = async (): Promise<IClient[]> => {
  const result = await query("SELECT * FROM clients", []);
  return result.rows;
};

const deleteClient = async (id_client: number): Promise<void> => {
  await query("DELETE FROM clients WHERE id_client = $1", [id_client]);
};

const searchClients = async (
  search?: string,
  offset: number = 0, // default value for offset
  limit: number = 10 // default value for limit
): Promise<{
  clients: IClient[];
  total: number;
  page: number;
  limit: number;
}> => {
  const searchTerm = `%${search ?? ""}%`;

  // Query to get paginated search results
  const paginatedResult = await query(
    "SELECT * FROM clients WHERE name LIKE $1 OR email LIKE $1 OR phone LIKE $1 ORDER BY id_client LIMIT $2 OFFSET $3",
    [searchTerm, limit, offset]
  );

  // Query to get total count of clients matching the search term
  const countResult = await query(
    "SELECT COUNT(*) FROM clients WHERE name LIKE $1 OR email LIKE $1 OR phone LIKE $1",
    [searchTerm]
  );

  const total = parseInt(countResult.rows[0].count, 10);

  // Calculate the current page based on the offset and limit
  const page = Math.floor(offset / limit) + 1;

  return {
    clients: paginatedResult.rows,
    total,
    page,
    limit,
  };
};

export default {
  createClient,
  getClients,
  deleteClient,
  searchClients,
};
