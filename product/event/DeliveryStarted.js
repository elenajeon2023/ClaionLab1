const AbstractEvent = require('./AbstractEvent');

class DeliveryStarted extends AbstractEvent{
    constructor(){
        super();
        this.id = null;
        this.customerId = null;
        this.productId = null;
        this.orderId = null;
        this.qty = null;
        this.status = null;
    }
}

module.exports = DeliveryStarted;