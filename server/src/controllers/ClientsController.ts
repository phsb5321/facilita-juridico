import redis from "@/clients/RedisClient";
import { IClient } from "@/interfaces/IClient";
import models from "@/models";
import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Query,
  Route,
  SuccessResponse,
  Tags,
} from "tsoa";

const ROUTE_CACHE_KEY = "shortestRoute";
const ROUTE_CACHE_EXPIRATION_SECONDS = 3600; // 1 hour

@Tags("Clients")
@Route("clients")
export class ClientsController extends Controller {
  /**
   * Clears the route cache.
   */
  private async clearRouteCache(): Promise<void> {
    await redis.del(ROUTE_CACHE_KEY);
  }

  @SuccessResponse("201", "Created")
  @Post()
  public async createClient(@Body() client: IClient): Promise<IClient> {
    this.setStatus(201);
    const createdClient = await models.Client.createClient(client);
    await this.clearRouteCache();
    return createdClient;
  }

  @Get()
  public async getClients(): Promise<IClient[]> {
    return models.Client.getClients();
  }

  @Get("search")
  public async searchClients(
    @Query() search?: string,
    @Query() page: number = 1,
    @Query() limit: number = 10
  ): Promise<{
    clients: IClient[];
    total: number;
    page: number;
    limit: number;
  }> {
    const offset = (page - 1) * limit;
    return models.Client.searchClients(search, offset, limit);
  }

  @Delete("{id_client}")
  public async deleteClient(id_client: number): Promise<void> {
    await models.Client.deleteClient(id_client);
    await this.clearRouteCache();
  }

  /**
   * Retrieves the shortest route. Caches the result to improve performance.
   * @returns The shortest route as an array of IClient.
   */
  @Get("shortest-route")
  public async getShortestRoute(): Promise<IClient[]> {
    const cachedRoute = await redis.get(ROUTE_CACHE_KEY);
    if (cachedRoute) {
      return JSON.parse(cachedRoute);
    }

    const clients = await models.Client.getClients();
    const route = this.calculateShortestRoute(clients);

    await redis.set(
      ROUTE_CACHE_KEY,
      JSON.stringify(route),
      "EX",
      ROUTE_CACHE_EXPIRATION_SECONDS
    );

    return route;
  }

  /**
   * Calculates the shortest route from the company to all clients and back.
   * Uses a simple nearest-neighbor heuristic.
   * @param clients Array of IClient.
   * @returns Ordered array of IClient representing the route.
   */
  private calculateShortestRoute(clients: IClient[]): IClient[] {
    const company = {
      id_client: null,
      name: "Company",
      email: "",
      phone: "",
      coordinate_x: 0,
      coordinate_y: 0,
    };
    let current: IClient | null | undefined = company;
    const path: IClient[] = [];
    const visited = new Set<number | null>();

    while (visited.size < clients.length) {
      let closest = this.findClosestClient(current, clients, visited);
      if (closest) {
        path.push(closest);
        visited.add(closest.id_client ?? null);
        current = closest;
      }
    }

    path.push(company); // Return to company
    return path;
  }

  /**
   * Finds the closest client to the current location that hasn't been visited.
   * @param current The current location.
   * @param clients Array of all clients.
   * @param visited Set of visited client IDs.
   * @returns The closest IClient or undefined.
   */
  private findClosestClient(
    current: IClient,
    clients: IClient[],
    visited: Set<number | null>
  ): IClient | undefined {
    return clients.reduce((closest, client) => {
      if (!visited.has(client.id_client || null)) {
        const distance = this.calculateDistance(current, client);
        if (distance < (closest?.distance || Infinity)) {
          return { ...client, distance };
        }
      }
      return closest;
    }, undefined as (IClient & { distance?: number }) | undefined);
  }

  /**
   * Calculates Euclidean distance between two points.
   * @param a Point A.
   * @param b Point B.
   * @returns Distance between A and B.
   */
  private calculateDistance(a: IClient, b: IClient): number {
    return Math.sqrt(
      Math.pow(b.coordinate_x - a.coordinate_x, 2) +
        Math.pow(b.coordinate_y - a.coordinate_y, 2)
    );
  }
}
