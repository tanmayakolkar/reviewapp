'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            User.hasMany(models.Review);
        }
    }
    User.init({
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
                len: [2, 50],
            }
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
                notEmpty: true,
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
            }
        },
        role: {
            type: DataTypes.STRING,
            defaultValue: "CLIENT",
            allowNull: false,
            validate: {
                notEmpty: true,
                isIn: [['ADMIN', 'CLIENT']],
            }
        },
        phone: DataTypes.STRING,
        city: DataTypes.STRING,
        state: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'User',
        tableName: 'Users'
    });
    return User;
};