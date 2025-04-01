import express, { Express } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { errorHandler } from './middleware/errorHandler';
import mapRoutes from './routes/mapRoutes';

/**
 * Create and configure Express application
 */
const createApp = (): Express => {
  const app = express();

  // Apply middleware
  app.use(helmet());
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // API routes
  app.use('/api/maps', mapRoutes);

  // Health check route
  app.get('/health', (_req, res) => {
    res.status(200).json({ status: 'healthy' });
  });

  // Global error handler
  app.use(errorHandler);

  return app;
};

export default createApp;
