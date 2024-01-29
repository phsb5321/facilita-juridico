export interface IClient {
  id: number;
  name: string;
  email: string;
  phone: string;
  coordinate_x: number;
  coordinate_y: number;
}

export type CreateClientType = Pick<
  IClient,
  "name" | "email" | "phone" | "coordinate_x" | "coordinate_y"
>;

export interface ISearchResultType {
  clients: IClient[];
  total: number;
  page: number;
  limit: number;
}
