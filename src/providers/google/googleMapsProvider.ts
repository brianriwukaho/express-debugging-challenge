import { MapProvider } from '../interfaces/mapProvider.interface';
import {
  GeocodingResponse,
  ReverseGeocodingResponse,
  DistanceResponse,
  Coordinates,
} from '../../types/map.types';
import { MockMapProvider } from '../mock/mockProvider';

/**
 * Google Maps Provider (Stub Implementation)
 *
 * This is a placeholder implementation that uses the mock provider under the hood.
 * In a real implementation, this would connect to the Google Maps API.
 */
export class GoogleMapsProvider implements MapProvider {
  public readonly providerId = 'google';
  private mockProvider: MockMapProvider;

  constructor() {
    this.mockProvider = new MockMapProvider();
    console.log('GoogleMapsProvider initialized (using mock implementation)');
  }

  public async geocode(address: string): Promise<GeocodingResponse> {
    console.log(`[GoogleMapsProvider] Geocoding address: ${address} (using mock)`);
    const result = await this.mockProvider.geocode(address);
    return {
      ...result,
      provider: this.providerId,
    };
  }

  public async reverseGeocode(coordinates: Coordinates): Promise<ReverseGeocodingResponse> {
    console.log(`[GoogleMapsProvider] Reverse geocoding coordinates (using mock)`);
    const result = await this.mockProvider.reverseGeocode(coordinates);
    return {
      ...result,
      provider: this.providerId,
    };
  }

  public async calculateDistance(
    origin: Coordinates,
    destination: Coordinates,
  ): Promise<DistanceResponse> {
    console.log(`[GoogleMapsProvider] Calculating distance (using mock)`);
    const result = await this.mockProvider.calculateDistance(origin, destination);
    return {
      ...result,
      provider: this.providerId,
    };
  }
}
