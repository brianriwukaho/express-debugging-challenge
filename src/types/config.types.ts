/**
 * Supported map provider types
 */
export type MapProviderType = 'google' | 'tomtom' | 'mock';

/**
 * Environment configuration interface
 */
export interface EnvironmentConfig {
  port: number;
  nodeEnv: string;
  defaultMapProvider: MapProviderType;
  googleMapsApiKey: string;
  tomTomApiKey: string;
  logLevel: string;
}
