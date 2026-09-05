# Addis Eats - Static Menu App

A simple React project built with Vite that displays a static menu for Addis Eats. It uses reusable components and maps over an array of data dynamically.

## What's Included

*   **Header Component:** Displays the app's title branding.
*   **Reusable Dish Component:** Takes custom `name` and `price` details via props to easily display different meals.
*   **Dynamic List Rendering:** Uses a clean JavaScript array to hold the menu items and loops over them using `.map()` with unique `key` tracking.

## Getting Started

1. **Scaffold the project:**
   ```bash
   npm create vite@latest
   # Choose React and the JavaScript variant
   ```

2. **Install and run locally:**
   ```bash
   npm install
   npm run dev
   ```
   Open the local URL provided in your terminal to see it live.

3. **Code the layout:**
   * Clear the starter code inside `App.jsx`.
   * Create your custom components (`Header` and `Dish`).
   * Assemble everything in `App.jsx` and push your progress to GitHub.
