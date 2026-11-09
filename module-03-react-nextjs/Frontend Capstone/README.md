# Addis Eats — Frontend Capstone

A full-stack food ordering application built with Next.js. Addis Eats allows customers to explore Ethiopian dishes, place food orders, track order progress, and view receipts. It also provides a kitchen dashboard for managing incoming orders and updating their status.

This project is developed as part of the IBT Module 3 — React & Next.js Frontend Capstone.

## Project Overview

Addis Eats demonstrates how a modern food ordering application can be built using Next.js, combining server-side functionality, client-side interactivity, API routes, and a structured application architecture.

### Key Features

**Customer Experience**
- Browse the food menu and view individual dish details.
- Add dishes to the shopping cart.
- Place orders through the checkout process.
- View order history and individual order details.
- Track order status with live updates.
- Cancel eligible orders.
- View and print order receipts.

**Kitchen Management**
- Protected kitchen dashboard.
- View incoming customer orders.
- Update order preparation and delivery statuses.
- Track order progress.

**Additional Features**
- User authentication and protected routes.
- API routes for dishes, orders, and authentication.
- Server-side order validation using Zod.
- Server Actions for order operations.
- Order ownership checks.
- Order status updates using Server-Sent Events (SSE).
- CSV export for order data.
- Interactive order tracking map.
- Ethiopian Birr (ETB) currency formatting.
- Addis Ababa time formatting.
- Responsive user interface.

## Technology Stack

- **Next.js 16.4.5** — Application framework.
- **React** — User interface.
- **JavaScript** — Application programming language.
- **Tailwind CSS** — Styling.
- **Zod** — Data validation.
- **Turbopack** — Development and production build tooling.

## Application Routes

 Route                                      Description 
----------------------------------------------------------------------
 `/`                                         Home page 
 `/menu`                               Browse available dishes 
 `/menu/[id]`                           Individual dish details 
 `/cart`                                     Shopping cart 
 `/checkout`                                 Place an order 
 `/signin`                                  Customer sign-in 
 `/signup`                                Customer registration 
 `/orders`                                Customer order history 
 `/orders/[id]`                         Order details and receipt 
 `/track/[id]`                             Live order tracking
 `/dashboard`                                  Dashboard 
 `/kitchen`                               Kitchen order management 

## API Routes

 Endpoint                                                    Purpose |
______________________________________________________________________
 `/api/dishes`                                       Retrieve dishes |
 `/api/dishes/[id]`                      Retrieve an individual dish |
 `/api/orders`                            Create and retrieve orders |
 `/api/orders/[id]`                       Access an individual order |
 `/api/orders/[id]/status`           Retrieve or update order status |
 `/api/orders/[id]/stream`                 Stream live order updates |
 `/api/signup`                                     User registration |
 `/api/signin`                                   User authentication |
 `/api/signout`                                        User sign-out |
 `/api/auth/[...nextauth]`                    Authentication handler |

## Getting Started

### Prerequisites

- Node.js 22 or later.
- npm.
- Git.

### 1. Clone the repository

```bash
git clone YOUR_REPOSITORY_URL
```

Replace `YOUR_REPOSITORY_URL` with your Git repository URL.

### 2. Navigate to the project

```bash
cd addis-eats
```

### 3. Install dependencies

```bash
npm install
```

### 4. Configure environment variables

Create a `.env.local` file in the project root and configure the environment variables required by the application.

Keep your secrets private. Never commit `.env.local` to Git.

### 5. Start the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Production Build

To create an optimized production build:

```bash
npm run build
```

To start the production server after building:

```bash
npm run start
```

## Important Project Notes

- The current project uses a mock in-memory database for application data. It is intended for the capstone demonstration and does not provide permanent database persistence.
- Order tracking map coordinates are demonstration coordinates, not live courier GPS data.
- A production deployment should use a persistent database and real delivery-location integration.

## Learning Outcomes

Through this project, the following Next.js concepts and practical skills were applied:

- App Router and nested routing.
- Dynamic routes and route parameters.
- Server and Client Components.
- Data fetching and rendering strategies.
- Static generation, dynamic rendering, and revalidation.
- API Route Handlers.
- Server Actions and form state management.
- Data validation and error handling.
- Authentication and authorization.
- Protected routes and resource ownership.
- Real-time updates using Server-Sent Events.
- Production builds and application optimization.

## Project Status

**Frontend Capstone — Production build successful.**

The project has successfully compiled and generated its application routes using Next.js 16.4.5.

---

Developed as part of the **IBT Module 3 — React & Next.js Frontend Capstone**.