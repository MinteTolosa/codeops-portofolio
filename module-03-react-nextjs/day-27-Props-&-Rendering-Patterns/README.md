# Addis Eats - Interactive Menu Features

An extended React application for **Addis Eats** that introduces component prop validation, conditional badges, dynamic filtering with fallback layouts, and customizable layout wrappers.

## Features Built

*   **Prop Type Safety:** Configured explicit `PropTypes` rules for the `Dish` component (enforcing required text and numbers) along with standard fallback values for missing props.
*   **Conditional Badges:** Built inline guard checks using the logical `&&` pattern to safely display a styling badge for spicy options.
*   **Composition Component:** Created a reusable `Card` layout wrapper that uses the React `children` pattern to encase nested custom markup cleanly.
*   **Dynamic Filtering & Fallbacks:** Set up a menu rendering control that filters items by category and displays a friendly empty state notice when zero results are found.
*   **Stable Rendering Keys:** Configured list mapping (`.map()`) to strictly use unique database IDs for key attributes rather than fragile index positions.

## Getting Started

1. **Install required packages:**
   ```bash
   npm install prop-types
   npm install
   ```

2. **Boot the client locally:**
   ```bash
   npm run dev
   ```

3. **Validation Check:**
   Open your browser developer console (`F12`) to verify that the prop configurations run cleanly without rendering warnings.
