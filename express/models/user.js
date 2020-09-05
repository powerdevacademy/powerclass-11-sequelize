'use strict';
const { Model } = require('sequelize');
const CryptoJS = require('crypto-js');
const constants = require('../constants');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {

    static associate(models) {
      User.belongsTo(models.Scope, {
        foreignKey: 'scopeId'
      });
    }
    
    static generateHash(password) {
      return CryptoJS.HmacSHA1(password, constants.PASSWORD_TOKEN).toString(CryptoJS.enc.Hex);
    }

  };
  User.init({
    name: DataTypes.STRING,
    username: DataTypes.STRING,
    scopeId: DataTypes.INTEGER,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });

  User.beforeSave((user, options) => {
    if(user.password) {
      user.password = User.generateHash(user.password);
    }
  });

  return User;
};