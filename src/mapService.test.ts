import { MapService } from './services/mapService';
import { AppError } from './types/error.types';

describe('MapService', () => {
  let mapService: MapService;

  beforeEach(() => {
    mapService = new MapService();
  });

  describe('geocode', () => {
    it('should successfully geocode an address', async () => {
      const result = await mapService.geocode('123 Main St');

      expect(result).toMatchObject({
        coordinates: expect.objectContaining({
          latitude: expect.any(Number),
          longitude: expect.any(Number),
        }),
        address: expect.objectContaining({
          formattedAddress: expect.any(String),
        }),
        provider: expect.any(String),
      });
    });

    it('should throw an error for empty address', async () => {
      await expect(mapService.geocode('')).rejects.toThrow(AppError);
    });
  });

  describe('reverseGeocode', () => {
    it('should successfully reverse geocode coordinates', async () => {
      const result = await mapService.reverseGeocode({
        latitude: 37.7749,
        longitude: -122.4194,
      });

      expect(result).toMatchObject({
        coordinates: expect.objectContaining({
          latitude: 37.7749,
          longitude: -122.4194,
        }),
        address: expect.objectContaining({
          formattedAddress: expect.any(String),
        }),
        provider: expect.any(String),
      });
    });

    it('should throw an error for invalid coordinates', async () => {
      await expect(
        mapService.reverseGeocode({
          latitude: 100, // Invalid latitude
          longitude: -122.4194,
        }),
      ).rejects.toThrow(AppError);
    });
  });

  describe('calculateDistance', () => {
    it('should successfully calculate distance between two points', async () => {
      const result = await mapService.calculateDistance(
        { latitude: 37.7749, longitude: -122.4194 }, // San Francisco
        { latitude: 34.0522, longitude: -118.2437 }, // Los Angeles
      );

      expect(result).toMatchObject({
        distance: expect.objectContaining({
          value: expect.any(Number),
          unit: 'meters',
        }),
        duration: expect.objectContaining({
          value: expect.any(Number),
          unit: 'seconds',
        }),
        provider: expect.any(String),
      });

      // Distance between SF and LA should be roughly 500-600 km
      expect(result.distance.value).toBeGreaterThan(350000);
      expect(result.distance.value).toBeLessThan(600000);
    });

    it('should throw an error for invalid coordinates', async () => {
      await expect(
        mapService.calculateDistance(
          { latitude: 37.7749, longitude: -122.4194 },
          { latitude: 34.0522, longitude: 200 }, // Invalid longitude
        ),
      ).rejects.toThrow(AppError);
    });
  });
});
