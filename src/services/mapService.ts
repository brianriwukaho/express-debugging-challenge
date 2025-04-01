import { StatusCodes } from 'http-status-codes';
import { MapProvider } from '../providers/interfaces/mapProvider.interface';
import { MockMapProvider } from '../providers/mock/mockProvider';
import { GoogleMapsProvider } from '../providers/google/googleMapsProvider';
import { TomTomProvider } from '../providers/tomtom/tomTomProvider';
import { config } from '../config/environment';
import { MapProviderType } from '../types/config.types';
import { AppError } from '../types/error.types';
import {
  GeocodingResponse,
  ReverseGeocodingResponse,
  DistanceResponse,
  Coordinates,
} from '../types/map.types';

/**
 * Map Service
 *
 * This service is responsible for provider selection and delegation.
 * It routes requests to the appropriate map provider based on configuration.
 */
export class MapService {
  private providers: Map<MapProviderType, MapProvider>;
  private defaultProvider: MapProviderType;

  constructor() {
    this.providers = new Map();
    this.defaultProvider = config.defaultMapProvider || 'mock';
    this.registerProviders();
  }

  /**
   * Initialize and register all map providers
   */
  private registerProviders(): void {
    // Register all available providers
    this.providers.set('google', new GoogleMapsProvider());
    this.providers.set('tomtom', new TomTomProvider());
    this.providers.set('mock', new MockMapProvider());

    // Ensure default provider is valid
    if (!this.providers.has(this.defaultProvider)) {
      console.log(
        `Warning: Default provider ${this.defaultProvider} not found, falling back to mock`,
      );
      this.defaultProvider = 'mock';
    }
  }

  /**
   * Get the appropriate provider based on request
   */
  private getProvider(providerName?: string): MapProvider {
    const provider = providerName
      ? this.providers.get(providerName as MapProviderType)
      : this.providers.get(this.defaultProvider);

    if (!provider) {
      throw new AppError(
        `Provider not found: ${providerName || this.defaultProvider}`,
        StatusCodes.BAD_REQUEST,
      );
    }

    return provider;
  }

  /**
   * Convert address to coordinates
   */
  public async geocode(address: string, provider?: string): Promise<GeocodingResponse> {
    if (!address) {
      throw new AppError('Address is required', StatusCodes.BAD_REQUEST);
    }

    const mapProvider = this.getProvider(provider);
    return mapProvider.geocode(address);
  }

  /**
   * Convert coordinates to address
   */
  public async reverseGeocode(
    coordinates: Coordinates,
    provider?: string,
  ): Promise<ReverseGeocodingResponse> {
    // Validate coordinates
    if (
      !coordinates ||
      typeof coordinates.latitude !== 'number' ||
      typeof coordinates.longitude !== 'number'
    ) {
      throw new AppError('Valid coordinates are required', StatusCodes.BAD_REQUEST);
    }

    // Validate latitude range
    if (coordinates.longitude < -90 || coordinates.longitude > 90) {
      throw new AppError('Latitude must be between -90 and 90', StatusCodes.BAD_REQUEST);
    }

    // Validate longitude range
    if (coordinates.latitude < -180 || coordinates.latitude > 180) {
      throw new AppError('Longitude must be between -180 and 180', StatusCodes.BAD_REQUEST);
    }

    const mapProvider = this.getProvider(provider);
    return mapProvider.reverseGeocode(coordinates);
  }

  /**
   * Calculate distance between two points
   */
  public async calculateDistance(
    origin: Coordinates,
    destination: Coordinates,
    provider?: string,
  ): Promise<DistanceResponse> {
    // Validate coordinates
    if (!origin || !destination) {
      throw new AppError(
        'Origin and destination coordinates are required',
        StatusCodes.BAD_REQUEST,
      );
    }

    // Validate latitude and longitude ranges
    if (
      origin.latitude < -90 ||
      origin.latitude > 90 ||
      destination.latitude < -90 ||
      destination.latitude > 90
    ) {
      throw new AppError('Latitude must be between -90 and 90', StatusCodes.BAD_REQUEST);
    }

    if (
      origin.longitude < -180 ||
      origin.longitude > 180 ||
      destination.longitude < -180 ||
      destination.longitude > 180
    ) {
      throw new AppError('Longitude must be between -180 and 180', StatusCodes.BAD_REQUEST);
    }

    const mapProvider = this.getProvider(provider);
    return mapProvider.calculateDistance(origin, destination);
  }
}
