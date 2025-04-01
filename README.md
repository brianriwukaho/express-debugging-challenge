# Map API Router

A TypeScript Express application that serves as a router for multiple map APIs. This application provides a unified interface for different map providers (Google Maps, TomTom, etc.) with a clean architecture and comprehensive error handling.

## Features

- **Multiple Map Providers**: Support for Google Maps, TomTom, and a mock provider
- **Provider Abstraction**: Common interface for all map providers
- **API Operations**:
  - Geocoding (address to coordinates)
  - Reverse Geocoding (coordinates to address)
  - Distance Calculation (between two points)
- **Clean Architecture**:
  - Controllers for handling HTTP requests
  - Services for business logic
  - Providers for external API integration
- **Error Handling**:
  - Early validation of inputs
  - Descriptive error messages
  - Appropriate HTTP status codes
  - Centralized error handling middleware

## Project Structure

```
map-api-router/
├── src/
│   ├── config/
│   │   └── environment.ts       # Environment configuration
│   ├── controllers/
│   │   └── mapController.ts     # HTTP request handlers
│   ├── middleware/
│   │   └── errorHandler.ts      # Error handling middleware
│   ├── providers/
│   │   ├── interfaces/
│   │   │   └── mapProvider.interface.ts  # Provider interface
│   │   ├── google/
│   │   │   └── googleMapsProvider.ts     # Google Maps implementation
│   │   ├── tomtom/
│   │   │   └── tomTomProvider.ts         # TomTom implementation
│   │   └── mock/
│   │       └── mockProvider.ts           # Mock implementation for testing
│   ├── routes/
│   │   └── mapRoutes.ts         # API routes
│   ├── services/
│   │   └── mapService.ts        # Business logic
│   ├── types/
│   │   ├── config.types.ts      # Configuration types
│   │   ├── error.types.ts       # Error types
│   │   └── map.types.ts         # Map operation types
│   ├── app.ts                  # Express application setup
│   └── index.ts                # Application entry point
└── tests/                      # Test files
```

## API Endpoints

### Geocoding
- **Endpoint**: `POST /api/maps/geocode`
- **Request Body**:
  ```json
  {
    "address": "123 Main St, San Francisco, CA",
    "provider": "google" // Optional, defaults to configured default provider
  }
  ```
- **Response**:
  ```json
  {
    "status": "success",
    "data": {
      "coordinates": {
        "latitude": 37.7749,
        "longitude": -122.4194
      },
      "address": {
        "streetNumber": "123",
        "street": "Main St",
        "city": "San Francisco",
        "state": "CA",
        "country": "United States",
        "postalCode": "94105",
        "formattedAddress": "123 Main St, San Francisco, CA 94105, USA"
      },
      "provider": "google"
    }
  }
  ```

### Reverse Geocoding
- **Endpoint**: `POST /api/maps/reverse-geocode`
- **Request Body**:
  ```json
  {
    "latitude": 37.7749,
    "longitude": -122.4194,
    "provider": "tomtom" // Optional
  }
  ```
- **Response**:
  ```json
  {
    "status": "success",
    "data": {
      "coordinates": {
        "latitude": 37.7749,
        "longitude": -122.4194
      },
      "address": {
        "streetNumber": "123",
        "street": "Main St",
        "city": "San Francisco",
        "state": "CA",
        "country": "United States",
        "postalCode": "94105",
        "formattedAddress": "123 Main St, San Francisco, CA 94105, USA"
      },
      "provider": "tomtom"
    }
  }
  ```

### Distance Calculation
- **Endpoint**: `POST /api/maps/distance`
- **Request Body**:
  ```json
  {
    "origin": {
      "latitude": 37.7749,
      "longitude": -122.4194
    },
    "destination": {
      "latitude": 34.0522,
      "longitude": -118.2437
    },
    "provider": "mock" // Optional
  }
  ```
- **Response**:
  ```json
  {
    "status": "success",
    "data": {
      "distance": {
        "value": 559954,
        "unit": "meters"
      },
      "duration": {
        "value": 19800,
        "unit": "seconds"
      },
      "origin": {
        "latitude": 37.7749,
        "longitude": -122.4194
      },
      "destination": {
        "latitude": 34.0522,
        "longitude": -118.2437
      },
      "provider": "mock"
    }
  }
  ```

## Getting Started

### Prerequisites

- Node.js (v16+)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd map-api-router
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure the environment:
   ```bash
   cp .env.example .env
   ```
   Edit `.env` with your preferred settings and API keys.

4. Build the project:
   ```bash
   npm run build
   ```

5. Start the server:
   ```bash
   npm start
   ```

The server will be running at http://localhost:3000.

### Development

To run the development server with hot reloading:
```bash
npm run dev
```

### Testing

Run the test suite:
```bash
npm test
```

## Introducing Bugs (For Takehome Challenge)

Since this project is meant to be a takehome challenge with bugs for junior developers to debug, here are some potential bugs you could introduce:

1. **Provider Selection Error**: Modify the `getProvider` method in `mapService.ts` to incorrectly handle provider selection.
2. **Validation Issues**: Remove some of the coordinate validation in the service layer.
3. **Off-by-one Error**: Introduce a calculation error in the mock provider's distance calculation.
4. **API Response Parsing**: Introduce an error in the response format of one of the providers.
5. **Error Handling Gaps**: Remove error handling from certain paths.
6. **Incorrect Parameter Usage**: Mix up parameter order in one of the provider implementations.
7. **Type Errors**: Introduce type inconsistencies in responses.
8. **Middleware Order Issue**: Change the order of middleware application in `app.ts`.

## Architecture Design Decisions

### Provider Interface

The MapProvider interface ensures all providers implement the same methods, making them interchangeable. This follows the Strategy Pattern, allowing the application to switch between different strategies (providers) at runtime.

### Service Layer

The MapService acts as a facade, hiding the complexity of provider selection and validation from the controllers. It handles validation and delegates to the appropriate provider.

### Error Handling

Early escapes with if statements are used throughout the codebase to validate inputs at the beginning of functions. This approach makes the code more readable and ensures we don't process invalid data.

### Testing Strategy

Tests are organized to match the application structure, with unit tests for individual components and integration tests for API endpoints. Mock implementations are provided for external dependencies.

## License

MIT