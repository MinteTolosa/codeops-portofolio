# Addis Eats

A full-stack Ethiopian food ordering application built as part of the IBT CodeOps Module 3 React and Next.js training.

## About the Project

Addis Eats allows users to explore Ethiopian dishes, view dish details, manage a shopping cart, and place orders. The project demonstrates modern Next.js development concepts, including routing, data fetching, authentication, and performance optimization.

## Features

- Browse the food menu and view individual dishes.
- Add dishes to the shopping cart.
- Proceed to checkout and place orders.
- Sign in and sign up.
- View order history and order status.
- Provide a staff-only kitchen interface.
- Validate data and protect private routes.

## Technologies

- Next.js
- React
- JavaScript
- Tailwind CSS
- Zustand, where used for client-side state management
- Zod, where used for data validation
- SWR or TanStack Query, where implemented for client-side data fetching

## Project Routes

 Route =================================================== Purpose 

 `/`       ...........................................Home page 
`/menu` .............................................Browse dishes 
 `/menu/[id]` ........................................ View dish details 
 `/cart` ............................................... Manage cart items 
 `/checkout` ............................................ Place an order
 `/orders` ............................................... View orders
 `/kitchen` ............................................ Staff kitchen interface 
 `/signin` ............................................... Sign in 
 `/signup` ............................................... Create an account

## Getting Started

### Prerequisites

- Node.js
- npm
- Git

### Installation

Clone the repository, navigate into the project directory, and install dependencies.

bash
npm install


### Environment Variables

Create a `.env.local` file in the project root and configure the environment variables required by the application.

Never commit `.env.local` or real credentials to GitHub. Refer to `.env.example