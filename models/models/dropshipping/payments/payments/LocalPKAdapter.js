const PaymentGatewayInterface = require('./PaymentGatewayInterface');
const axios = require('axios');

class LocalPKAdapter extends PaymentGatewayInterface {
  constructor() {
    super();
    this.merchantId = process.env.PAYFAST_MERCHANT_ID;
    this.securedKey = process.env.PAYFAST_SECURE_KEY;
  }

  async processPayment(amount, currency = 'PKR', sourceInfo) {
    // Standard payload structure for PayFast / Local Gateway API
    try {
      const payload = {
        merchant_id: this.merchantId,
        basket_id: sourceInfo.orderId,
        txnamt: amount.toFixed(2),
        customer_mobile: sourceInfo.customerPhone,
        customer_email: sourceInfo.customerEmail,
        currency_code: currency
      };

      // Simulating API token call & transaction redirection payload creation
      return {
        status: 'SUCCESS',
        transactionId: `PK-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
        redirectUrl: `https://sandbox.payfast.co.pk/payment/pay?token=${Date.now()}`
      };
    } catch (err) {
      return { status: 'FAILED', message: err.message };
    }
  }

  async refundPayment(transactionId, amount) {
    return { status: 'REFUNDED', transactionId };
  }
}

module.exports = LocalPKAdapter;
