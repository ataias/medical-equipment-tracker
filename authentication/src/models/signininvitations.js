'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SignInInvitation extends Model {
    static associate(models) {
      models.SignInInvitation.belongsTo(models.User, {
        onDelete: 'CASCADE',
        foreignKey: {
          allowNull: false,
        },
      });
    }
  }
  SignInInvitations.init(
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      isOpened: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      accountCreated: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: 'SignInInvitation',
    }
  );
  return SignInInvitation;
};