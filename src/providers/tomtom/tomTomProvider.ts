import { MapProvider } from '../interfaces/mapProvider.interface';
import {
  GeocodingResponse,
  ReverseGeocodingResponse,
  DistanceResponse,
  Coordinates,
} from '../../types/map.types';
import { MockMapProvider } from '../mock/mockProvider';

/**
 * TomTom Provider (Stub Implementation)
 *
 * This is a placeholder implementation that uses the mock provider under the hood.
 * In a real implementation, this would connect to the TomTom API.
 */
export class TomTomProvider implements MapProvider {
  public readonly providerId = 'tomtom';
  private mockProvider: MockMapProvider;

  constructor() {
    this.mockProvider = new MockMapProvider();
    console.log('TomTomProvider initialized (using mock implementation)');
  }

  /**
   * Convert an address to coordinates using TomTom Search API
   */
  public async geocode(address: string): Promise<GeocodingResponse> {
    console.log(`[TomTomProvider] Geocoding address: ${address} (using mock)`);

    // Use the mock provider but change the provider ID
    const result = await this.mockProvider.geocode(address);
    return {
      ...result,
      provider: this.providerId,
    };
  }

  /**
   * Convert coordinates to address using TomTom Reverse Geocoding API
   */
  public async reverseGeocode(coordinates: Coordinates): Promise<ReverseGeocodingResponse> {
    console.log(`[TomTomProvider] Reverse geocoding coordinates (using mock)`);

    // Use the mock provider but change the provider ID
    const result = await this.mockProvider.reverseGeocode(coordinates);
    return {
      ...result,
      provider: this.providerId,
    };
  }

  /**
   * Calculate distance between two points using TomTom Routing API
   */
  public async calculateDistance(
    origin: Coordinates,
    destination: Coordinates,
  ): Promise<DistanceResponse> {
    console.log(`[TomTomProvider] Calculating distance (using mock)`);

    // Use the mock provider but change the provider ID
    const result = await this.mockProvider.calculateDistance(origin, destination);
    return {
      ...result,
      provider: this.providerId,
    };
  }
}
