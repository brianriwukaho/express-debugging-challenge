import { Request, Response } from 'express';
import { MapController } from './controllers/mapController';
import { MapService } from './services/mapService';

// Mock the MapService
jest.mock('./services/mapService');

describe('MapController', () => {
  let mapController: MapController;
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let mockNext: jest.Mock;

  beforeEach(() => {
    mockRequest = {
      body: {},
    };
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    mockNext = jest.fn();

    // Reset the mock implementations
    jest.clearAllMocks();

    mapController = new MapController();
  });

  describe('geocode', () => {
    it('should return geocoded address', async () => {
      // Setup
      const geocodeResult = {
        coordinates: { latitude: 37.7749, longitude: -122.4194 },
        address: { formattedAddress: '123 Main St, San Francisco, CA 94105, USA' },
        provider: 'mock',
      };

      // Mock the service method
      (MapService.prototype.geocode as jest.Mock).mockResolvedValue(geocodeResult);

      // Set request body
      mockRequest.body = { address: '123 Main St, San Francisco' };

      // Execute
      await mapController.geocode(mockRequest as Request, mockResponse as Response, mockNext);

      // Assert
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        status: 'success',
        data: geocodeResult,
      });
      expect(mockNext).not.toHaveBeenCalled();
    });

    it('should call next with error if address is missing', async () => {
      // Setup
      mockRequest.body = {}; // No address

      // Execute
      await mapController.geocode(mockRequest as Request, mockResponse as Response, mockNext);

      // Assert
      expect(mockNext).toHaveBeenCalled();
      expect(mockResponse.status).not.toHaveBeenCalled();
      expect(mockResponse.json).not.toHaveBeenCalled();
    });
  });

  describe('reverseGeocode', () => {
    it('should return address for coordinates', async () => {
      // Setup
      const reverseGeocodingResult = {
        coordinates: { latitude: 37.7749, longitude: -122.4194 },
        address: { formattedAddress: '123 Main St, San Francisco, CA 94105, USA' },
        provider: 'mock',
      };

      // Mock the service method
      (MapService.prototype.reverseGeocode as jest.Mock).mockResolvedValue(reverseGeocodingResult);

      // Set request body
      mockRequest.body = { latitude: 37.7749, longitude: -122.4194 };

      // Execute
      await mapController.reverseGeocode(
        mockRequest as Request,
        mockResponse as Response,
        mockNext,
      );

      // Assert
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        status: 'success',
        data: reverseGeocodingResult,
      });
      expect(mockNext).not.toHaveBeenCalled();
    });
  });

  describe('calculateDistance', () => {
    it('should return distance calculation', async () => {
      // Setup
      const distanceResult = {
        distance: { value: 550000, unit: 'meters' },
        duration: { value: 19800, unit: 'seconds' },
        origin: { latitude: 37.7749, longitude: -122.4194 },
        destination: { latitude: 34.0522, longitude: -118.2437 },
        provider: 'mock',
      };

      // Mock the service method
      (MapService.prototype.calculateDistance as jest.Mock).mockResolvedValue(distanceResult);

      // Set request body
      mockRequest.body = {
        origin: { latitude: 37.7749, longitude: -122.4194 },
        destination: { latitude: 34.0522, longitude: -118.2437 },
      };

      // Execute
      await mapController.calculateDistance(
        mockRequest as Request,
        mockResponse as Response,
        mockNext,
      );

      // Assert
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        status: 'success',
        data: distanceResult,
      });
      expect(mockNext).not.toHaveBeenCalled();
    });
  });
});
