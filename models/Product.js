const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true, index: true },
  slug: { type: String, required: true, unique: true, index: true },
  sku: { type: String, required: true, unique: true },
  brand: { type: String, default: 'LunevaBeauty' },
  description: { type: String, required: true },
  shortDescription: { type: String, max: 250 },
  price: { type: Number, required: true },
  compareAtPrice: { type: Number },
  costPrice: { type: Number }, // For profit analytics
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  tags: [{ type: String }],
  images: [{
    url: { type: String, required: true },
    alt: { type: String, default: 'LunevaBeauty Product' }
  }],
  variants: [{
    name: String, // e.g., "Shade" or "Volume"
    value: String, // e.g., "Rose Velvet" or "50ml"
    price: Number,
    sku: String,
    stock: Number
  }],
  stock: { type: Number, required: true, default: 0 },
  isFeatured: { type: Boolean, default: false },
  isBestSeller: { type: Boolean, default: false },
  isNewArrival: { type: Boolean, default: false },
  dropshipping: {
    provider: { type: String, enum: ['CJ', 'Zendrop', 'AliExpress', 'Spocket', 'Syncee', 'Internal'], default: 'Internal' },
    externalProductId: String,
    externalVariantId: String,
    autoSyncStock: { type: Boolean, default: true }
  },
  seo: {
    metaTitle: String,
    metaDescription: String,
    keywords: [String]
  },
  ratings: {
    average: { type: Number, default: 0 },
    count: { type: Number, default: 0 }
  }
}, { timestamps: true });

// Performance index for catalog browsing
productSchema.index({ price: 1, category: 1, 'ratings.average': -1 });

module.exports = mongoose.model('Product', productSchema);
  
