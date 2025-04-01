import request from 'supertest';
import createApp from './app';

describe('Map API Integration Tests', () => {
  const app = createApp();

  describe('Health Check', () => {
    it('should return 200 OK with healthy status', async () => {
      const response = await request(app).get('/health');

      expect(response.status).toBe(200);
      expect(response.body).toEqual({ status: 'healthy' });
    });
  });

  describe('Geocoding API', () => {
    it('should geocode an address successfully', async () => {
      const response = await request(app)
        .post('/api/maps/geocode')
        .send({ address: '123 Main Street, San Francisco, CA' });

      expect(response.status).toBe(200);
      expect(response.body.status).toBe('success');
      expect(response.body.data).toMatchObject({
        coordinates: expect.objectContaining({
          latitude: expect.any(Number),
          longitude: expect.any(Number),
        }),
        address: expect.objectContaining({
          formattedAddress: expect.any(String),
        }),
        provider: expect.any(String),
      });
    });

    it('should return 400 for missing address', async () => {
      const response = await request(app).post('/api/maps/geocode').send({});

      expect(response.status).toBe(400);
      expect(response.body.status).toBe('error');
    });
  });

  describe('Reverse Geocoding API', () => {
    it('should reverse geocode coordinates successfully', async () => {
      const response = await request(app).post('/api/maps/reverse-geocode').send({
        latitude: 37.7749,
        longitude: -122.4194,
      });

      expect(response.status).toBe(200);
      expect(response.body.status).toBe('success');
      expect(response.body.data).toMatchObject({
        coordinates: {
          latitude: 37.7749,
          longitude: -122.4194,
        },
        address: expect.objectContaining({
          formattedAddress: expect.any(String),
        }),
        provider: expect.any(String),
      });
    });

    it('should return 400 for invalid coordinates', async () => {
      const response = await request(app).post('/api/maps/reverse-geocode').send({
        latitude: 100, // Invalid latitude
        longitude: -122.4194,
      });

      expect(response.status).toBe(400);
      expect(response.body.status).toBe('error');
    });
  });

  describe('Distance Calculation API', () => {
    it('should calculate distance successfully', async () => {
      const response = await request(app)
        .post('/api/maps/distance')
        .send({
          origin: {
            latitude: 37.7749,
            longitude: -122.4194,
          },
          destination: {
            latitude: 34.0522,
            longitude: -118.2437,
          },
        });

      expect(response.status).toBe(200);
      expect(response.body.status).toBe('success');
      expect(response.body.data).toMatchObject({
        distance: expect.objectContaining({
          value: expect.any(Number),
          unit: 'meters',
        }),
        duration: expect.objectContaining({
          value: expect.any(Number),
          unit: 'seconds',
        }),
        provider: expect.any(String),
      });
    });

    it('should return 400 for missing destination', async () => {
      const response = await request(app)
        .post('/api/maps/distance')
        .send({
          origin: {
            latitude: 37.7749,
            longitude: -122.4194,
          },
        });

      expect(response.status).toBe(400);
      expect(response.body.status).toBe('error');
    });
  });
});
