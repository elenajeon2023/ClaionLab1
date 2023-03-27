const StockDecreased = require('../event/StockDecreased');
const objectmapping = require('../util/util')

module.exports = (sequelize, DataTypes) => class Inventory extends DataTypes.Model{
  static init(sequelize, DataTypes){
    return super.init(
    {
      productName: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      productImage: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      stock: {
        type: DataTypes.INTEGER(),
        allowNull: true,
      },
    },
    {   
        sequelize,
        timestamps: false,
        tableName: 'Inventory',
        hooks:{
          afterUpdate : function(inventory){
              var stockDecreased = new StockDecreased();
              stockDecreased = objectmapping(inventory.dataValues, stockDecreased);
              stockDecreased.Publish();

          },
        }
    })
  }
};

