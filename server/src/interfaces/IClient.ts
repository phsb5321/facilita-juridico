export interface IClient {
  id_client?: number | null;
  name: string;
  email: string;
  phone: string;
  coordinate_x: number;
  coordinate_y: number;
  created_at?: Date;
  updated_at?: Date;
}
