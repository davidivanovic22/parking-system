// ParkingSpotService.test.ts
import { ParkingSpotService } from "../services/ParkingSpotService";
import { ParkingSpotRepository } from "../repositories/ParkingSpotRepository";
import { ParkingSpot } from "../entities/ParkingSpot";
import { ParkingZone } from "../entities/ParkingZone";
import { DeleteResult } from "typeorm";

jest.mock("../repositories/ParkingSpotRepository");

describe("ParkingSpotService", () => {
  let service: ParkingSpotService;
  let repoMock: jest.Mocked<ParkingSpotRepository>;

  const mockZone: ParkingZone = { id: 1, name: "Zone A", price: 60, spots: [] };

  const mockSpot: ParkingSpot = {
    id: 1,
    street: "Main St",
    isOccupied: false,
    zone: mockZone,
    payments: [], // <-- Added this line to fix the TS error
  };

  beforeEach(() => {
    repoMock =
      new ParkingSpotRepository() as jest.Mocked<ParkingSpotRepository>;
    service = new ParkingSpotService();
    // Inject mock manually
    // @ts-ignore
    service.repo = repoMock;
  });

  describe("getAllSpots", () => {
    it("should return all parking spots", async () => {
      repoMock.findAll.mockResolvedValue([mockSpot]);
      const result = await service.getAllSpots();
      expect(result).toEqual([mockSpot]);
      expect(repoMock.findAll).toHaveBeenCalled();
    });
  });

  describe("getSpotById", () => {
    it("should return a parking spot by ID", async () => {
      repoMock.findById.mockResolvedValue(mockSpot);
      const result = await service.getSpotById(1);
      expect(result).toEqual(mockSpot);
      expect(repoMock.findById).toHaveBeenCalledWith(1);
    });
  });

  describe("createSpot", () => {
    it("should create and return a new parking spot", async () => {
      const newSpotData = {
        street: "New St",
        isOccupied: true,
        zone: mockZone,
        payments: [],
      } as unknown as ParkingSpot;

      const createdSpot = {
        ...newSpotData,
        id: 2,
      };

      repoMock.create.mockImplementation((spot: Partial<ParkingSpot>) => {
        return {
          id: spot.id ?? 0,
          street: spot.street ?? "",
          isOccupied: spot.isOccupied ?? false,
          zone: spot.zone!,
          payments: spot.payments ?? [],
        };
      });

      repoMock.save.mockResolvedValue(createdSpot);

      const result = await service.createSpot(newSpotData);
      expect(result).toEqual(createdSpot);
      expect(repoMock.create).toHaveBeenCalled();
      expect(repoMock.save).toHaveBeenCalled();
    });
  });

  describe("updateSpot", () => {
    it("should update and return an existing parking spot", async () => {
      const updatedData = {
        street: "Updated St",
        isOccupied: true,
        zone: mockZone,
        payments: [], // add payments here too
      } as unknown as ParkingSpot;

      const updatedSpot = {
        ...mockSpot,
        ...updatedData,
      };

      repoMock.findById.mockResolvedValue(mockSpot);
      repoMock.save.mockResolvedValue(updatedSpot);

      const result = await service.updateSpot(1, updatedData);
      expect(result).toEqual(updatedSpot);
      expect(repoMock.findById).toHaveBeenCalledWith(1);
      expect(repoMock.save).toHaveBeenCalled();
    });

    it("should return null if spot not found", async () => {
      repoMock.findById.mockResolvedValue(null);

      const result = await service.updateSpot(99, mockSpot);
      expect(result).toBeNull();
    });
  });

  describe("deleteSpot", () => {
    it("should call delete on the repository", async () => {
      const deleteResult: DeleteResult = { affected: 1, raw: [] };
      repoMock.delete.mockResolvedValue(deleteResult);

      const result = await service.deleteSpot(1);

      expect(repoMock.delete).toHaveBeenCalledWith(1);
      expect(result).toEqual(deleteResult);
    });
  });
});
