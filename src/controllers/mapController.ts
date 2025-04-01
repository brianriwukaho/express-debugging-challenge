import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { MapService } from '../services/mapService';
import { AppError } from '../types/error.types';

/**
 * Controller for map-related operations
 */
export class MapController {
  private mapService: MapService;

  constructor() {
    this.mapService = new MapService();
  }

  /**
   * Geocode an address to coordinates
   */
  public geocode = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { address, provider } = req.body;

      // Early validation
      if (!address) {
        throw new AppError('Address is required', StatusCodes.BAD_REQUEST);
      }

      const result = await this.mapService.geocode(address, provider);

      res.status(StatusCodes.OK).json({
        status: 'success',
        data: result,
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Reverse geocode coordinates to address
   */
  public reverseGeocode = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const { latitude, longitude, provider } = req.body;

      // Early validation
      if (latitude === undefined || longitude === undefined) {
        throw new AppError('Latitude and longitude are required', StatusCodes.BAD_REQUEST);
      }

      const result = await this.mapService.reverseGeocode({ latitude, longitude }, provider);

      res.status(StatusCodes.OK).json({
        status: 'success',
        data: result,
      });
    } catch (error) {
      next(error);
    }
  };

  /**
   * Calculate distance between two points
   */
  public calculateDistance = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const { origin, destination, provider } = req.body;

      // Early validation
      if (!origin || !destination) {
        throw new AppError(
          'Origin and destination coordinates are required',
          StatusCodes.BAD_REQUEST,
        );
      }

      const result = await this.mapService.calculateDistance(origin, destination, provider);

      res.status(StatusCodes.OK).json({
        status: 'success',
        data: result,
      });
    } catch (error) {
      next(error);
    }
  };
}
