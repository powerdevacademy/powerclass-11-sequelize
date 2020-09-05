'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Scope extends Model {

    static associate(models) {
      Scope.hasMany(models.User, {
        foreignKey: 'scopeId'
      });
    }
  };
  Scope.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Scope',
  });
  return Scope;
};