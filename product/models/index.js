const Sequelize = require('sequelize');

const db = {};

const sequelize = new Sequelize('sqlite::memory:');

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.Inventory = require('./Inventory')(sequelize, Sequelize);
db.Inventory.init(sequelize, Sequelize);

module.exports = db;