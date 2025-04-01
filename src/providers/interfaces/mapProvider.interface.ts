import {
  GeocodingResponse,
  ReverseGeocodingResponse,
  DistanceResponse,
  Coordinates,
} from '../../types/map.types';

/**
 * Map Provider Interface
 *
 * This interface defines the contract that all map providers must implement.
 * It ensures a consistent API across different map service providers.
 */
export interface MapProvider {
  /**
   * Unique identifier for the provider
   */
  readonly providerId: string;

  /**
   * Convert an address string to geographic coordinates
   *
   * @param address - The address to geocode
   * @returns Promise resolving to the geocoding response
   */
  geocode(address: string): Promise<GeocodingResponse>;

  /**
   * Convert geographic coordinates to an address
   *
   * @param coordinates - The coordinates to reverse geocode
   * @returns Promise resolving to the reverse geocoding response
   */
  reverseGeocode(coordinates: Coordinates): Promise<ReverseGeocodingResponse>;

  /**
   * Calculate the distance between two geographic points
   *
   * @param origin - The starting coordinates
   * @param destination - The ending coordinates
   * @returns Promise resolving to the distance calculation response
   */
  calculateDistance(origin: Coordinates, destination: Coordinates): Promise<DistanceResponse>;
}
