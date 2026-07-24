const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');
const Category = require('./models/Category');
const User = require('./models/User');

dotenv.config();

const sampleCategories = [
  { name: 'Botanical Serums', slug: 'botanical-serums', description: 'Concentrated natural elixirs for deep cellular hydration.' },
  { name: 'Silk Hydrators', slug: 'silk-hydrators', description: 'Rich velvet creams for long-lasting barrier protection.' }
];

const sampleProducts = [
  {
    name: 'Rose Gold Botanical Elixir',
    slug: 'rose-gold-botanical-elixir',
    sku: 'LUN-SER-001',
    brand: 'LunevaBeauty',
    description: 'Infused with pure 24k gold flakes, cold-pressed rosehip oil, and squalane for intense restoration.',
    shortDescription: '24k Gold & Rosehip Hydration Elixir',
    price: 85.00,
    compareAtPrice: 105.00,
    costPrice: 22.00,
    stock: 150,
    isFeatured: true,
    isBestSeller: true,
    images: [{ url: 'https://images.unsplash.com/photo-1608248597263-0057e57b4522?auto=format&fit=crop&w=600&q=80', alt: 'Rose Gold Elixir' }],
    dropshipping: { provider: 'CJ', externalProductId: 'CJ-99281', externalVariantId: 'CJ-VAR-01' }
  },
  {
    name: 'Luminous Silk Hydrating Cream',
    slug: 'luminous-silk-hydrating-cream',
    sku: 'LUN-CRM-002',
    brand: 'LunevaBeauty',
    description: 'Velvety cream packed with hyaluronic acid and peptide complex for all-day radiance.',
    shortDescription: 'Peptide & Hyaluronic Moisture Lock',
    price: 120.00,
    compareAtPrice: 140.00,
    costPrice: 35.00,
    stock: 80,
    isNewArrival: true,
    images: [{ url: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&q=80', alt: 'Silk Cream' }],
    dropshipping: { provider: 'Zendrop', externalProductId: 'ZD-88301', externalVariantId: 'ZD-VAR-02' }
  }
];

async function seedDatabase() {
  try {
    if (!process.env.MONGO_URI) {
      console.log('⚠️ MONGO_URI missing in .env file. Please add your MongoDB connection string.');
      process.exit(1);
    }

    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB for seeding...');

    // Clear existing data
    await Product.deleteMany({});
    await Category.deleteMany({});
    await User.deleteMany({});

    // Seed Categories & Products
    const createdCategories = await Category.insertMany(sampleCategories);
    
    sampleProducts[0].category = createdCategories[0]._id;
    sampleProducts[1].category = createdCategories[1]._id;
    await Product.insertMany(sampleProducts);

    // Seed Admin Account
    await User.create({
      name: 'Master Shahid',
      email: 'admin@lunevabeauty.com',
      password: '$2a$10$SampleHashedPasswordForAdminVerification',
      role: 'admin'
    });

    console.log('🚀 Database seeded successfully with Products, Categories, and Admin user!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }
}

seedDatabase();
