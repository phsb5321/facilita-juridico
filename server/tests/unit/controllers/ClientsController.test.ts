import { describe, expect, it, vi } from "vitest";
import { ClientsController } from "../../../src/controllers/ClientsController";
import { IClient } from "../../../src/interfaces/IClient";
import models from "../../../src/models";

vi.mock("../../../src/models", () => ({
  Client: {
    createClient: vi.fn(),
    getClients: vi.fn(),
  },
}));

describe("ClientsController", () => {
  it("should create a client", async () => {
    const controller = new ClientsController();
    const mockClient: IClient = {
      id_client: 1,
      name: "John Doe",
      email: "john@example.com",
      phone: "1234567890",
      coordinate_x: 0,
      coordinate_y: 0,
    };

    vi.mocked(models.Client.createClient).mockResolvedValue(mockClient);

    const result = await controller.createClient(mockClient);

    expect(models.Client.createClient).toHaveBeenCalledWith(mockClient);
    expect(result).toEqual(mockClient);
  });

  it("should get all clients", async () => {
    const controller = new ClientsController();
    const mockClients: IClient[] = [
      {
        id_client: 1,
        name: "John Doe",
        email: "john@example.com",
        phone: "1234567890",
        coordinate_x: 0,
        coordinate_y: 0,
      },
    ];

    vi.mocked(models.Client.getClients).mockResolvedValue(mockClients);

    const result = await controller.getClients();

    expect(models.Client.getClients).toHaveBeenCalled();
    expect(result).toEqual(mockClients);
  });
});
