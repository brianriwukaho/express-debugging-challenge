/**
 * Represents geographic coordinates
 */
export interface Coordinates {
  latitude: number;
  longitude: number;
}

/**
 * Address components
 */
export interface AddressComponents {
  streetNumber?: string;
  street?: string;
  city?: string;
  district?: string;
  state?: string;
  country?: string;
  postalCode?: string;
  formattedAddress: string;
}

/**
 * Geocoding request parameters
 */
export interface GeocodingRequest {
  address: string;
  provider?: string;
}

/**
 * Reverse geocoding request parameters
 */
export interface ReverseGeocodingRequest {
  latitude: number;
  longitude: number;
  provider?: string;
}

/**
 * Distance calculation request parameters
 */
export interface DistanceRequest {
  origin: {
    latitude: number;
    longitude: number;
  };
  destination: {
    latitude: number;
    longitude: number;
  };
  provider?: string;
}

/**
 * Geocoding response
 */
export interface GeocodingResponse {
  coordinates: Coordinates;
  address: AddressComponents;
  provider: string;
}

/**
 * Reverse geocoding response
 */
export interface ReverseGeocodingResponse {
  coordinates: Coordinates;
  address: AddressComponents;
  provider: string;
}

/**
 * Distance response
 */
export interface DistanceResponse {
  distance: {
    value: number;
    unit: 'meters' | 'kilometers' | 'miles';
  };
  duration: {
    value: number;
    unit: 'seconds' | 'minutes' | 'hours';
  };
  origin: Coordinates;
  destination: Coordinates;
  provider: string;
}
