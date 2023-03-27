const AbstractEvent = require('./AbstractEvent')

class StockDecreased extends AbstractEvent{
    constructor(){
        super();
        this.id = null;
        this.productName = null;
        this.productImage = null;
        this.stock = null;
    }
}

module.exports = StockDecreased;