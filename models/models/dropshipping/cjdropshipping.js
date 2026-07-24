const axios = require('axios');

class CJDropshippingService {
  constructor() {
    this.apiKey = process.env.CJ_API_KEY;
    this.baseUrl = 'https://developers.cjdropshipping.com/api2.0/v1';
  }

  // Get current inventory stock from CJ
  async getStock(variantId) {
    try {
      const response = await axios.get(`${this.baseUrl}/product/stock/queryByVid`, {
        headers: { 'CJ-Access-Token': this.apiKey },
        params: { vid: variantId }
      });
      return response.data.data.storageNum || 0;
    } catch (error) {
      console.error('[CJ Sync Error] Failed to fetch stock:', error.message);
      return null;
    }
  }

  // Create auto-fulfillment order on CJ
  async createFulfillmentOrder(orderData) {
    try {
      const payload = {
        orderNumber: orderData.orderNumber,
        shippingCustomerName: orderData.customerDetails.fullName,
        shippingAddress: orderData.customerDetails.shippingAddress.addressLine1,
        shippingCity: orderData.customerDetails.shippingAddress.city,
        shippingCountry: orderData.customerDetails.shippingAddress.country,
        shippingZip: orderData.customerDetails.shippingAddress.postalCode,
        shippingPhone: orderData.customerDetails.phone,
        products: orderData.items.map(item => ({
          vid: item.product.dropshipping.externalVariantId,
          quantity: item.quantity
        }))
      };

      const response = await axios.post(`${this.baseUrl}/shopping/order/create`, payload, {
        headers: { 'CJ-Access-Token': this.apiKey }
      });

      return { success: true, orderId: response.data.data.orderId };
    } catch (error) {
      console.error('[CJ Order Dispatch Failed]:', error.response ? error.response.data : error.message);
      return { success: false, error: error.message };
    }
  }
}

module.exports = new CJDropshippingService();
    
