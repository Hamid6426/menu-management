# API Documentation

## 1. Authentication & User Management

| Method | Endpoint                  | Description                                    | Role Access               |
|--------|---------------------------|------------------------------------------------|---------------------------|
| POST   | /api/auth/register        | Register a new user (Admin/Super Admin only)   | Super Admin, Admin        |
| POST   | /api/auth/login           | User login (returns JWT token)                 | Public                    |
| POST   | /api/auth/logout          | Logout (clear JWT cookie/token)                | Authenticated Users       |
| POST   | /api/auth/forgot-password | Send password reset email                      | Public                    |
| POST   | /api/auth/reset-password  | Reset password using token                     | Public                    |

## 2. User Management (Admins/Super Admins)

| Method | Endpoint         | Description                                    | Role Access                         |
|--------|-----------------|------------------------------------------------|-------------------------------------|
| GET    | /api/users      | Get all users (pagination supported)           | Super Admin                        |
| GET    | /api/users/:id  | Get user by ID                                 | Super Admin, Admin (own restaurant users) |
| POST   | /api/users/invite | Invite a Manager (send email invitation)    | Admin                              |
| PUT    | /api/users/:id  | Update user details (e.g., role, allergies)    | Super Admin, Admin (own users)     |
| DELETE | /api/users/:id  | Delete a user                                  | Super Admin                        |

## 3. Restaurant Management

| Method | Endpoint                | Description                                  | Role Access                       |
|--------|-------------------------|----------------------------------------------|-----------------------------------|
| POST   | /api/restaurants        | Create a new restaurant                     | Super Admin, Admin               |
| GET    | /api/restaurants        | Get all restaurants (filter by location)    | Super Admin, Admin               |
| GET    | /api/restaurants/:id    | Get restaurant by ID                        | Super Admin, Admin (own restaurant) |
| PUT    | /api/restaurants/:id    | Update restaurant (branding, languages)     | Super Admin, Admin (own restaurant) |
| DELETE | /api/restaurants/:id    | Delete a restaurant                         | Super Admin                       |

## 4. Menu Management

| Method | Endpoint                       | Description                                | Role Access                     |
|--------|---------------------------------|--------------------------------------------|---------------------------------|
| POST   | /api/restaurants/:id/menus     | Create a menu for a restaurant            | Admin, Manager (assigned)      |
| GET    | /api/menus                      | Get all menus (filter by restaurant)      | Super Admin, Admin, Manager    |
| GET    | /api/menus/:id                  | Get menu by ID with dishes                | Public (if published)          |
| PUT    | /api/menus/:id                  | Update menu (name, dishes order)          | Admin, Manager (assigned)      |
| DELETE | /api/menus/:id                  | Delete a menu                             | Admin, Manager (assigned)      |

## 5. Dish Management

| Method | Endpoint                  | Description                                 | Role Access                     |
|--------|----------------------------|---------------------------------------------|---------------------------------|
| POST   | /api/menus/:id/dishes      | Add a dish to a menu                        | Admin, Manager (assigned)      |
| GET    | /api/dishes                | Get all dishes (filter by category/allergens) | Public                    |
| GET    | /api/dishes/:id            | Get dish details by ID                      | Public                          |
| PUT    | /api/dishes/:id            | Update dish (price, allergens, availability) | Admin, Manager (assigned)      |
| PATCH  | /api/dishes/:id/toggle     | Enable/disable a dish                       | Admin, Manager (assigned)      |
| DELETE | /api/dishes/:id            | Delete a dish                               | Admin, Manager (assigned)      |

## 6. Translation Management (CMS)

| Method | Endpoint                   | Description                                    | Role Access   |
|--------|----------------------------|------------------------------------------------|--------------|
| POST   | /api/translations          | Create a new translation key                  | Super Admin  |
| GET    | /api/translations          | Get all translations (filter by key/language) | Public       |
| GET    | /api/translations/:key     | Get translation by key (e.g., menu.title)     | Public       |
| PUT    | /api/translations/:key     | Update translation values                     | Super Admin  |
| DELETE | /api/translations/:key     | Delete a translation key                      | Super Admin  |

## 7. Analytics Dashboard

| Method | Endpoint                      | Description                                     | Role Access                       |
|--------|--------------------------------|-------------------------------------------------|----------------------------------|
| GET    | /api/analytics/menu-views     | Get total menu views (time-range filter)       | Admin, Manager (own restaurant) |
| GET    | /api/analytics/top-dishes     | Get top 5 dishes by views/clicks               | Admin, Manager (own restaurant) |
| GET    | /api/analytics/peak-times     | Get usage trends by hour/day                   | Admin, Manager (own restaurant) |
| GET    | /api/analytics/allergies      | Get most common allergens filtered by users    | Admin, Manager (own restaurant) |

## 8. Public Endpoints (Customers)

| Method | Endpoint                      | Description                                      |
|--------|--------------------------------|--------------------------------------------------|
| GET    | /api/public/restaurants       | Get all restaurants (basic info)                 |
| GET    | /api/public/menus/:id         | Get menu by ID (with dishes, allergens)         |
| GET    | /api/public/search            | Search dishes by name/category (allergy filter) |
