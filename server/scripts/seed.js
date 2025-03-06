// seed.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Restaurant = require('../models/Restaurant');
const Menu = require('../models/Menu');
const Dish = require('../models/Dish');
const Translation = require('../models/Translation');
const dotenv = require('dotenv')

dotenv.config();

// MongoDB connection
const URI = process.env.MONGO_URI;
mongoose.connect(URI);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', async () => {
    console.log('Connected to MongoDB');

    // Clear existing data (optional)
    await mongoose.connection.dropDatabase();
    console.log('Database cleared');

    // Seed data
    await seedData();
    console.log('Database seeded successfully');
    process.exit();
});

// Seed function
async function seedData() {
    // Create Super Admin
    const superAdmin = await User.create({
        name: 'Super Admin',
        email: 'superadmin@example.com',
        password: await bcrypt.hash('password123', 10),
        role: 'superadmin',
    });
    console.log('Super Admin created:', superAdmin);

    // Create Restaurants
    const restaurants = await Restaurant.insertMany([
        {
            name: 'Pizza Palace',
            logo: 'https://example.com/pizza-logo.png',
            brandColors: {
                primary: '#FF0000',
                secondary: '#FFFFFF',
            },
            location: '123 Main St, New York, NY',
            languages: ['en', 'it', 'ar'],
            createdBy: superAdmin._id,
        },
        {
            name: 'Sushi Haven',
            logo: 'https://example.com/sushi-logo.png',
            brandColors: {
                primary: '#0000FF',
                secondary: '#FFFFFF',
            },
            location: '456 Elm St, Los Angeles, CA',
            languages: ['en', 'it'],
            createdBy: superAdmin._id,
        },
        {
            name: 'Burger Barn',
            logo: 'https://example.com/burger-logo.png',
            brandColors: {
                primary: '#FFA500',
                secondary: '#000000',
            },
            location: '789 Oak St, Chicago, IL',
            languages: ['en', 'ar'],
            createdBy: superAdmin._id,
        },
    ]);
    console.log('Restaurants created:', restaurants);

    // Create Menus
    const menus = await Menu.insertMany([
        {
            name: 'Main Menu',
            restaurant: restaurants[0]._id, // Pizza Palace
        },
        {
            name: 'Sushi Menu',
            restaurant: restaurants[1]._id, // Sushi Haven
        },
        {
            name: 'Burger Menu',
            restaurant: restaurants[2]._id, // Burger Barn
        },
    ]);
    console.log('Menus created:', menus);

    // Create Dishes
    const dishes = await Dish.insertMany([
        // Pizza Palace Dishes
        {
            name: 'Margherita Pizza',
            description: 'Classic Italian pizza with tomato, mozzarella, and basil.',
            price: 10.99,
            category: 'Pizza',
            allergens: ['gluten', 'dairy'],
            isEnabled: true,
            availability: {
                startTime: 600, // 10:00 AM
                endTime: 1320, // 10:00 PM
            },
        },
        {
            name: 'Pepperoni Pizza',
            description: 'Pizza with tomato sauce, mozzarella, and pepperoni.',
            price: 12.99,
            category: 'Pizza',
            allergens: ['gluten', 'dairy'],
            isEnabled: true,
            availability: {
                startTime: 600, // 10:00 AM
                endTime: 1320, // 10:00 PM
            },
        },
        {
            name: 'Garlic Bread',
            description: 'Toasted bread with garlic butter.',
            price: 5.99,
            category: 'Appetizer',
            allergens: ['gluten'],
            isEnabled: true,
            availability: {
                startTime: 600, // 10:00 AM
                endTime: 1320, // 10:00 PM
            },
        },

        // Sushi Haven Dishes
        {
            name: 'California Roll',
            description: 'Sushi roll with crab, avocado, and cucumber.',
            price: 8.99,
            category: 'Sushi',
            allergens: ['seafood'],
            isEnabled: true,
            availability: {
                startTime: 600, // 10:00 AM
                endTime: 1320, // 10:00 PM
            },
        },
        {
            name: 'Spicy Tuna Roll',
            description: 'Sushi roll with spicy tuna and cucumber.',
            price: 9.99,
            category: 'Sushi',
            allergens: ['seafood'],
            isEnabled: true,
            availability: {
                startTime: 600, // 10:00 AM
                endTime: 1320, // 10:00 PM
            },
        },
        {
            name: 'Miso Soup',
            description: 'Traditional Japanese soup with tofu and seaweed.',
            price: 3.99,
            category: 'Soup',
            allergens: ['soy'],
            isEnabled: true,
            availability: {
                startTime: 600, // 10:00 AM
                endTime: 1320, // 10:00 PM
            },
        },

        // Burger Barn Dishes
        {
            name: 'Classic Burger',
            description: 'Beef burger with lettuce, tomato, and cheese.',
            price: 7.99,
            category: 'Burger',
            allergens: ['gluten', 'dairy'],
            isEnabled: true,
            availability: {
                startTime: 600, // 10:00 AM
                endTime: 1320, // 10:00 PM
            },
        },
        {
            name: 'Cheeseburger',
            description: 'Beef burger with extra cheese.',
            price: 8.99,
            category: 'Burger',
            allergens: ['gluten', 'dairy'],
            isEnabled: true,
            availability: {
                startTime: 600, // 10:00 AM
                endTime: 1320, // 10:00 PM
            },
        },
        {
            name: 'French Fries',
            description: 'Crispy golden fries.',
            price: 4.99,
            category: 'Side',
            allergens: [],
            isEnabled: true,
            availability: {
                startTime: 600, // 10:00 AM
                endTime: 1320, // 10:00 PM
            },
        },
    ]);
    console.log('Dishes created:', dishes);

    // Link Dishes to Menus
    menus[0].dishes = [dishes[0]._id, dishes[1]._id, dishes[2]._id]; // Pizza Palace
    menus[1].dishes = [dishes[3]._id, dishes[4]._id, dishes[5]._id]; // Sushi Haven
    menus[2].dishes = [dishes[6]._id, dishes[7]._id, dishes[8]._id]; // Burger Barn
    await Promise.all(menus.map((menu) => menu.save()));
    console.log('Dishes linked to Menus');

    // Create Translations
    const translations = await Translation.insertMany([
        {
            key: 'menu.title',
            values: {
                en: 'Menu',
                it: 'Menù',
                ar: 'قائمة',
            },
        },
        {
            key: 'allergyWarning',
            values: {
                en: 'Contains allergens',
                it: 'Contiene allergeni',
                ar: 'يحتوي على مسببات الحساسية',
            },
        },
        {
            key: 'welcomeMessage',
            values: {
                en: 'Welcome to our restaurant!',
                it: 'Benvenuti nel nostro ristorante!',
                ar: 'مرحبًا بكم في مطعمنا!',
            },
        },
    ]);
    console.log('Translations created:', translations);
}