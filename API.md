# 🔌 SKML Motion Pictures API Documentation

This document outlines the internal API routes used within the SKML Motion Pictures Next.js application. These routes serve as intermediaries between the frontend/admin dashboard and backend services (like Sanity CMS) or handle custom authentication logic.

All API routes are built using **Next.js App Router Route Handlers** and are located in the `app/api/` directory.

## 🏗️ API Architecture & Security

The primary purpose of the internal API is to **secure operations**.
Directly interacting with Sanity CMS for writing data from the frontend would require exposing a `SANITY_API_TOKEN` to the browser, which is a massive security risk.

Instead, the frontend makes requests to our Next.js API routes (`/api/admin/...`). These routes:
1. Authenticate the incoming request using a secure JWT cookie.
2. If authorized, they securely attach the `SANITY_API_TOKEN` (stored safely on the server environment).
3. They perform the requested CRUD operation against Sanity.
4. They return the sanitized result back to the frontend.

---

## 🔐 Authentication APIs (`/api/auth/...`)

These routes handle the custom JWT-based authentication system used for the Admin Dashboard.

### 1. Login
- **Endpoint:** `POST /api/auth/login`
- **Description:** Authenticates an admin user using credentials defined in `.env.local`.
- **Payload:**
  ```json
  {
    "email": "admin@example.com",
    "password": "securepassword123"
  }
  ```
- **Response:**
  - `200 OK`: Sets a secure, HTTP-only JWT cookie (`admin_token`) and returns success.
  - `401 Unauthorized`: Invalid credentials.

### 2. Session Check
- **Endpoint:** `GET /api/auth/session`
- **Description:** Verifies if the user is currently authenticated by checking the validity of the `admin_token` cookie using the `jose` library.
- **Response:**
  - `200 OK`: `{"authenticated": true}`
  - `401 Unauthorized`: `{"authenticated": false}`

### 3. Logout
- **Endpoint:** `POST /api/auth/logout`
- **Description:** Clears the `admin_token` cookie, logging the user out of the admin dashboard.
- **Response:** `200 OK`

---

## 🛠️ Admin Data Proxy APIs (`/api/admin/...`)

These routes handle CRUD operations specifically for the custom admin dashboard, interacting directly with Sanity CMS via the `@sanity/client`.

**Note:** All routes under `/api/admin/` require a valid session (JWT cookie). If unauthorized, they will return a `401 Unauthorized`.

### 1. Movies / Films Management
- **Endpoint Base:** `/api/admin/films`
- **Methods:**
  - `GET`: Fetch all films for the admin table view.
  - `POST`: Create a new film entry in Sanity.
  - `PUT`: Update an existing film document.
  - `DELETE`: Remove a film document from Sanity.
- **Integration:** Uses the Sanity write client (with token) to execute `client.create()`, `client.patch()`, or `client.delete()`.

### 2. Producer Management
- **Endpoint Base:** `/api/admin/producer`
- **Methods:**
  - `GET`: Fetch the producer profile details.
  - `POST` / `PUT`: Update the producer details (bio, name, image).
- **Integration:** Targets a singleton or specific document type `producer` in Sanity.

### 3. About Page Content
- **Endpoint Base:** `/api/admin/about`
- **Methods:**
  - `GET`: Fetch the content for the About page.
  - `POST` / `PUT`: Update the text and media associated with the About page.

### 4. Media Upload
- **Endpoint:** `POST /api/admin/upload`
- **Description:** Handles image file uploads from the admin dashboard directly into the Sanity asset library.
- **Integration:** Takes standard `FormData` containing a file, converts it to a buffer, and uses `client.assets.upload('image', buffer, { filename })`. Returns the uploaded asset's reference `_id` to be attached to movie/producer documents.

---

## ⚡ Webhooks & Revalidation (`/api/revalidate`)

### 1. Sanity Webhook ISR Revalidation
- **Endpoint:** `POST /api/revalidate`
- **Description:** This endpoint is hit automatically by Sanity via a configured Webhook whenever a document is created, updated, or deleted.
- **Purpose:** Next.js heavily relies on Static Site Generation (SSG) for performance. This endpoint uses Next.js `revalidatePath` or `revalidateTag` to purge the cache for specific pages (like `/` or `/movies`) so that the updated content is immediately visible to public users without requiring a full site rebuild.
- **Security:** Typically secured using a secret token passed in the headers by Sanity to ensure only Sanity can trigger cache purges.

---

## 🔗 How We Are Integrating It

1. **Frontend Fetching:** The public UI primarily fetches data directly from Sanity using `next-sanity` in React Server Components (RSC). This bypasses our API routes completely for maximum performance, as read access to the dataset is public.
2. **Admin Mutations:** The admin UI (Client Components) uses standard `fetch()` calls to hit the `/api/admin/...` endpoints when submitting forms or deleting items.
3. **Optimistic Updates & State:** The admin dashboard uses React state to update the UI instantly, while the API request processes in the background.
