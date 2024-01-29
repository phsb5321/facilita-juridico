import { describe, expect, it, vi } from "vitest";
import { AddressesController } from "../../../src/controllers/AddressesController";
import { IAddress } from "../../../src/interfaces/IAddress";
import models from "../../../src/models";

vi.mock("../../../src/models", () => ({
  Address: {
    createAddress: vi.fn(),
    getAddresses: vi.fn(),
  },
}));

describe("AddressesController", () => {
  it("should create an address", async () => {
    const controller = new AddressesController();
    const mockAddress: IAddress = {
      id_address: 1,
      id_client: 1,
      coordinate_x: 100,
      coordinate_y: 100,
    };

    vi.mocked(models.Address.createAddress).mockResolvedValue(mockAddress);

    const result = await controller.createAddress(mockAddress);

    expect(models.Address.createAddress).toHaveBeenCalledWith(mockAddress);
    expect(result).toEqual(mockAddress);
  });

  it("should get all addresses", async () => {
    const controller = new AddressesController();
    const mockAddresses: IAddress[] = [
      { id_address: 1, id_client: 1, coordinate_x: 100, coordinate_y: 100 },
    ];

    vi.mocked(models.Address.getAddresses).mockResolvedValue(mockAddresses);

    const result = await controller.getAddresses();

    expect(models.Address.getAddresses).toHaveBeenCalled();
    expect(result).toEqual(mockAddresses);
  });
});
