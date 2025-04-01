import createApp from './app';
import { config } from './config/environment';

/**
 * Start the server
 */
const startServer = async (): Promise<void> => {
  try {
    const app = createApp();

    // Start the server
    const server = app.listen(config.port, () => {
      console.log(`Server running on port ${config.port} in ${config.nodeEnv} mode`);
      console.log(`Health check available at http://localhost:${config.port}/health`);
      console.log(`API available at http://localhost:${config.port}/api/maps`);
    });

    // Handle graceful shutdown
    process.on('SIGTERM', () => {
      console.log('SIGTERM received. Shutting down gracefully');
      server.close(() => {
        console.log('Process terminated');
      });
    });
  } catch (error) {
    console.error('Error starting server:', error);
    process.exit(1);
  }
};

// Start the server
startServer();
