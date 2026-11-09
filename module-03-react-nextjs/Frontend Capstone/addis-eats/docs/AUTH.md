# Authentication and Route Protection

## 1. Overview

Addis Eats uses authentication and role-based access control to protect private pages and actions. Public pages remain accessible without signing in.

## 2. Route Access Rules

| Route | Access | Protection |
|---|---|---|
| `/` | Public | No sign-in required |
| `/menu` | Public | Menu is available to everyone |
| `/signin` | Public | Allows users to sign in |
| `/signup` | Public | Allows users to register |
| `/orders` | Signed-in customer | Users may access only their own orders |
| `/checkout` | Signed-in customer | Authentication and order validation are required |
| `/kitchen` | Staff only | Requires an authenticated staff role |

## 3. Protection Layers

- **Proxy:** Checks the session and redirects users who are not authorized to access a route.
- **Page-level checks:** Private pages must verify the current user's access where appropriate.
- **Server-side actions and data queries:** Must independently verify authentication, role permissions, and order ownership before performing protected operations.

Proxy protection alone is not sufficient to guarantee order ownership.

## 4. Security Verification

The following cases must be tested:

1. A signed-out user attempting to access `/checkout` is redirected to sign in.
2. A customer attempting to access `/kitchen` is redirected to an authorized customer page.
3. A customer cannot view, cancel, or modify another customer's order by changing an order ID.
4. A signed-out user cannot cancel an order.
5. A crafted external redirect, such as `/signin?next=https://example.com`, must not redirect the user to an untrusted external website.

## 5. Demo Environment

The project uses demo credentials configured through environment variables for local testing. Never commit real passwords, session secrets, or other sensitive credentials to Git.

## 6. Production Note

The project uses a learning/demo setup. Before production deployment, verify secure session handling, persistent storage, server-side authorization, input validation, and safe error handling.
