const db = require('../models');
const util = require('../util/util');
inventoryRepository = require('../repository/InventoryRepository')

deliveryStarted = require('../event/DeliveryStarted')

const policyhandler = {}

function wheneverDeliveryStarted_DecreaseStock(event){
    entity = new db.Product();

    Repository.save(entity).then(result=>{
        console.log(result.dataValue);
    })
}

policyhandler.wheneverDeliveryStarted_DecreaseStock = wheneverDeliveryStarted_DecreaseStock;



module.exports = policyhandler;