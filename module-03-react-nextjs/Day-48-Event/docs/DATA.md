# Data Fetching and Management

## 1. Overview

Addis Eats uses server-side and client-side data fetching, depending on the needs of each page or feature.

## 2. Data Fetching Strategy

....

## 3. Order Ownership

Order queries and protected order actions must verify the authenticated user's identity and ensure the requested order belongs to that user.

Never rely only on an order ID supplied by the browser.

## 4. Live Order Status

The order page can load its initial data on the server and then refresh the status on the client.

Polling should use an appropriate interval and stop when updates are no longer needed. The interface should clearly represent loading and error states.

## 5. Menu Search

Menu search should wait briefly after the user stops typing before sending a request. This reduces unnecessary network requests.

The interface should handle loading, empty results, and request failures.

## 6. Cart State

The cart uses client-side state because users interact with it frequently. Cart state should update when items are added, removed, or have their quantities changed.

## 7. Error Handling

Data-driven pages and components should handle loading, empty, and error states appropriately. The application should not expose sensitive information in error messages.

## 8. Verification

Before deployment, verify that:

- Menu and dish details load correctly.
- Customers can access only their own orders.
- Order status updates correctly.
- Search requests are debounced.
- Loading, empty, and error states are handled.
