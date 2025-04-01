import { Router } from 'express';
import { MapController } from '../controllers/mapController';

/**
 * Map API routes
 */
const router = Router();
const mapController = new MapController();

/**
 * Geocoding routes
 */
router.post('/geocode', mapController.geocode);
router.post('/reverse-geocode', mapController.reverseGeocode);
router.post('/distance', mapController.calculateDistance);

export default router;
