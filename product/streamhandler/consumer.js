const policyhandler = require('../PolicyHandler');
const configreader = require('../config/config_reader');
const DeliveryStarted = require('../event/DeliveryStarted');
const objectmapping = require('../util/util')
const kafkaprocessor = require('../kafka');

var config = configreader.reader();

const consumer = kafkaprocessor.kafka.consumer({ groupId: config['group_id'] });

(async ()=>{
    await consumer.subscribe({ topic: config['destination'], fromBeginning: true });
    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            var msg = JSON.parse(message.value.toString())
            if(msg.eventType == 'DeliveryStarted'){
                var deliveryStarted = new DeliveryStarted();
                var event = objectmapping(msg, deliveryStarted);
                policyhandler.wheneverDeliveryStarted_DecreaseStock(event);
            }
        },
      })

})();

exports.consumer = consumer;