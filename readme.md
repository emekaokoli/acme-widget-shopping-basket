# Acme Widget Co - Shopping Basket

## Overview
A TypeScript implementation of a shopping basket system for Acme Widget Co, featuring:

- Node.js with Express
- Session-based in-memory basket per user (via express-session)
- Fake authentication middleware (simulates a logged-in user without login)
- Functional programming style with Strategy Pattern
- Zod for request validation
- Extensible offer system
- Comprehensive test coverage with Jest

## Table of Contents
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Setup and Installation](#setup-and-installation)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [Testing](#testing)
- [Project Structure](#project-structure)
- [Extending the System](#extending-the-system)

## Product Catalog
The product catalog is a simple table of products with their codes and prices.

| Product      | Code | Price  |
|--------------|------|--------|
| Red Widget   | R01  | $32.95 |
| Green Widget | G01  | $24.95 |
| Blue Widget  | B01  | $7.95  |

## Features

### Delivery Charges
- Orders under $50: $4.95
- Orders under $90: $2.95
- Orders $90 or more: Free

### Special Offers
- **Red Widget Offer**: Buy one red widget, get the second half price

## API Documentation

### Add to basket (saves session cookie)
```http
POST http://localhost:3000/basket/add
Content-Type: application/json

{
  "productCode": "R01"
}
```
### using CURL
curl -i -c cookies.txt \
  -X POST http://localhost:3000/basket/add \
  -H "Content-Type: application/json" \
  -d '{"code":"R01"}'


### Get basket total (reuse same session)
```http
GET http://localhost:3000/basket/total
```

### using CURL
curl -i -b cookies.txt \
  http://localhost:3000/basket/total


### Get basket total (d-in user without login)

Response:
```json
{
  "subtotal": 57.90,
  "discount": 16.48,
  "delivery": 2.95,
  "total": 44.37
}
```

## Example Usage

1. **Example 1**
   - Items: B01, G01
   - Expected Total: $37.85

2. **Example 2**
   - Items: R01, R01
   - Expected Total: $54.37
   - (Second red widget is half price)

3. **Example 3**
   - Items: R01, G01
   - Expected Total: $60.85

4. **Example 4**
   - Items: B01, B01, R01, R01, R01
   - Expected Total: $98.27

## Prerequisites

- Node.js (v16 or later)
- pnpm (v7 or later)

## Setup and Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd thrivecart
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

## Running the Application

### Development Mode
```bash
# Start development server with hot-reload
pnpm dev
```

The server will start on `http://localhost:3000` by default.

### Production Build
```bash
# Build the application
pnpm build

# Start the production server
node dist/server.js
```

## Testing

The project includes comprehensive test coverage for all major components:

```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Generate test coverage report
pnpm test:coverage
```

Current test coverage:
```
----------------------|---------|----------|---------|---------|-------------------
File                  | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
----------------------|---------|----------|---------|---------|-------------------
All files             |   94.73 |      100 |   84.61 |   96.42 |                   
 application          |   90.47 |      100 |      75 |   94.11 |                   
  basket-service.ts   |   90.47 |      100 |      75 |   94.11 | 35               
 domain/delivery      |     100 |      100 |     100 |     100 |                   
  default-delivery.ts |     100 |      100 |     100 |     100 |                   
 domain/offers        |     100 |      100 |     100 |     100 |                   
  red-widget-offer.ts |     100 |      100 |     100 |     100 |                   
----------------------|---------|----------|---------|---------|-------------------
```

## Extending the System

### Adding New Products
To add a new product, update the product catalog in the basket service initialization.

### Adding New Offers
1. Create a new offer strategy in `src/domain/offers/`
2. Implement the `OfferStrategy` interface
3. Add the new offer to the offers array when creating the basket service

### Modifying Delivery Rules
Update the delivery strategy in `src/domain/delivery/default-delivery.ts` to modify the delivery cost rules.

## Project Structure
```
- `src/`
  - `application/` - Application services
  - `controllers/` - API controllers
  - `domain/` - Core business logic
    - `delivery/` - Delivery charge strategies
    - `offers/` - Special offer strategies
  - `middlewares/` - Express middlewares
  - `modules/` - Application modules
  - `presentation/` - API presentation
  - `test/` - Test files
  - `server.ts` - Application entry point
```
  ``bash
  src
 ┣ application
 ┃ ┗ basket-service.ts
 ┣ controllers
 ┃ ┗ basket-controller.ts
 ┣ domain
 ┃ ┣ delivery
 ┃ ┃ ┗ default-delivery.ts
 ┃ ┣ offers
 ┃ ┃ ┗ red-widget-offer.ts
 ┃ ┣ basket.ts
 ┃ ┣ product.ts
 ┃ ┗ types.ts
 ┣ middlewares
 ┃ ┣ fakeAuth.ts
 ┃ ┗ requireAuth.ts
 ┣ modules
 ┃ ┗ errorHandler.ts
 ┣ presentation
 ┃ ┗ routes
 ┃ ┃ ┗ basket-routes.ts
 ┣ validation
 ┃ ┗ basket-schema.ts
 ┣ test
 ┃ ┣ basket-service.test.ts
 ┃ ┣ delivery.test.ts
 ┃ ┣ offers.test.ts
 ┃ ┣ product.test.ts
 ┃ ┗ jest.config.js
 ┗ server.ts

  ```


## Notes
- Uses in-memory storage (resets on server restart)
- No authentication/authorization implemented
- Error handling is minimal for this example

