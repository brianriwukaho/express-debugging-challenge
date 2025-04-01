import dotenv from 'dotenv';
import { EnvironmentConfig, MapProviderType } from '../types/config.types';

// Load environment variables from .env file
dotenv.config();

/**
 * Environment configuration
 */
export const config: EnvironmentConfig = {
  port: parseInt(process.env.PORT || '3000', 10),
  nodeEnv: process.env.NODE_ENV || 'development',
  defaultMapProvider: (process.env.DEFAULT_MAP_PROVIDER || 'mock') as MapProviderType,
  googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY || '',
  tomTomApiKey: process.env.TOMTOM_API_KEY || '',
  logLevel: process.env.LOG_LEVEL || 'info',
};
