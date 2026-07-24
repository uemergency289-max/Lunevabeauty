class PaymentGatewayInterface {
  async processPayment(amount, currency, sourceInfo) {
    throw new Error("Method 'processPayment()' must be implemented.");
  }
  
  async refundPayment(transactionId, amount) {
    throw new Error("Method 'refundPayment()' must be implemented.");
  }
}

module.exports = PaymentGatewayInterface;
