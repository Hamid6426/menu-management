# Phase 1 Development Plan

- Project Title: Restaurant Menu App
- Technology Stack: MEAN (MongoDB, Express, Angular, Node js)
- Hosting Platform: Hostinger
- Staging Environment: Yes (for testing before production)
- Theme: https://codervent.com/matzon/dashboard/e-commerce?storefront=erivato-elements

## User Roles Overview

### 1. Admin (Restaurant Owner/General Manager):
- Can manage one or more restaurant locations.
- Can invite multiple Managers (with email invitations) who can manage the menu on behalf of the restaurant
- Can create and manage menus, Including adding/removing dishes and setting specific timings for availability
- Can choose which languages to display to customers
- Can upload restaurant logos and define brand colors for menu customization
- It can enable/disable individual dishes

### 2. Super Admin (App Administrator):
- Full control over the platform.
- Can manage all restaurants, oversee al menus, and handle user support.
- Can manage translations and languages and ensure overall app stability.
- Can manage system-wide settings, audit logs, and handle platform performance.
- Full access to all restaurant menus for review/editing

### 3. User (Customer):
- Can view restaurant menus based on their preferences.
- Can search for specific dishes, filter results based on categories, and see allergy information
- If they have marked any allergies, dishes with those ingredients will either be removed of greyed out (darkened).
- Can switch menu view (grid or list).
- Multi-language support is available depending on the restaurant setup.

### 4. Other Funtionalities
- Default language is English and we can translate into Italian and Arabic
- Express.js monolithic architecture is used in the backend
- The web app is not going to be fancy, but just focus on menu page how it display to user(responsive, Grid/list view)

## Models

### User

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { 
    type: String, 
    enum: ['superadmin', 'admin', 'manager', 'user'], 
    default: 'user' 
  },
  restaurants: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Restaurant' 
  }],
  allergies: [String],
});

### Restaurant

const restaurantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  logo: String,
  brandColors: {
    primary: String,
    secondary: String
  },
  locations: [String],
  languages: [{
    type: String,
    enum: ['en', 'it', 'ar'],
    required: true
  }],
  menus: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Menu'
  }],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }, // Admin who created the restaurant
  createdAt: { type: Date, default: Date.now }
});

### Menu

const menuSchema = new mongoose.Schema({
  name: { type: String, required: true },
  restaurant: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Restaurant', 
    required: true 
  },
  dishes: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Dish' 
  }],
  createdAt: { type: Date, default: Date.now }
});

### Dish

const dishSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  price: { type: Number, required: true },
  category: String, // For filtering (e.g., "Appetizers")
  allergens: [String], // e.g., ["gluten", "nuts"]
  isEnabled: { type: Boolean, default: true }, // Admin can disable
  availability: {
    startTime: Number, // Minutes since midnight (0-1440)
    endTime: Number
  },
  createdAt: { type: Date, default: Date.now }
});

### Translation

const translationSchema = new mongoose.Schema({
  key: { 
    type: String, 
    required: true, 
    unique: true 
  }, // e.g., "menu.title"
  values: {
    en: { type: String, required: true }, // English
    it: { type: String, required: true }, // Italian
    ar: { type: String, required: true }  // Arabic
  },
  createdAt: { type: Date, default: Date.now }
});

### Analytic

const analyticsSchema = new mongoose.Schema({
  eventType: { 
    type: String, 
    enum: ['menu_view', 'dish_view', 'allergy_filter'], 
    required: true 
  },
  dish: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Dish' 
  }, // Optional (for dish-specific events)
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User' 
  }, // Optional (logged-in users)
  sessionId: String, // For anonymous users
  timestamp: { type: Date, default: Date.now }
});