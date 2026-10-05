 Mesob House — React + Tailwind CSS v4

This is a learning-focused recreation based on the supplied design screenshots.

## Run it

```bash
npm install
npm run dev
```

Then open the local Vite address shown in the terminal.

## Main routes

- `/` — home / hero / specials / testimonials / CTA
- `/menu` — searchable and filterable menu
- `/menu/:id` — menu item detail
- `/cart` — basket
- `/checkout` — delivery + payment
- `/signin` — member sign in
- `/signup` — member registration
- `/404` — custom not-found page

## Data

- `src/data/menu.json` — main menu data
- `src/data/specialmenu.json` — home-page specials
- `src/data/testimonials.js` — testimonials

## Course topics intentionally demonstrated

### Day 1 — React Setup & JSX
Used throughout the React components.

### Day 2 — Props & Rendering Patterns
`MenuCard`, `MenuGrid`, `SectionTitle`, and mapped arrays demonstrate reusable props and rendering.

### Day 3 — State & Events / useState
Search, category filtering, quantity controls, checkout steps, payment selection, sign-in method and signup preference use state/events.

### Day 4 — useEffect & useRef
`CartContext` uses `useEffect` to save the cart to localStorage. `Menu`, `SignIn` use `useRef` for DOM focus.

### Day 5 — Hooks Deep Dive
The project uses `useMemo`, `useContext`, `useState`, `useEffect`, and `useRef`.

### Day 6 — React Router v6
Routes, `Link`, `NavLink`, `useParams`, and `Navigate` are used for navigation.

### Day 7 — Context API & State Management
`CartContext` provides shared cart state to navbar, cards, cart and checkout.

### Day 8 — Forms & Controlled Components
Search, sign in, signup, checkout payment selection and delivery fields demonstrate form handling.

### Day 9 — Error Boundaries, Performance & Lazy Loading
`ErrorBoundary` catches rendering errors. Pages are lazy-loaded with `React.lazy` and `Suspense`.

## Images

The JSON currently uses remote Unsplash image URLs as placeholders. Replace the `image` values with your own local restaurant/food images when you have them.
