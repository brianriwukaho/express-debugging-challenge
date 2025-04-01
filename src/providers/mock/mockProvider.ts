import { MapProvider } from '../interfaces/mapProvider.interface';
import {
  GeocodingResponse,
  ReverseGeocodingResponse,
  DistanceResponse,
  Coordinates,
  AddressComponents,
} from '../../types/map.types';

/**
 * Mock Map Provider
 *
 * This provider returns realistic but fake data for testing purposes.
 * It simulates the behavior of a real map provider without making actual API calls.
 */
export class MockMapProvider implements MapProvider {
  public readonly providerId = 'mock';

  /**
   * Generate a mock geocoding response for a given address
   */
  public async geocode(address: string): Promise<GeocodingResponse> {
    console.log(`[MockMapProvider] Geocoding address: ${address}`);

    // Generate deterministic but fake coordinates based on the address string
    const hash = this.hashString(address);
    const lat = 34 + (hash % 10) / 10;
    const lng = -118 - (hash % 15) / 10;

    // Create a mock address components object
    const addressComponents = this.generateAddressComponents(address);

    return {
      coordinates: {
        latitude: lat,
        longitude: lng,
      },
      address: addressComponents,
      provider: this.providerId,
    };
  }

  /**
   * Generate a mock reverse geocoding response for given coordinates
   */
  public async reverseGeocode(coordinates: Coordinates): Promise<ReverseGeocodingResponse> {
    const { latitude, longitude } = coordinates;
    console.log(`[MockMapProvider] Reverse geocoding coordinates: ${latitude}, ${longitude}`);

    // Generate a fake address based on the coordinates
    const streetNumber = Math.floor(Math.abs(latitude) * 100).toString();
    const streetName = `${this.getStreetNameFromCoords(longitude)} St`;
    const city = this.getCityFromCoords(latitude, longitude);
    const state = this.getStateFromCoords(latitude);
    const postalCode = Math.floor(10000 + Math.abs(longitude) * 10000).toString();

    const addressComponents: AddressComponents = {
      streetNumber,
      street: streetName,
      city,
      state,
      country: 'United States',
      postalCode,
      formattedAddress: `${streetNumber} ${streetName}, ${city}, ${state} ${postalCode}, USA`,
    };

    return {
      coordinates,
      address: addressComponents,
      provider: this.providerId,
    };
  }

  /**
   * Calculate a mock distance between two points
   */
  public async calculateDistance(
    origin: Coordinates,
    destination: Coordinates,
  ): Promise<DistanceResponse> {
    console.log(
      `[MockMapProvider] Calculating distance from ${origin.latitude},${origin.longitude} to ${destination.latitude},${destination.longitude}`,
    );

    // Calculate the actual distance using the Haversine formula
    const distance = this.calculateHaversineDistance(origin, destination);

    // Approximate driving time (very rough estimate: ~50 km/h average speed)
    const durationInSeconds = Math.round(distance * 72); // ~50 km/h in m/s

    return {
      distance: {
        value: Math.round(distance),
        unit: 'meters',
      },
      duration: {
        value: durationInSeconds,
        unit: 'seconds',
      },
      origin,
      destination,
      provider: this.providerId,
    };
  }

  /**
   * Calculate the Haversine distance between two points
   * This gives the great-circle distance between two points on a sphere
   */
  private calculateHaversineDistance(origin: Coordinates, destination: Coordinates): number {
    const R = 6371e3; // Earth's radius in meters
    const φ1 = (origin.latitude * Math.PI) / 180;
    const φ2 = (destination.latitude * Math.PI) / 180;
    const Δφ = ((destination.latitude - origin.latitude) * Math.PI) / 180;
    const Δλ = ((destination.longitude - origin.longitude) * Math.PI) / 360;

    const a =
      Math.sin(Δφ) * Math.sin(Δφ) +
      Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ) * Math.sin(Δλ);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
  }

  /**
   * Generate a simple hash from a string
   */
  private hashString(str: string): number {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash = hash & hash; // Convert to 32bit integer
    }
    return Math.abs(hash);
  }

  /**
   * Generate mock address components based on an input string
   */
  private generateAddressComponents(address: string): AddressComponents {
    const hash = this.hashString(address);

    // Extract some parts of the address if possible
    const parts = address.split(',').map((part) => part.trim());

    // Create some deterministic but fake address components
    const streetNumber = (hash % 1000).toString();
    const streetName = parts[0] || `${this.getStreetNameFromHash(hash)} St`;
    const city = parts[1] || this.getCityFromHash(hash);
    const state = parts[2] || this.getStateFromHash(hash);
    const postalCode = (10000 + (hash % 90000)).toString();

    return {
      streetNumber,
      street: streetName,
      city,
      state,
      country: 'United States',
      postalCode,
      formattedAddress: `${streetNumber} ${streetName}, ${city}, ${state} ${postalCode}, USA`,
    };
  }

  /**
   * Helper functions to generate deterministic fake data
   */
  private getStreetNameFromHash(hash: number): string {
    const streets = [
      'Main',
      'Oak',
      'Pine',
      'Maple',
      'Cedar',
      'Elm',
      'Washington',
      'Park',
      'Lake',
      'Hill',
      'River',
      'Spring',
      'Sunset',
      'Meadow',
      'Forest',
    ];
    return streets[hash % streets.length];
  }

  private getCityFromHash(hash: number): string {
    const cities = [
      'Springfield',
      'Riverdale',
      'Franklin',
      'Greenville',
      'Kingston',
      'Manchester',
      'Newport',
      'Salem',
      'Clinton',
      'Georgetown',
    ];
    return cities[hash % cities.length];
  }

  private getStateFromHash(hash: number): string {
    const states = ['CA', 'NY', 'TX', 'FL', 'IL', 'PA', 'OH', 'GA', 'NC', 'MI'];
    return states[hash % states.length];
  }

  private getStreetNameFromCoords(lng: number): string {
    const streets = [
      'Main',
      'Oak',
      'Pine',
      'Maple',
      'Cedar',
      'Elm',
      'Washington',
      'Park',
      'Lake',
      'Hill',
      'River',
      'Spring',
      'Sunset',
      'Meadow',
      'Forest',
    ];
    const index = Math.floor(Math.abs(lng * 10)) % streets.length;
    return streets[index];
  }

  private getCityFromCoords(lat: number, lng: number): string {
    const cities = [
      'Springfield',
      'Riverdale',
      'Franklin',
      'Greenville',
      'Kingston',
      'Manchester',
      'Newport',
      'Salem',
      'Clinton',
      'Georgetown',
    ];
    const index = Math.floor(Math.abs(lat * lng * 100)) % cities.length;
    return cities[index];
  }

  private getStateFromCoords(lat: number): string {
    const states = ['CA', 'NY', 'TX', 'FL', 'IL', 'PA', 'OH', 'GA', 'NC', 'MI'];
    const index = Math.floor(Math.abs(lat * 10)) % states.length;
    return states[index];
  }
}
