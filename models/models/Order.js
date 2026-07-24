const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  orderNumber: { type: String, required: true, unique: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  customerDetails: {
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    shippingAddress: {
      addressLine1: String,
      addressLine2: String,
      city: String,
      state: String,
      postalCode: String,
      country: String
    }
  },
  items: [{
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    name: String,
    variant: String,
    price: Number,
    quantity: Number,
    dropshippingStatus: {
      type: String,
      enum: ['Pending', 'Submitted', 'Shipped', 'Failed'],
      default: 'Pending'
    },
    supplierFulfillmentId: String
  }],
  pricing: {
    subtotal: Number,
    discount: { type: Number, default: 0 },
    shippingFee: { type: Number, default: 0 },
    tax: { type: Number, default: 0 },
    total: Number
  },
  paymentInfo: {
    provider: { type: String, required: true }, // 'Stripe', 'PayPal', 'PayFast', 'COD'
    transactionId: String,
    status: { type: String, enum: ['Pending', 'Completed', 'Failed', 'Refunded'], default: 'Pending' }
  },
  orderStatus: {
    type: String,
    enum: ['Processing', 'Dropship-Fulfilled', 'Shipped', 'Delivered', 'Cancelled'],
    default: 'Processing'
  },
  tracking: {
    carrier: String,
    number: String,
    url: String
  }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
